import type { R2Bucket } from "@cloudflare/workers-types";
/**
 * Workaround for https://github.com/cloudflare/workers-sdk/issues/5360
 */
export function patchR2Bucket(bucket: R2Bucket) {
  let _mutex: Promise<any> | undefined;

  const _get = bucket.get.bind(bucket);

  async function getAndRead(...args: Parameters<R2Bucket["get"]>) {
    const obj = await _get(...args);
    if (!obj) {
      return obj;
    }
    const chunks: any[] = [];
    for await (const chunk of obj.body) {
      chunks.push(chunk);
    }
    const body = new ReadableStream({
      start(controller) {
        for (const chunk of chunks) {
          controller.enqueue(chunk);
        }
        controller.close();
      },
    });
    return { ...obj, body };
  }

  async function get(...args: Parameters<R2Bucket["get"]>) {
    while (_mutex) {
      await _mutex;
    }
    try {
      _mutex = getAndRead(...args);
      const obj = await _mutex;
      return obj;
    } finally {
      _mutex = undefined;
    }
  }

  return new Proxy(bucket, {
    get(target, prop) {
      if (prop === "get") {
        return get;
      }
      return Reflect.get(target, prop);
    },
  });
}
