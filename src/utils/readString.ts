import PapaParse from 'papaparse';

import { ReadStringConfig } from '../models';

export function readString<T>(
  csvString: string,
  config: ReadStringConfig<T>,
) {
  return PapaParse.parse(csvString as any, config);
}
