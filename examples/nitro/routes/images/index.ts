export default eventHandler(async (event) => {
  const assets = useStorage('assets/server')
  const paths = await assets.getKeys()

  return paths.map((path) => {
    return `<img src="/images/${path}" alt="${path}" width="300" />`
  }).join('\n')
})
