# Cloudflare Bindings for Nitro and Nuxt

This proof of concept module enables access to the Cloudflare runtime bindings in the development server of [Nitro](https://nitro.unjs.io) and [Nuxt](https://nuxt.com) using the [new `getBindingsProxy` API](https://github.com/cloudflare/workers-sdk/pull/4523) exposed by wrangler (Beta) and [miniflare](https://miniflare.dev/)

> [!NOTE]
> Nitro plans to introduce a new method to allow native dev presets, meaning you can natively run [miniflare](https://miniflare.dev/) as your development server without this module or a proxy in the future!

## Usage

First, install `nitro-cloudflare-dev` and `wrangler` packages as a dev dependency: ([unjs/nypm](https://nypm.unjs.io) will automatically detect your package manager!)

```sh
npx nypm@latest add -D wrangler@beta nitro-cloudflare-dev
```

For **Nuxt** update `nuxt.config.ts`:

```js
export default defineNuxtConfig({
  modules: ["nitro-cloudflare-dev"],
});
```

For **Nitro** update `nitro.config.ts`:

```js
import nitroCloudflareBindings from "nitro-cloudflare-dev";

export default defineNitroConfig({
  modules: [nitroCloudflareBindings],
});
```

## Configuration and persistence

This module automatically finds the closest [`wrangler.toml`](https://developers.cloudflare.com/workers/wrangler/configuration/) file for configuration.

Data is persisted `.wrangler/state/v3` directory. On first use of the module, it will be automatically added to the `.gitignore` file.

## Development

- Clone this repository
- Install the latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Build in stub mode using `pnpm build --stub`
- Run Nitro playground using `pnpm dev:nitro` or Nuxt playground using `pnpm dev:nuxt`

## License

[MIT](./LICENSE)
