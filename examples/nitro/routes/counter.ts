export default eventHandler(async (event) => {
  const { KV } = event.context.cloudflare.env;

  let ctr = (await KV.get("counter")) || 0;
  await KV.put("counter", ++ctr % 100);

  return `counter: ${(await KV.get("counter")) || 0}`;
});
