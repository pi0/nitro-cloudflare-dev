# Changelog

## v0.1.3

[compare changes](https://github.com/pi0/nitro-cloudflare-dev/compare/v0.1.2...v0.1.3)

### 🚀 Enhancements

- Add `shamefullyPatchR2Buckets` ([e15e190](https://github.com/pi0/nitro-cloudflare-dev/commit/e15e190))

### 🏡 Chore

- Update docs ([c74cd07](https://github.com/pi0/nitro-cloudflare-dev/commit/c74cd07))
- Update lockfile ([76062e3](https://github.com/pi0/nitro-cloudflare-dev/commit/76062e3))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.1.2

[compare changes](https://github.com/pi0/nitro-cloudflare-dev/compare/v0.1.1...v0.1.2)

### 🚀 Enhancements

- Add `configPath` and `silent` options ([#12](https://github.com/pi0/nitro-cloudflare-dev/pull/12))

### 🏡 Chore

- **release:** V0.1.1 ([f49f1b2](https://github.com/pi0/nitro-cloudflare-dev/commit/f49f1b2))
- Update lockfile ([8f70da8](https://github.com/pi0/nitro-cloudflare-dev/commit/8f70da8))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Sébastien Chopin <seb@nuxtlabs.com>

## v0.1.1

[compare changes](https://github.com/pi0/nitro-cloudflare-dev/compare/v0.1.0...v0.1.1)

### 🔥 Performance

- Try eagerly initializing proxy ([81113d6](https://github.com/pi0/nitro-cloudflare-dev/commit/81113d6))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.1.0

[compare changes](https://github.com/pi0/nitro-cloudflare-dev/compare/v0.0.7...v0.1.0)

### 🚀 Enhancements

- ⚠️  Use `getPlatformProxy` and provide more context fields ([#6](https://github.com/pi0/nitro-cloudflare-dev/pull/6))
- Support configurable `persistDir` ([725fd42](https://github.com/pi0/nitro-cloudflare-dev/commit/725fd42))
- Log initialization time ([be0deec](https://github.com/pi0/nitro-cloudflare-dev/commit/be0deec))
- Replicate nitro production behavior ([36ad28e](https://github.com/pi0/nitro-cloudflare-dev/commit/36ad28e))

### 🩹 Fixes

- Slash runtime path ([#8](https://github.com/pi0/nitro-cloudflare-dev/pull/8))
- Use `H3EventContext` ([745a2d5](https://github.com/pi0/nitro-cloudflare-dev/commit/745a2d5))
- Allow access to the context within `request` hook ([cab495a](https://github.com/pi0/nitro-cloudflare-dev/commit/cab495a))

### 💅 Refactors

- Improve plugin ([63b6f55](https://github.com/pi0/nitro-cloudflare-dev/commit/63b6f55))

### 📦 Build

- Externalize `wrangler` types ([e4092d4](https://github.com/pi0/nitro-cloudflare-dev/commit/e4092d4))

### 🌊 Types

- Improve context types ([f33599e](https://github.com/pi0/nitro-cloudflare-dev/commit/f33599e))

### 🏡 Chore

- Update readme (remove mention of beta version of wrangler) ([9b7a74e](https://github.com/pi0/nitro-cloudflare-dev/commit/9b7a74e))
- Bump wrangler devDependency ([7f66c67](https://github.com/pi0/nitro-cloudflare-dev/commit/7f66c67))
- **release:** V0.0.7 ([483955a](https://github.com/pi0/nitro-cloudflare-dev/commit/483955a))
- Update deps ([acf210f](https://github.com/pi0/nitro-cloudflare-dev/commit/acf210f))
- Apply automated fixes ([45ad7d2](https://github.com/pi0/nitro-cloudflare-dev/commit/45ad7d2))
- Apply automated fixes ([b5e480c](https://github.com/pi0/nitro-cloudflare-dev/commit/b5e480c))
- Update example ([dc0f5bc](https://github.com/pi0/nitro-cloudflare-dev/commit/dc0f5bc))
- Update lock ([0b2da15](https://github.com/pi0/nitro-cloudflare-dev/commit/0b2da15))
- Show log once ([9975161](https://github.com/pi0/nitro-cloudflare-dev/commit/9975161))

#### ⚠️ Breaking Changes

- ⚠️  Use `getPlatformProxy` and provide more context fields ([#6](https://github.com/pi0/nitro-cloudflare-dev/pull/6))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Markthree ([@markthree](http://github.com/markthree))
- Dario Piotrowicz <dario@cloudflare.com>
- Dario-piotrowicz ([@dario-piotrowicz](http://github.com/dario-piotrowicz))

## v0.0.7

[compare changes](https://github.com/pi0/nitro-cloudflare-dev/compare/v0.0.6...v0.0.7)

### 🩹 Fixes

- Make sure `runtime/` is transpiled ([77156bb](https://github.com/pi0/nitro-cloudflare-dev/commit/77156bb))

### 💅 Refactors

- Rename to `nitro-cloudflare-dev` ([c389c42](https://github.com/pi0/nitro-cloudflare-dev/commit/c389c42))

### 🏡 Chore

- Update gitignore ([4b03f4b](https://github.com/pi0/nitro-cloudflare-dev/commit/4b03f4b))
- **release:** V0.0.6 ([95d6f24](https://github.com/pi0/nitro-cloudflare-dev/commit/95d6f24))
- Use nypm for install ([1a16886](https://github.com/pi0/nitro-cloudflare-dev/commit/1a16886))
- Update readme (remove mention of beta version of wrangler) ([9b7a74e](https://github.com/pi0/nitro-cloudflare-dev/commit/9b7a74e))
- Bump wrangler devDependency ([7f66c67](https://github.com/pi0/nitro-cloudflare-dev/commit/7f66c67))

### ❤️ Contributors

- Dario-piotrowicz ([@dario-piotrowicz](http://github.com/dario-piotrowicz))
- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.0.6

[compare changes](https://github.com/pi0/nitro-cloudflare-dev/compare/v0.0.5...v0.0.6)

### 🩹 Fixes

- Make sure `runtime/` is transpiled ([77156bb](https://github.com/pi0/nitro-cloudflare-dev/commit/77156bb))

### 🏡 Chore

- **release:** V0.0.5 ([7277bdd](https://github.com/pi0/nitro-cloudflare-dev/commit/7277bdd))
- Update lockfile ([e68432b](https://github.com/pi0/nitro-cloudflare-dev/commit/e68432b))
- Update readme ([fe75b7f](https://github.com/pi0/nitro-cloudflare-dev/commit/fe75b7f))
- Remove prepare script from examples ([35652b2](https://github.com/pi0/nitro-cloudflare-dev/commit/35652b2))
- Update gitignore ([4b03f4b](https://github.com/pi0/nitro-cloudflare-dev/commit/4b03f4b))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.0.5

[compare changes](https://github.com/pi0/nitro-cloudflare-dev/compare/v0.0.4...v0.0.5)

### 🏡 Chore

- Update package.json ([249d5a6](https://github.com/pi0/nitro-cloudflare-dev/commit/249d5a6))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.0.4

[compare changes](https://github.com/pi0/nitro-cloudflare-dev/compare/v0.0.3...v0.0.4)

### 🩹 Fixes

- Explicit import from `#imports` ([dfcfb53](https://github.com/pi0/nitro-cloudflare-dev/commit/dfcfb53))

### 💅 Refactors

- Graceful error when cannot get bindings ([762f747](https://github.com/pi0/nitro-cloudflare-dev/commit/762f747))
- Compact message for added to .gitignore ([67e1828](https://github.com/pi0/nitro-cloudflare-dev/commit/67e1828))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.0.3

[compare changes](https://github.com/pi0/nitro-cloudflare-dev/compare/v0.0.2...v0.0.3)

### 📦 Build

- Remove `prepare` -\_- ([3996e25](https://github.com/pi0/nitro-cloudflare-dev/commit/3996e25))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.0.2

[compare changes](https://github.com/pi0/nitro-cloudflare-dev/compare/v0.0.1...v0.0.2)

### 🚀 Enhancements

- Automatically add `.wrangler/state/v3` to `.gitignore` ([5bf2c5b](https://github.com/pi0/nitro-cloudflare-dev/commit/5bf2c5b))

### 🩹 Fixes

- Handle when `wrangler.toml` is not found ([0340c1d](https://github.com/pi0/nitro-cloudflare-dev/commit/0340c1d))

### 💅 Refactors

- Default persist dir to `.wrangler/state/v3` ([88d91ff](https://github.com/pi0/nitro-cloudflare-dev/commit/88d91ff))

### 📦 Build

- Run `build` before release ([d3f32d2](https://github.com/pi0/nitro-cloudflare-dev/commit/d3f32d2))

### 🏡 Chore

- Add renovate config ([f18fc5c](https://github.com/pi0/nitro-cloudflare-dev/commit/f18fc5c))
- Update readme ([e5cfcf4](https://github.com/pi0/nitro-cloudflare-dev/commit/e5cfcf4))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.0.1

### 🏡 Chore

- Update readme ([cf4f84d](https://github.com/pi0/nitro-cloudflare-dev/commit/cf4f84d))
- Lint ([817bd6c](https://github.com/pi0/nitro-cloudflare-dev/commit/817bd6c))
- Add ci scripts ([fc58696](https://github.com/pi0/nitro-cloudflare-dev/commit/fc58696))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
