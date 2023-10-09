import PapaParse, { NODE_STREAM_INPUT, ParseResult } from 'papaparse';

import { ReadStringConfig } from './model';

export function readString<T>(
  csvString: string | typeof NODE_STREAM_INPUT,
  config: ReadStringConfig<T> & {
    download?: false | undefined;
    complete(results: ParseResult<T>): void;
  },
) {
  return PapaParse.parse(csvString as typeof NODE_STREAM_INPUT, config);
}
