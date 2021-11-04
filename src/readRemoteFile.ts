import PapaParse, { NODE_STREAM_INPUT } from 'papaparse';
import { CustomConfig } from './model';

export function readRemoteFile<T>(
  url: typeof NODE_STREAM_INPUT,
  options: CustomConfig<T>,
) {
  PapaParse.parse(url, Object.assign({}, { download: true }, options));
}
