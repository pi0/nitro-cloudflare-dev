export default eventHandler(async (event) => {
  const bucket = event.context.cloudflare.env.BLOB
  if (isMethod(event, 'POST')) {
    console.log('upload image')
    const form = await readFormData(event)
    const image = form.get('image') as File

    await bucket.put(image.name, image)
  }
  // List images
  const { objects } = await bucket.list({
    limit: 500,
    include: ['httpMetadata', 'customMetadata'],
  })
  const imgs = objects.map((obj) => {
    return `<img src="/r2/${obj.key}" alt="${obj.key}" width="300" />`
  }).join('\n')

  return `
    <form method="POST" enctype="multipart/form-data">
      <label>Upload an image: <input type="file" name="image"></label>
      <button type="submit">Upload</button>
    </form>
    ${imgs}
  `
})
