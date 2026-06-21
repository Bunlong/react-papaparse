import Papa, { ParseConfig } from "papaparse";

export function readRemoteFile<T = any>(
  url: string,
  config: ParseConfig = {}
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(url, {
      download: true,
      ...config,
      complete: (results) => resolve(results.data),
      error: reject,
    });
  });
}
