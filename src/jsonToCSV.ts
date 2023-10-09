import PapaParse, { UnparseObject, UnparseConfig } from 'papaparse';

export function jsonToCSV<T>(
  json: T[] | UnparseObject<T>,
  options: UnparseConfig = {},
) {
  return PapaParse.unparse(json, options);
}
