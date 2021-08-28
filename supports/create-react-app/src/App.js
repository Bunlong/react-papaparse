import React, { useState } from 'react';
import { CSVReader, CSVDownloader } from 'react-papaparse'

const buttonRef= React.createRef()

function App() {
  const [isReset, setIsReset] = useState(true);

  const handleReset = () => {
    setIsReset(!isReset);
  }

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point 
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }
  
  const handleOnFileLoad = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleOnDrop = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  return (
    <>
      <CSVReader
        isReset={isReset}
        ref={buttonRef}
        onFileLoad={handleOnDrop}
        onError={handleOnError}
        noClick
        noDrag
        onRemoveFile={handleOnRemoveFile}
      >
        {({ file }) => (
          <aside
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10
            }}
          >
            <button
              type='button'
              onClick={handleOpenDialog}
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                width: '40%',
                paddingLeft: 0,
                paddingRight: 0
              }}
            >
              Browe file
            </button>
            <div
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ccc',
                height: 45,
                lineHeight: 2.5,
                marginTop: 5,
                marginBottom: 5,
                paddingLeft: 13,
                paddingTop: 3,
                width: '60%'
              }}
            >
              {file && file.name}
            </div>
            <button
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 20,
                paddingRight: 20
              }}
              onClick={handleRemoveFile}
            >
              Remove
            </button>
          </aside>
        )}
      </CSVReader>
      <CSVDownloader
//         data={`Column 1,Column 2,Column 3,Column 4
// 1-1,1-2,1-3,1-4
// 2-1,2-2,2-3,2-4
// 3-1,3-2,3-3,3-4
// 4,5,6,7`}
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
        filename={'filename'}
        type='button'
        config={
          {
            delimiter: ',',
          }
        }
      >
        Download
      </CSVDownloader>
      <button onClick={() => handleReset()}>Reset</button>
    </>
  );
}

export default App;
