import { csvToJSON } from '../utils/csvToJSON';
import { csvToArray } from '../utils/csvToArray';
import { readRemoteFile } from '../utils/readRemoteFile';

export function usePapaParse() {
  return {
    csvToJSON,
    csvToArray,
    readRemoteFile,
  };
}
