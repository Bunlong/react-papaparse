import React from 'react';

import { usePapaParse } from 'react-papaparse';

export default function ReadRemoteFile() {
  const { readRemoteFile } = usePapaParse();

  const handleReadRemoteFile = () => {
    readRemoteFile('https://react-papaparse.js.org/static/csv/normal.csv', {
      complete: (results) => {
        console.log('---------------------------');
        console.log('Results:', results);
        console.log('---------------------------');
      },
    });
  };

  return <button onClick={() => handleReadRemoteFile()}>readRemoteFile</button>;
}
