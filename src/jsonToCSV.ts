import PapaParse from 'papaparse';

export function jsonToCSV(json: any, options = {}) {
  return PapaParse.unparse(json, options);
}
