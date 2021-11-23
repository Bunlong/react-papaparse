// Error codes
export const FILE_INVALID_TYPE = 'file-invalid-type';
export const FILE_TOO_LARGE = 'file-too-large';
export const FILE_TOO_SMALL = 'file-too-small';
export const TOO_MANY_FILES = 'too-many-files';

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

export function isEventWithFiles(event: any) {
  if (!event.dataTransfer) {
    return !!event.target && !!event.target.files;
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types
  // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types#file
  return Array.prototype.some.call(
    event.dataTransfer.types,
    (type) => type === 'Files' || type === 'application/x-moz-file',
  );
}

/**
 * Check if the provided file type should be accepted by the input with accept attribute.
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-accept
 *
 * Inspired by https://github.com/enyo/dropzone
 *
 * @param file {File} https://developer.mozilla.org/en-US/docs/Web/API/File
 * @param acceptedFiles {string}
 * @returns {boolean}
 */

export function accepts(file: any, acceptedFiles: any) {
  if (file && acceptedFiles) {
    const acceptedFilesArray = Array.isArray(acceptedFiles)
      ? acceptedFiles
      : acceptedFiles.split(',');
    const fileName = file.name || '';
    const mimeType = (file.type || '').toLowerCase();
    const baseMimeType = mimeType.replace(/\/.*$/, '');

    return acceptedFilesArray.some((type: any) => {
      const validType = type.trim().toLowerCase();
      if (validType.charAt(0) === '.') {
        return fileName.toLowerCase().endsWith(validType);
      } else if (validType.endsWith('/*')) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '');
      }
      return mimeType === validType;
    });
  }
  return true;
}

// File Errors
export const getInvalidTypeRejectionErr = (accept: any) => {
  accept = Array.isArray(accept) && accept.length === 1 ? accept[0] : accept;
  const messageSuffix = Array.isArray(accept)
    ? `one of ${accept.join(', ')}`
    : accept;
  return {
    code: FILE_INVALID_TYPE,
    message: `File type must be ${messageSuffix}`,
  };
};

// Firefox versions prior to 53 return a bogus MIME type for every file drag, so dragovers with
// that MIME type will always be accepted
export function fileAccepted(file: any, accept: any) {
  const isAcceptable =
    file.type === 'application/x-moz-file' || accepts(file, accept);
  return [
    isAcceptable,
    isAcceptable ? null : getInvalidTypeRejectionErr(accept),
  ];
}

export function fileMatchSize(file: any, minSize: any, maxSize: any) {
  if (isDefined(file.size)) {
    if (isDefined(minSize) && isDefined(maxSize)) {
      if (file.size > maxSize) {
        return [false, getTooLargeRejectionErr(maxSize)];
      }
      if (file.size < minSize) {
        return [false, getTooSmallRejectionErr(minSize)];
      }
    } else if (isDefined(minSize) && file.size < minSize) {
      return [false, getTooSmallRejectionErr(minSize)];
    } else if (isDefined(maxSize) && file.size > maxSize) {
      return [false, getTooLargeRejectionErr(maxSize)];
    }
  }
  return [true, null];
}

function isDefined(value: any) {
  return value !== undefined && value !== null;
}

export const getTooLargeRejectionErr = (maxSize: any) => {
  return {
    code: FILE_TOO_LARGE,
    message: `File is larger than ${maxSize} bytes`,
  };
};

export const getTooSmallRejectionErr = (minSize: any) => {
  return {
    code: FILE_TOO_SMALL,
    message: `File is smaller than ${minSize} bytes`,
  };
};

export const TOO_MANY_FILES_REJECTION = {
  code: TOO_MANY_FILES,
  message: 'Too many files',
};
