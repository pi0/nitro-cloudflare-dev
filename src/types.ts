import type { PlatformProxy } from "wrangler";

type IncomingRequestCfProperties<T> =
  T extends PlatformProxy<any, infer T> ? T : never;

export interface CfProperties
  extends IncomingRequestCfProperties<PlatformProxy<any, any>> {}

export interface Env {}

type TypedPlatformProxy = PlatformProxy<Env, CfProperties>;

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
