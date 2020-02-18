import PapaParse from 'papaparse'

export function readRemoteFile (url, options = {}) { 
  PapaParse.parse(url, Object.assign({}, {download: true}, options))
}
