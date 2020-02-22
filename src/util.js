export default function getSize(size) {
  let df = 0
  let sizeKb = 1024
  let sizeMb = sizeKb * sizeKb
  let sizeGb = sizeMb * sizeKb
  let sizeTerra = sizeGb * sizeKb

  if(size < sizeMb) {
    return (size / sizeKb).toFixed(0) + ' KB'
  } else if(size < sizeGb) {
    return (size / sizeMb).toFixed(0) + ' MB'
  } else if(size < sizeTerra) {
    return (size / sizeGb).toFixed(0) + ' GB'
  }

  return ''
}
