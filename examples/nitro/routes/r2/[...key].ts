export default eventHandler(async (event) => {
  const { key } = event.context.params || {}
  if (!key) {
    throw createError({
      status: 400,
      message: 'Invalid key',
    })
  }
  const bucket = event.context.cloudflare.env.BLOB

  const object = await bucket.get(decodeURI(key))

  if (!object) {
    throw createError({ message: 'File not found', statusCode: 404 })
  }

  if (object.httpMetadata?.contentType) {
    setHeader(event, 'Content-Type', object.httpMetadata?.contentType)
  }
  setHeader(event, 'Content-Length', object.size)

  return object.body
})
