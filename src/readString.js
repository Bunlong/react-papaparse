import PapaParse from 'papaparse'

export function readString (str, options = {}) {
  return PapaParse.parse(str, options)
}
