export default eventHandler((event) => {
  const { cloudflare } = event.context;

  const logs: string[] = [];
  const log = (str: string) => logs.push(str);

  log(`Keys of cloudflare: ${Object.keys(cloudflare).join(", ")}`);

  log(`Keys of cloudflare.env: ${Object.keys(cloudflare.env).join(", ")}`);

  log(`Colo: ${cloudflare.request.cf.colo}`);

  log(
    `typeof cloudflare.context.waitUntil: ${typeof cloudflare.context.waitUntil}`,
  );

  return `<div><ul><br>${logs.map((str) => `<li>${str}</li>`).join("\n<br>\n")}</ul></div>`;
});
