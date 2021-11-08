import PapaParse, { ParseWorkerConfig } from 'papaparse';

export function readString<T>(
  csvString: string,
  config: ParseWorkerConfig<T> & { download?: false | undefined },
) {
  return PapaParse.parse(csvString, config);
}
