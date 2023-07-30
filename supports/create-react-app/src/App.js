import {
  // readString,
  // jsonToCSV,
  // readRemoteFile,
  usePapaParse,
} from 'react-papaparse';

function App() {
  const {
    readString,
    jsonToCSV,
    readRemoteFile,
  } = usePapaParse();

  const handleClick = () => {
    const csvString = `Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`;

    readString(csvString, {
      worker: true,
      complete: (results) => {
        console.log('---------------------------');
        console.log(results);
        console.log('---------------------------');
      },
    });
  };

  const handleJsonToCSV = () => {
    const jsonData = `[
      {
          "Column 1": "1-1",
          "Column 2": "1-2",
          "Column 3": "1-3",
          "Column 4": "1-4"
      },
      {
          "Column 1": "2-1",
          "Column 2": "2-2",
          "Column 3": "2-3",
          "Column 4": "2-4"
      },
      {
          "Column 1": "3-1",
          "Column 2": "3-2",
          "Column 3": "3-3",
          "Column 4": "3-4"
      },
      {
          "Column 1": 4,
          "Column 2": 5,
          "Column 3": 6,
          "Column 4": 7
      }
    ]`;
    const results = jsonToCSV(jsonData);
    console.log('---------------------------');
    console.log('Results:', results);
    console.log('---------------------------');
  };

  const handleReadRemoteFile = () => {
    readRemoteFile('https://react-papaparse.js.org/static/csv/normal.csv', {
      complete: (results) => {
        console.log('---------------------------');
        console.log('Results:', results);
        console.log('---------------------------');
      },
    });
  };

  return (
    <main>
      <button onClick={() => handleClick()}>readString</button>
      <button onClick={() => handleJsonToCSV()}>jsonToCSV</button>
      <button onClick={() => handleReadRemoteFile()}>readRemoteFile</button>
    </main>
  );
}

export default App;
