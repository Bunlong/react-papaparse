export default function getSize(size: number) {
  const sizeKb = 1024;
  const sizeMb = sizeKb * sizeKb;
  const sizeGb = sizeMb * sizeKb;
  const sizeTerra = sizeGb * sizeKb;

  if (size < sizeMb) {
    const calculatedSizeMb = Number((size / sizeKb).toFixed(0));
    if (calculatedSizeMb <= 0) {
      return size + ' B';
    }
    return calculatedSizeMb + ' KB';
  } else if (size < sizeGb) {
    return (size / sizeMb).toFixed(0) + ' MB';
  } else if (size < sizeTerra) {
    return (size / sizeGb).toFixed(0) + ' GB';
  }

  return '';
}

export function lightenDarkenColor(col: string, amt: number) {
  let usePound = false;
  if (col[0] == '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }

  let b = ((num >> 8) & 0x00ff) + amt;
  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  let g = (num & 0x0000ff) + amt;
  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }
  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}
