import PapaParse, { ParseConfig } from 'papaparse';

export function readString<T>(str: string, options: ParseConfig<T> = {}) {
  return PapaParse.parse(str, options);
}
