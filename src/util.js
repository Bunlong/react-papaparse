export default function getSize(size) {
  const sizeKb = 1024
  const sizeMb = sizeKb * sizeKb
  const sizeGb = sizeMb * sizeKb
  const sizeTerra = sizeGb * sizeKb

  if (size < sizeMb) {
    return (size / sizeKb).toFixed(0) + ' KB'
  } else if (size < sizeGb) {
    return (size / sizeMb).toFixed(0) + ' MB'
  } else if (size < sizeTerra) {
    return (size / sizeGb).toFixed(0) + ' GB'
  }

  return ''
}
