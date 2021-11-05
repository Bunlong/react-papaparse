import PapaParse, { ParseRemoteConfig } from 'papaparse';

export function readRemoteFile<T>(url: string, config: ParseRemoteConfig<T>) {
  PapaParse.parse(url, Object.assign({}, { download: true }, config));
}
