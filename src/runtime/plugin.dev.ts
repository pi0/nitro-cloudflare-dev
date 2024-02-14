import type { NitroAppPlugin } from "nitropack";
// @ts-ignore
import { useRuntimeConfig, getRequestURL } from "#imports";

export default <NitroAppPlugin>function (nitroApp) {
  let _proxy: ReturnType<typeof getPlatformProxy>;

  nitroApp.hooks.hook("request", async (event) => {
    // Lazy initialize proxy when first request comes in
    if (!_proxy) {
      _proxy = getPlatformProxy().catch((error) => {
        console.error("Failed to initialize wrangler bindings proxy", error);
        return {
          env: {},
          cf: {},
          ctx: {
            waitUntil() {},
            passThroughOnException() {},
          },
          caches: {
            open(): Promise<Cache> {
              const result = Promise.resolve(new Cache());
              return result;
            },
            get default(): Cache {
              return new Cache();
            },
          },
          dispose: () => Promise.resolve(),
        } as unknown as ReturnType<typeof getPlatformProxy>;
      });
    }

    const proxy = await _proxy;

    // Inject the various cf values from the proxy in event and event.context

    event.waitUntil = proxy.ctx.waitUntil;
    (event.context as any).cf = proxy.cf;
    (event.context as any).waitUntil = proxy.ctx.waitUntil;

    const request = new Request(getRequestURL(event));
    (request as any).cf = proxy.cf;

    event.context.cloudflare = {
      ...event.context.cloudflare,
      request,
      env: proxy.env,
      context: proxy.ctx,
    };
  });

  // Dispose proxy when Nitro is closed
  nitroApp.hooks.hook("close", () => {
    return _proxy?.then((proxy) => proxy.dispose);
  });
};

async function getPlatformProxy() {
  const _pkg = "wrangler"; // Bypass bundling!
  const { getPlatformProxy } = (await import(
    _pkg
  )) as typeof import("wrangler");

  const runtimeConfig: {
    wrangler: { configPath: string; persistDir: string };
  } = useRuntimeConfig();

  const proxy = await getPlatformProxy({
    configPath: runtimeConfig.wrangler.configPath,
    persist: { path: runtimeConfig.wrangler.persistDir },
  });

  return proxy;
}

class Cache {
  delete(): Promise<boolean> {
    const result = Promise.resolve(false);
    return result;
  }

  match() {
    const result = Promise.resolve(undefined);
    return result;
  }

  put(): Promise<void> {
    const result = Promise.resolve();
    return result;
  }
}
