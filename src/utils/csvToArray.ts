import Papa from "papaparse";

export function csvToArray(csv: string): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    Papa.parse<string[]>(csv, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data as string[][]),
      error: reject,
    });
  });
}
