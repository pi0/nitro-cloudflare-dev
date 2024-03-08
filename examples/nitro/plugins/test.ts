export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    console.log(
      "event.context.cloudflare in request hook",
      !!event.context.cloudflare,
    );
  });
});
