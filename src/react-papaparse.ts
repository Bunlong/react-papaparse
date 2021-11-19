import PapaParse from 'papaparse';

export const BAD_DELIMITERS = PapaParse.BAD_DELIMITERS;
export const RECORD_SEP = PapaParse.RECORD_SEP;
export const UNIT_SEP = PapaParse.UNIT_SEP;
export const WORKERS_SUPPORTED = PapaParse.WORKERS_SUPPORTED;

export const LocalChunkSize = PapaParse.LocalChunkSize;
export const DefaultDelimiter = PapaParse.DefaultDelimiter;

export { default as CSVReader } from './CSVReader';
export {
  default as CSVDownloader,
  LINK_TYPE,
  BUTTON_TYPE,
} from './CSVDownloader';
export { readString } from './readString';
export { readRemoteFile } from './readRemoteFile';
export { jsonToCSV } from './jsonToCSV';

export { usePapaParse } from './usePapaParse';
export { useCSVDownloader } from './useCSVDownloader';
