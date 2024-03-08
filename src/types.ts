import type { PlatformProxy } from "wrangler";

declare module "h3" {
  interface H3EventContext {
    cf: PlatformProxy["cf"];
    cloudflare: {
      request: Request & { cf: PlatformProxy["cf"] };
      env: PlatformProxy["env"];
      context: PlatformProxy["ctx"];
    };
  }
}

export default {};
