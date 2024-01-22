# Cloudflare Bindings for Nitro and Nuxt Dev Server

This is a proof of concept module to enable access to the Cloudflare runtime bindings in development server of [Nitro](https://nitro.unjs.io) and [Nuxt](https://nuxt.com) using new `getBindingsProxy` api exposed by wrangler.

> [!WARNING] > `getBindingsProxy` is not yet part of wrangler, we are just using the prerelease from: https://github.com/cloudflare/workers-sdk/pull/4523. The utility's API can still change

> [!NOTE]
> Nitro project plans to introduce a new method to allow native dev presets, meaning you can natively run [miniflare](https://miniflare.dev/) as your development server without this module or a proxy in the future.

## Usage

1. Install `nitro-cloudflare-bindings` and `wrangler` packages as dev dependency

```sh
npx nypm i -D wrangler nitro-cloudflare-bindings
```

(universal script uses [unjs/nypm](https://github.com/unjs/nypm) to automatically detect your package manager)

2. Add module

**For [Nuxt](https://nuxt.com) projects:**

```js
export default defineNuxtConfig({
  modules: ["nitro-cloudflare-bindings"],
});
```

**For [Nitro](https://nitro.unjs.io) projects:**

```js
import nitroCloudflareBindings from "nitro-cloudflare-bindings";

export default defineNitroConfig({
  modules: [nitroCloudflareBindings],
});
```

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run Nitro playground using `pnpm dev:nitro` or Nuxt playground using `pnpm dev:nuxt`

## License

[MIT](./LICENSE)
