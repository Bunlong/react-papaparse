import PapaParse, { UnparseConfig } from 'papaparse';

export function jsonToCSV(json: any, options: UnparseConfig = {}) {
  return PapaParse.unparse(json, options);
}
