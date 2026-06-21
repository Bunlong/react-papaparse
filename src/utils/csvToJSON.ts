import Papa from 'papaparse';

export function csvToJSON<T = any>(csv: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(csv, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        resolve(results.data);
      },

      error: (err: any) => {
        reject(err);
      },
    });
  });
}
