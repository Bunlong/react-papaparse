import { readString } from './readString';
import { readRemoteFile } from './readRemoteFile';
import { jsonToCSV } from './jsonToCSV';

export function usePapaParse() {
  return {
    readString,
    readRemoteFile,
    jsonToCSV,
  };
}
