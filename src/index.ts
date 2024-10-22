import { relative, resolve } from "node:path";
import { promises as fs } from "node:fs";
import { fileURLToPath } from "mlly";
import type { Nitro } from "nitropack";
import type { Nuxt } from "nuxt/schema";
import consola from "consola";
import { colorize } from "consola/utils";
import { findFile } from "pkg-types";

export {} from "./types";

declare module "nitropack" {
  interface NitroOptions {
    cloudflareDev?: {
      configPath?: string;
      environment?: string;
      persistDir?: string;
      silent?: boolean;
    };
  }
}

async function nitroModule(nitro: Nitro) {
  if (!nitro.options.dev) {
    return; // Production doesn't need this
  }

  // Find wrangler.toml
  let configPath = nitro.options.cloudflareDev?.configPath;
  if (!configPath) {
    configPath = await findFile("wrangler.toml", {
      startingFrom: nitro.options.srcDir,
    }).catch(() => undefined);
  }

  // Resolve the persist dir
  const persistDir = resolve(
    nitro.options.rootDir,
    nitro.options.cloudflareDev?.persistDir || ".wrangler/state/v3",
  );

  // Add `.wrangler/state/v3` to `.gitignore`
  const gitIgnorePath = await findFile(".gitignore", {
    startingFrom: nitro.options.rootDir,
  }).catch(() => undefined);

  let addedToGitIgnore = false;
  if (gitIgnorePath && persistDir === ".wrangler/state/v3") {
    const gitIgnore = await fs.readFile(gitIgnorePath, "utf8");
    if (!gitIgnore.includes(".wrangler/state/v3")) {
      await fs
        .writeFile(gitIgnorePath, gitIgnore + "\n.wrangler/state/v3\n")
        .catch(() => {});
      addedToGitIgnore = true;
    }
  }

  if (!nitro.options.cloudflareDev?.silent) {
    consola.box(
      [
        "🔥 Cloudflare context bindings enabled for dev server",
        "",
        `Config path: \`${configPath ? relative(".", configPath) : colorize("yellow", "cannot find `wrangler.toml`")}\``,
        `Persist dir: \`${relative(".", persistDir)}\` ${addedToGitIgnore ? colorize("green", "(added to `.gitignore`)") : ""}`,
      ].join("\n"),
    );
  }

  // Share config to the runtime
  nitro.options.runtimeConfig.wrangler = {
    ...nitro.options.runtimeConfig.wrangler,
    configPath,
    persistDir,
    environment: nitro.options.cloudflareDev?.environment,
  };

  // Make sure runtime is transpiled
  nitro.options.externals.inline = nitro.options.externals.inline || [];
  nitro.options.externals.inline.push(
    fileURLToPath(new URL("runtime/", import.meta.url)),
  );

  // Add plugin to inject bindings to dev server
  nitro.options.plugins = nitro.options.plugins || [];
  nitro.options.plugins.push(
    fileURLToPath(new URL("runtime/plugin.dev", import.meta.url)),
  );
}

// Dual compatibility with Nuxt and Nitro Modules
export default function nitroCloudflareDev(arg1: unknown, arg2: unknown) {
  if ((arg2 as Nuxt)?.options?.nitro) {
    (arg2 as Nuxt).hooks.hookOnce("nitro:config", (nitroConfig) => {
      nitroConfig.modules = nitroConfig.modules || [];
      nitroConfig.modules.push(nitroModule);
    });
  } else {
    nitroModule(arg1 as Nitro);
  }
}
