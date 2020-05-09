import PapaParse from 'papaparse';

export function readRemoteFile(url: string, options = {}) {
  PapaParse.parse(url, Object.assign({}, { download: true }, options));
}
