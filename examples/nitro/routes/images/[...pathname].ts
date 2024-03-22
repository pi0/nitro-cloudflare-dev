export default eventHandler(async (event) => {
  const { pathname } = event.context.params || {}
  if (!pathname) {
    throw createError({
      status: 400,
      message: 'Invalid pathname',
    })
  }
  const assets = useStorage('assets/server')

  return await assets.getItemRaw(pathname)
})
