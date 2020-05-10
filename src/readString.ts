import PapaParse from 'papaparse';

export function readString(str: string, options = {}) {
  return PapaParse.parse(str, options);
}
