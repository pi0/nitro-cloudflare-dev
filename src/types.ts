declare module "h3" {
  interface H3Context {
    cloudflare: {
      env: {
        [key: string]: unknown;
      };
    };
  }
}

export default {};
