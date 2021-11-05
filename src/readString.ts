import PapaParse, { NODE_STREAM_INPUT } from 'papaparse';
import { CustomConfig } from './model';

export function readString<T>(
  str: typeof NODE_STREAM_INPUT,
  options: CustomConfig<T> = {},
) {
  return PapaParse.parse(str, options);
}
