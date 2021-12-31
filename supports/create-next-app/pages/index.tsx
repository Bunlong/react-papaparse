import React, { useState } from 'react'
import {
  usePapaParse,
  useCSVDownloader,
  useCSVReader,
} from 'react-papaparse'

export default function Home() {
  const { CSVDownloader, Type } = useCSVDownloader();
  const { CSVReader } = useCSVReader();

  const { readString } = usePapaParse();

  const handleOnError = (
    err: any,
    // file,
    // inputElem,
    // reason
  ) => {
    console.log(err)
  }

  const handleReadString = () => {
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
      <div>
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
          filename={'filename'}
          config={
            {
              delimiter: ';',
            }
          }
          type={Type.Button}
        >
          Download ( Button )
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
          Download ( Link )
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
          type={Type.Button}
        >
          Download ( Data as a Function/Callback )
        </CSVDownloader>
      </div>
      <div>
        <button onClick={() => handleReadString()}>readString</button>
      </div>
      <div>
        <CSVReader
          onUploadAccepted={(results: any)=> {
            console.log('---------------------------');
            console.log(results);
            console.log('---------------------------');
          }}
        >
          {({ getButtonProps, acceptedFile, ProgressBar }: any) => (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}
              >
                <button
                  type="button"
                  {...getButtonProps()}
                  style={{
                    width: '20%',
                  }}
                >
                  Browse file
                </button>
                <div
                  style={{
                    border: '1px solid #ccc',
                    height: 45,
                    lineHeight: 2.5,
                    paddingLeft: 10,
                    width: '80%',
                  }}
                >
                  {acceptedFile && acceptedFile.name}
                </div>
              </div>
              <ProgressBar style={{backgroundColor: 'red'}} />
            </>
          )}
        </CSVReader>
      </div>
      <div>
        <CSVReader
          onDropAccepted={(results: any)=> {
            console.log('---------------------------');
            console.log(results);
            console.log('---------------------------');
          }}
          noDrag
        >
          {({ getDropzoneProps, acceptedFile, ProgressBar }: any) => (
            <>
              <div
                {...getDropzoneProps()}
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  borderRadius: 20,
                  borderColor: '#CCC',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  padding: 20,
                }}
              >
                <span style={{ textAlign: 'center' }}>
                  {acceptedFile ? acceptedFile.name : 'Drop CSV file here or click to upload.'}
                </span>
                <ProgressBar />
              </div>
            </>
          )}
        </CSVReader>
      </div>
    </>
  )
}
