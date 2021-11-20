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

function isIe(userAgent: any) {
  return (
    userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident/') !== -1
  );
}

function isEdge(userAgent: any) {
  return userAgent.indexOf('Edge/') !== -1;
}

export function isIeOrEdge(userAgent = window.navigator.userAgent) {
  return isIe(userAgent) || isEdge(userAgent);
}

// React's synthetic events has event.isPropagationStopped,
// but to remain compatibility with other libs (Preact) fall back
// to check event.cancelBubble
export function isPropagationStopped(event: any) {
  if (typeof event.isPropagationStopped === 'function') {
    return event.isPropagationStopped();
  } else if (typeof event.cancelBubble !== 'undefined') {
    return event.cancelBubble;
  }
  return false;
}

/**
 * This is intended to be used to compose event handlers
 * They are executed in order until one of them calls `event.isPropagationStopped()`.
 * Note that the check is done on the first invoke too,
 * meaning that if propagation was stopped before invoking the fns,
 * no handlers will be executed.
 *
 * @param {Function} fns the event hanlder functions
 * @return {Function} the event handler to add to an element
 */
export function composeEventHandlers(...fns: any[]) {
  return (event: any, ...args: any[]) =>
    fns.some((fn) => {
      if (!isPropagationStopped(event) && fn) {
        fn(event, ...args);
      }
      return isPropagationStopped(event);
    });
}
