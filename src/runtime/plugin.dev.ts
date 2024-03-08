import type { NitroAppPlugin } from "nitropack";
import type { PlatformProxy } from "wrangler";
// @ts-ignore
import { useRuntimeConfig, getRequestURL } from "#imports";

export default <NitroAppPlugin>function (nitroApp) {
  let _proxy: Promise<PlatformProxy>;

  nitroApp.hooks.hook("request", async (event) => {
    // Lazy initialize proxy when first request comes in
    if (!_proxy) {
      _proxy = _getPlatformProxy().catch((error) => {
        console.error("Failed to initialize wrangler bindings proxy", error);
        return _createStubProxy();
      });
    }

    const proxy = await _proxy;

    // Inject the various cf values from the proxy in event and event.context
    event.context.cf = proxy.cf;
    event.context.waitUntil = proxy.ctx.waitUntil;

    const request = new Request(getRequestURL(event)) as Request & {
      cf: typeof proxy.cf;
    };

    request.cf = proxy.cf;

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

async function _getPlatformProxy() {
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

function _createStubProxy(): PlatformProxy {
  return {
    env: {},
    cf: {},
    ctx: {
      waitUntil() {},
      passThroughOnException() {},
    },
    caches: {
      open(): Promise<_CacheStub> {
        const result = Promise.resolve(new _CacheStub());
        return result;
      },
      get default(): _CacheStub {
        return new _CacheStub();
      },
    },
    dispose: () => Promise.resolve(),
  };
}

class _CacheStub {
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
