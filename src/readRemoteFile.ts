import PapaParse, { ParseConfig } from 'papaparse';

export function readRemoteFile<T>(url: string, options: ParseConfig<T> = {}) {
  PapaParse.parse(url, Object.assign({}, { download: true }, options));
}
