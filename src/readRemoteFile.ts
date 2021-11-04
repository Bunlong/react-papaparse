import PapaParse, { NODE_STREAM_INPUT } from 'papaparse';
import { ReadRemoteFileConfig } from './model';

export function readRemoteFile<T>(url: typeof NODE_STREAM_INPUT, options: ReadRemoteFileConfig<T>) {
  PapaParse.parse(url, Object.assign({}, { download: true }, options));
}
