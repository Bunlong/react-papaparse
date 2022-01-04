import React, { useState, CSSProperties } from 'react';
import {
  usePapaParse,
  useCSVDownloader,
  useCSVReader,
  formatFileSize,
  lightenDarkenColor,
} from 'react-papaparse';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(DEFAULT_REMOVE_HOVER_COLOR, 40)
const GREY_DIM = '#686868';

export default function Home() {
  const { CSVDownloader, Type } = useCSVDownloader();

  const { readString } = usePapaParse();
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

  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(DEFAULT_REMOVE_HOVER_COLOR);
  const styles = {
    zone: {
      alignItems: 'center',
      border: `2px dashed ${GREY}`,
      borderRadius: 20,
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
      backgroundColor: GREY_LIGHT,
      borderRadius: 3,
      marginBottom: '0.5em',
      justifyContent: 'center',
      display: 'flex',
    } as CSSProperties,
    name: {
      backgroundColor: GREY_LIGHT,
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
    zoneHover: {
      borderColor: GREY_DIM,
    } as CSSProperties,
    default: {
      borderColor: GREY,
    } as CSSProperties,
    remove: {
      height: 23,
      position: 'absolute',
      right: 6,
      top: 6,
      width: 23,
    } as CSSProperties,
    // defaultCursor: {
    //   cursor: 'default',
    // } as CSSProperties,
    // pointerCursor: {
    //   cursor: 'pointer',
    // } as CSSProperties,
  };

  return (
    <>
      <div>
        {/* <CSVDownloader
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
        </CSVDownloader> */}
        {/* <CSVDownloader
          data={`Column 1,Column 2,Column 3,Column 4
  1-1,1-2,1-3,1-4
  #2-1,मुकेश,ខ្ញុំ,2-4
  3-1,3-2,អ្នក,3-4
  4,5,6,7`}
          filename={'filename'}
          bom={true}
        >
          Download ( Link )
        </CSVDownloader> */}
        {/* <CSVDownloader
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
        </CSVDownloader> */}
      </div>
      {/* <div>
        <button onClick={() => handleReadString()}>readString</button>
      </div> */}
      {/* <div>
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
      </div> */}
      <div>
        <CSVReader
          onUploadAccepted={(results: any) => {
            console.log('---------------------------');
            console.log(results);
            console.log('---------------------------');
            setZoneHover(false);
          }}
          onDragOver={(event: DragEvent) => {
            event.preventDefault();
            setZoneHover(true);
          }}
          onDragLeave={(event: DragEvent) => {
            event.preventDefault();
            setZoneHover(false);
          }}
          // noDrag
        >
          {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps, Remove }: any) => (
            <>
              <div
                {...getRootProps()}
                style={Object.assign(
                  {},
                  styles.zone,
                  zoneHover && styles.zoneHover
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
                      <div
                        {...getRemoveFileProps()}
                        style={styles.remove}
                        onMouseOver={(event: Event) => {
                          event.preventDefault();
                          setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                        }}
                        onMouseOut={(event) => {
                          event.preventDefault();
                          setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                        }}
                      >
                        <Remove color={removeHoverColor} />
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
                  //     <span style={styles.name}>normal.csv</span>
                  //   </div>
                  //   <div style={styles.progressBar}>
                  //     <ProgressBar />
                  //   </div>
                  //   <div
                  //     {...getRemoveFileProps()}
                  //     style={styles.remove}
                  //     onMouseOver={(event: Event) => {
                  //       event.preventDefault();
                  //       setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                  //     }}
                  //     onMouseOut={(event) => {
                  //       event.preventDefault();
                  //       setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                  //     }}
                  //   >
                  //     <Remove color={removeHoverColor} />
                  //   </div>
                  // </div>
                )}
              </div>
            </>
          )}
        </CSVReader>
      </div>
    </>
  );
}
