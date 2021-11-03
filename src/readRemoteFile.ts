import PapaParse, { ParseConfig, NODE_STREAM_INPUT } from 'papaparse';

export function readRemoteFile<T>(url: typeof NODE_STREAM_INPUT, options: ParseConfig<T> = {}) {
  PapaParse.parse(url, Object.assign({}, { download: true }, options));
}
