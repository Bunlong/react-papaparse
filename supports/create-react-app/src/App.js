import React, { useState } from 'react'
import { CSVReader, CSVDownloader, readString } from 'react-papaparse'

export default function App() {
  const [isReset, setIsReset] = useState(false);

  const handleReset = () => {
    setIsReset(!isReset)
  }

  const handleOnDrop = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleOnError = (
    err,
    // file,
    // inputElem,
    // reason
  ) => {
    console.log(err)
  }

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

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
    })
  };

  return (
    <>
      <CSVReader
        isReset={isReset}
        onDrop={handleOnDrop}
        onError={handleOnError}
        // noDrag
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
        style={{
          dropArea: {
            borderColor: 'pink',
            borderRadius: 20,
          },
          dropAreaActive: {
            borderColor: 'red',
          },
          dropFile: {
            width: 100,
            height: 120,
            background: '#ccc',
          },
          fileSizeInfo: {
            color: '#fff',
            backgroundColor: '#000',
            borderRadius: 3,
            lineHeight: 1,
            marginBottom: '0.5em',
            padding: '0 0.4em',
          },
          fileNameInfo: {
            color: '#fff',
            backgroundColor: '#eee',
            borderRadius: 3,
            fontSize: 14,
            lineHeight: 1,
            padding: '0 0.4em',
          },
          removeButton: {
            color: 'blue',
          },
          progressBar: {
            backgroundColor: 'pink',
          },
        }}
      >
        <span>Click to upload.</span>
      </CSVReader>
      <button onClick={() => handleReset()}>Reset</button>
      <CSVDownloader
        data={[
          {
            "Column 1": "1-1",
            "Column 2": "1-2",
            "Column 3": "1-3",
            "Column 4": "1-4",
          },
          {
            "Column 1": "2-1",
            "Column 2": "2-2",
            "Column 3": "2-3",
            "Column 4": "2-4",
          },
          {
            "Column 1": "3-1",
            "Column 2": "3-2",
            "Column 3": "3-3",
            "Column 4": "3-4",
          },
          {
            "Column 1": 4,
            "Column 2": 5,
            "Column 3": 6,
            "Column 4": 7,
          },
        ]}
        type="button"
        filename={'filename'}
        config={
          {
            delimiter: ';',
          }
        }
      >
        Download
      </CSVDownloader>
      <CSVDownloader
        data={`Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
#2-1,मुकेश,ខ្ញុំ,2-4
3-1,3-2,អ្នក,3-4
4,5,6,7`}
        filename={'filename'}
        bom={true}
      >
        Download
      </CSVDownloader>
      <CSVDownloader
        filename={'filename'}
        data={() => {
          return [
            {
              "Column 1": "1-1",
              "Column 2": "1-2",
              "Column 3": "1-3",
              "Column 4": "1-4",
            }
          ]}
        }
      >
        Download
      </CSVDownloader>
      <button onClick={() => handleClick()}>readString</button>
    </>
  )
}
