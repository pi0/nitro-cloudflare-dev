export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hookOnce("request", (event) => {
    console.log(
      "event.context.cloudflare in request hook",
      !!event.context.cloudflare,
    );
  });
});
