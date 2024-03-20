import type { PlatformProxy } from "wrangler";

export interface Env {}

type TypedPlatformProxy = PlatformProxy<Env>;

declare module "h3" {
  interface H3EventContext {
    cf: TypedPlatformProxy["cf"];
    cloudflare: {
      request: Request & { cf: TypedPlatformProxy["cf"] };
      env: TypedPlatformProxy["env"];
      context: TypedPlatformProxy["ctx"];
    };
  }
}
