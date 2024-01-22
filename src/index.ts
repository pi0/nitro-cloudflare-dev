import { fileURLToPath } from "node:url";
import { relative, resolve } from "node:path";
import { promises as fs } from "node:fs";
import type { Nitro } from "nitropack";
import type { Nuxt } from "nuxt/schema";
import consola from "consola";
import { colorize } from "consola/utils";
import { findFile } from "pkg-types";

export {} from "./types";

async function nitroModule(nitro: Nitro) {
  if (!nitro.options.dev) {
    return; // Production doesn't need this
  }

  // Find wrangler.toml
  const configPath = await findFile("wrangler.toml", {
    startingFrom: nitro.options.srcDir,
  }).catch(() => undefined);

  // Resolve the persist dir
  const persistDir = resolve(nitro.options.rootDir, ".wrangler/state/v3");

  // Add `.wrnagle/state/v3` to `.gitignore`
  const gitIgnorePath = await findFile(".gitignore", {
    startingFrom: nitro.options.rootDir,
  }).catch(() => undefined);
  if (gitIgnorePath) {
    const gitIgnore = await fs.readFile(gitIgnorePath, "utf8");
    if (!gitIgnore.includes(".wrangler/state/v3")) {
      consola.info("Adding `.wrangler/state/v3` to `.gitignore`...");
      await fs.writeFile(gitIgnorePath, gitIgnore + "\n.wrangler/state/v3\n");
    }
  }

  consola.box(
    [
      "🔥 Cloudflare context bindings enabled for dev server",
      "",
      `Config path: ${configPath ? relative(".", configPath) : colorize("yellow", "cannot find `wrangler.toml`")}`,
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
