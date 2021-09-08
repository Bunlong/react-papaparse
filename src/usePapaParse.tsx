import { readString } from './readString';
import { readRemoteFile } from './readRemoteFile';

export function usePapaParse() {
  return {
    readString,
    readRemoteFile,
  };
}
