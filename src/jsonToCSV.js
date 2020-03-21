import PapaParse from 'papaparse'

export function jsonToCSV (json, options = {}) {
  return PapaParse.unparse(json, options)
}
