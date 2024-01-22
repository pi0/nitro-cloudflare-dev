import { fileURLToPath } from "node:url";
import { relative, resolve } from "node:path";
import type { Nitro } from "nitropack";
import type { Nuxt } from "nuxt/schema";
import consola from "consola";
import { findFile } from "pkg-types";

export {} from "./types";

async function nitroModule(nitro: Nitro) {
  if (!nitro.options.dev) {
    return; // Production doesn't need this
  }

  // Find wrangler.toml
  const configPath = await findFile("wrangler.toml", {
    startingFrom: nitro.options.srcDir,
  });

  // Resolve the persist dir
  const persistDir = resolve(nitro.options.buildDir, "wrangler");

  consola.box(
    [
      "🔥 Cloudflare context bindings enabled for dev server",
      "",
      `Config path: \`${relative(".", configPath)}\``,
      `Persist dir: \`${relative(".", persistDir)}\``,
    ].join("\n"),
  );

  // Share config to the runtime
  nitro.options.runtimeConfig.wrangler = {
    ...nitro.options.runtimeConfig.wrangler,
    configPath,
    persistDir,
  };

  // Add plugin to inject bindings to dev server
  nitro.options.plugins = nitro.options.plugins || [];
  nitro.options.plugins.push(
    fileURLToPath(new URL("runtime/plugin.dev", import.meta.url)),
  );
}

// Dual compatibility with Nuxt and Nitro Modules
export default (arg1: unknown, arg2: unknown) => {
  if ((arg2 as Nuxt)?.options?.nitro) {
    (arg2 as Nuxt).hooks.hook("nitro:config", (nitroConfig) => {
      nitroConfig.modules = nitroConfig.modules || [];
      nitroConfig.modules.push(nitroModule);
    });
  } else {
    nitroModule(arg1 as Nitro);
  }
};
