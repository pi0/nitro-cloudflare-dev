declare module "h3" {
  interface H3EventContext {
    cloudflare: {
      env: {
        [key: string]: unknown;
      };
    };
  }
}

export default {};
