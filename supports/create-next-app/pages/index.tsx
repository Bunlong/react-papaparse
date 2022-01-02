import React, { CSSProperties, useState, useRef, ReactNode } from 'react';
import {
  usePapaParse,
  useCSVDownloader,
  useCSVReader,
  formatFileSize,
} from 'react-papaparse';

export default function Home() {
  const inputRef = useRef<ReactNode>(null);
  const { CSVDownloader, Type } = useCSVDownloader();
  const { CSVReader } = useCSVReader();

  const { readString } = usePapaParse();

  const [hovered, setHovered] = useState(false);

  const handleOnError = (
    err: any
    // file,
    // inputElem,
    // reason
  ) => {
    console.log(err);
  };

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
    });
  };

  const styles = {
    zone: {
      alignItems: 'center',
      borderStyle: 'dashed',
      borderWidth: 2,
      borderRadius: 20,
      borderColor: '#CCC',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      padding: 20,
    } as CSSProperties,
    file: {
      background: 'linear-gradient(to bottom, #EEE, #DDD)',
      borderRadius: 20,
      display: 'flex',
      height: 120,
      width: 120,
      position: 'relative',
      zIndex: 10,
      flexDirection: 'column',
      justifyContent: 'center',
    } as CSSProperties,
    info: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 10,
      paddingRight: 10,
    } as CSSProperties,
    size: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 3,
      marginBottom: '0.5em',
      justifyContent: 'center',
      display: 'flex',
    } as CSSProperties,
    name: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 3,
      fontSize: 12,
      marginBottom: '0.5em',
    } as CSSProperties,
    progressBar: {
      bottom: 14,
      position: 'absolute',
      width: '100%',
      paddingLeft: 10,
      paddingRight: 10,
    } as CSSProperties,
    hover: {
      borderColor: '#686868',
    } as CSSProperties,
    default: {
      borderColor: '#CCC',
    } as CSSProperties,
    // defaultCursor: {
    //   cursor: 'default',
    // } as CSSProperties,
    // pointerCursor: {
    //   cursor: 'pointer',
    // } as CSSProperties,
    // removeButton: {
    //   height: 23,
    //   position: 'absolute',
    //   right: 6,
    //   top: 6,
    //   width: 23,
    // } as CSSProperties,
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
          {({ getRootProps, acceptedFile, ProgressBar }: any) => (
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
                  {...getRootProps()}
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
          onUploadAccepted={(results: any) => {
            console.log('---------------------------');
            console.log(results);
            console.log('---------------------------');
            setHovered(false);
          }}
          onDragOver={(event: DragEvent) => {
            event.preventDefault();
            setHovered(true);
          }}
          onDragLeave={(event: DragEvent) => {
            event.preventDefault();
            setHovered(false);
          }}
          // noDrag
        >
          {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }: any) => (
            <>
              <div
                {...getRootProps()}
                style={Object.assign(
                  {},
                  styles.zone,
                  hovered && styles.hover
                )}
              >
                {acceptedFile ? (
                  <>
                    <div style={styles.file}>
                      <div style={styles.info}>
                        <span style={styles.size}>
                          {formatFileSize(acceptedFile.size)}
                        </span>
                        <span style={styles.name}>{acceptedFile.name}</span>
                      </div>
                      <div style={styles.progressBar}>
                        <ProgressBar />
                      </div>
                    </div>
                  </>
                ) : (
                  'Drop CSV file here or click to upload.'
                  // <div style={styles.file}>
                  //   <div style={styles.info}>
                  //     <span style={styles.size}>
                  //       1 KB
                  //     </span>
                  //     <span style={styles.name}>
                  //       normal.csv
                  //     </span>
                  //   </div>
                  //   <div style={styles.progressBar}>
                  //     <ProgressBar  />
                  //   </div>
                  // </div>
                )}
              </div>
              <button {...getRemoveFileProps()}>
                Remove
              </button>
            </>
          )}
        </CSVReader>
      </div>
    </>
  );
}
