import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { usePapaParse, useCSVReader, lightenDarkenColor, formatFileSize } from 'react-papaparse';

// const BASE_URL = 'https://github.com/Bunlong/react-papaparse/blob/master';
const BASE_URL = 'https://github.com/Bunlong/react-papaparse/blob/v4.0.0/examples';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = '#686868';

const buttonStyles = {
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  browseFile: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    width: '40%',
  },
  acceptedFile: {
    border: '1px solid rgb(204, 204, 204)',
    height: 45,
    lineHeight: 2.5,
    margin: '5px 0 5px 0',
    padding: '3px 0 0 13px',
    width: '60%',
  },
  remove: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: '0 20px',
  },
  progressBarBackgroundColor: {
    backgroundColor: 'red',
  },
};

const dragStyles = {
  zone: {
    alignItems: 'center',
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  },
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
  },
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
  },
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
  },
  progressBar: {
    bottom: 14,
    position: 'absolute',
    width: '85%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  zoneHover: {
    borderColor: GREY_DIM,
  },
  default: {
    borderColor: GREY,
  },
  remove: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  },
};

export default function Demo() {
  const [tabIndex, setTabIndex] = useState(0);

  const { readString, readRemoteFile, jsonToCSV } = usePapaParse();
  const [str, setStr] = useState(`Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`);

  const [csvData, setCsvData] = useState(null);
  const { CSVReader } = useCSVReader();
  const { CSVReader: CSVReader1 } = useCSVReader();
  const { CSVReader: CSVReader2 } = useCSVReader();
  const { CSVReader: CSVReader3 } = useCSVReader();

  const [zoneHover1, setZoneHover1] = useState(false);
  const [removeHoverColor1, setRemoveHoverColor1] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );

  const [zoneHover2, setZoneHover2] = useState(false);
  const [removeHoverColor2, setRemoveHoverColor2] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );

  const [zoneHover3, setZoneHover3] = useState(false);
  const [removeHoverColor3, setRemoveHoverColor3] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );

  const [url, setUrl] = useState('');
  const [jsonData, setJsonData] = useState(`[
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
]`);

  const handleSelect = (index) => {
    setTabIndex(index);
  };

  const handleStrChange = (e) => {
    setStr(e.target.value);
  };

  const handleImportOffer = () => {
    if (tabIndex === 0) {
      readString(str, {
        worker: true,
        complete: (results) => {
          console.log('---------------------------');
          console.log(results);
          console.log('---------------------------');
        },
      });
    } else if (tabIndex === 1) {
      console.log('---------------------------');
      console.log(csvData);
      console.log('---------------------------');
    } else if (tabIndex === 2) {
      if (url === '') {
        // eslint-disable-next-line no-undef
        alert('Please enter the URL of a file to download and parse.');
        return;
      }
      console.log('Running!');
      readRemoteFile(url, {
        complete: (results) => {
          console.log('---------------------------');
          console.log('Parse complete!');
          console.log('Row count: ', results.data.length);
          console.log('Errors: ', results.errors.length);
          console.log('Results: ', results);
          console.log('---------------------------');
        },
      });
    } else {
      try {
        const results = jsonToCSV(jsonData);
        console.log('---------------------------');
        console.log(results);
        console.log('---------------------------');
      } catch (e) {
        // eslint-disable-next-line no-undef
        alert('Please enter valid JSON.');
      }
    }
  }

  const handleURLChange = (event) => {
    setUrl(event.target.value);
  };

  const setURL = (url) => {
    setUrl(url);
  };

  const handleJsonDataChange = (event) => {
    setJsonData(event.target.value);
  }

  return (
    <>
      <main>
        <header>
          <div className="grid-container">
            <div className="grid-40 mobile-grid-50">
              <div className="links">
                <a href="/">
                  <i className="fa fa-home fa-lg" /> Home
                </a>
                <a href="/demo">
                  <i className="fa fa-magic fa-lg" /> Demo
                </a>
                <a href="/docs">
                  <i className="fa fa-book fa-lg" /> Docs
                </a>
              </div>
            </div>
            <div className="grid-20 hide-on-mobile text-center">
              <a href="/" className="text-logo">
                react-papaparse 4
              </a>
            </div>
            <div className="grid-40 mobile-grid-50 text-right">
              <div className="links">
                <a href="https://github.com/Bunlong/react-papaparse">
                  <i className="fa fa-github fa-lg" /> GitHub
                </a>
              </div>
            </div>
          </div>
        </header>

        <h1>Choose a Demo</h1>

        <div className="grid-container">
          <div className="grid-66">
            <Tabs onSelect={(index) => handleSelect(index)}>
              <TabList>
                <Tab>String</Tab>
                <Tab>Local File(s)</Tab>
                <Tab>Remote File</Tab>
                <Tab>JSON to CSV</Tab>
              </TabList>
              <TabPanel>
                <div className="input-area" id="input-string">
                  <div style={{ marginBottom: 14, textAlignLast: 'end' }}>
                    <a href={`${BASE_URL}/readString.tsx`}>
                      Source code
                    </a>
                  </div>
                  <textarea
                    id="input"
                    placeholder="String input"
                    onChange={(event) => handleStrChange(event)}
                    value={str}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="input-area" id="input-string">
                  <div className="text-center">
                    Choose one or more delimited text files for
                    react-papaparse to parse.
                  </div>
                  <div style={{ marginTop: 60, marginBottom: 46 }}>
                    <h5>Basic Upload</h5>
                    <div style={{ marginBottom: 14, textAlignLast: 'end' }}>
                      <a href={`${BASE_URL}/CSVReaderBasicUpload.tsx`}>
                        Source code
                      </a>
                    </div>
                    <CSVReader
                      onUploadAccepted={(results)=> {
                        setCsvData(results);
                      }}
                    >
                      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
                        <>
                          <div style={buttonStyles.csvReader}>
                            <button
                              type="button"
                              {...getRootProps()}
                              style={buttonStyles.browseFile}
                            >
                              Browse file
                            </button>
                            <div style={buttonStyles.acceptedFile}>
                              {acceptedFile && acceptedFile.name}
                            </div>
                            <button
                              {...getRemoveFileProps()}
                              style={buttonStyles.remove}
                              className="button red"
                            >
                              Remove
                            </button>
                          </div>
                          <ProgressBar style={buttonStyles.progressBarBackgroundColor} />
                        </>
                      )}
                    </CSVReader>
                  </div>
                  <div style={{ marginTop: 50, marginBottom: 46 }}>
                    <h5>Click and Drag Upload</h5>
                    <div style={{ marginBottom: 14, textAlignLast: 'end' }}>
                      <a href={`${BASE_URL}/CSVReaderClickAndDragUpload.tsx`}>
                        Source code
                      </a>
                    </div>
                    <CSVReader1
                      onUploadAccepted={(results) => {
                        setCsvData(results);
                        setZoneHover1(false);
                      }}
                      onDragOver={(event) => {
                        event.preventDefault();
                        setZoneHover1(true);
                      }}
                      onDragLeave={(event) => {
                        event.preventDefault();
                        setZoneHover1(false);
                      }}
                    >
                      {({
                        getRootProps,
                        acceptedFile,
                        ProgressBar,
                        getRemoveFileProps,
                        Remove,
                      }) => (
                        <>
                          <div
                            {...getRootProps()}
                            style={Object.assign(
                              {},
                              dragStyles.zone,
                              zoneHover1 && dragStyles.zoneHover
                            )}
                          >
                            {acceptedFile ? (
                              <>
                                <div style={dragStyles.file}>
                                  <div style={dragStyles.info}>
                                    <span style={dragStyles.size}>
                                      {formatFileSize(acceptedFile.size)}
                                    </span>
                                    <span style={dragStyles.name}>{acceptedFile.name}</span>
                                  </div>
                                  <div style={dragStyles.progressBar}>
                                    <ProgressBar />
                                  </div>
                                  <div
                                    {...getRemoveFileProps()}
                                    style={dragStyles.remove}
                                    onMouseOver={(event) => {
                                      event.preventDefault();
                                      setRemoveHoverColor1(REMOVE_HOVER_COLOR_LIGHT);
                                    }}
                                    onMouseOut={(event) => {
                                      event.preventDefault();
                                      setRemoveHoverColor1(DEFAULT_REMOVE_HOVER_COLOR);
                                    }}
                                  >
                                    <Remove color={removeHoverColor1} />
                                  </div>
                                </div>
                              </>
                            ) : (
                              'Drop CSV file here or click to upload'
                            )}
                          </div>
                        </>
                      )}
                    </CSVReader1>
                  </div>
                  <div style={{ marginTop: 50, marginBottom: 46 }}>
                    <h5>DRAG ( NO CLICK ) UPLOAD</h5>
                    <div style={{ marginBottom: 14, textAlignLast: 'end' }}>
                      <a href={`${BASE_URL}/CSVReaderDragNoClickUpload.tsx`}>
                        Source code
                      </a>
                    </div>
                    <CSVReader2
                      onUploadAccepted={(results) => {
                        setCsvData(results);
                        setZoneHover2(false);
                      }}
                      onDragOver={(event) => {
                        event.preventDefault();
                        setZoneHover2(true);
                      }}
                      onDragLeave={(event) => {
                        event.preventDefault();
                        setZoneHover2(false);
                      }}
                      noClick
                    >
                      {({
                        getRootProps,
                        acceptedFile,
                        ProgressBar,
                        getRemoveFileProps,
                        Remove,
                      }) => (
                        <>
                          <div
                            {...getRootProps()}
                            style={Object.assign(
                              {},
                              dragStyles.zone,
                              zoneHover2 && dragStyles.zoneHover
                            )}
                          >
                            {acceptedFile ? (
                              <>
                                <div style={dragStyles.file}>
                                  <div style={dragStyles.info}>
                                    <span style={dragStyles.size}>
                                      {formatFileSize(acceptedFile.size)}
                                    </span>
                                    <span style={dragStyles.name}>{acceptedFile.name}</span>
                                  </div>
                                  <div style={dragStyles.progressBar}>
                                    <ProgressBar />
                                  </div>
                                  <div
                                    {...getRemoveFileProps()}
                                    style={dragStyles.remove}
                                    onMouseOver={(event) => {
                                      event.preventDefault();
                                      setRemoveHoverColor2(REMOVE_HOVER_COLOR_LIGHT);
                                    }}
                                    onMouseOut={(event) => {
                                      event.preventDefault();
                                      setRemoveHoverColor2(DEFAULT_REMOVE_HOVER_COLOR);
                                    }}
                                  >
                                    <Remove color={removeHoverColor2} />
                                  </div>
                                </div>
                              </>
                            ) : (
                              'Drop CSV file here to upload'
                            )}
                          </div>
                        </>
                      )}
                    </CSVReader2>
                  </div>
                  <div style={{ marginTop: 50, marginBottom: 46 }}>
                    <h5>CLICK ( NO DRAG ) UPLOAD</h5>
                    <div style={{ marginBottom: 14, textAlignLast: 'end' }}>
                      <a href={`${BASE_URL}/CSVReaderClickNoDragUpload.tsx`}>
                        Source code
                      </a>
                    </div>
                    <CSVReader3
                      onUploadAccepted={(results) => {
                        setCsvData(results);
                        setZoneHover3(false);
                      }}
                      onDragOver={(event) => {
                        event.preventDefault();
                        setZoneHover3(true);
                      }}
                      onDragLeave={(event) => {
                        event.preventDefault();
                        setZoneHover3(false);
                      }}
                      noDrag
                    >
                      {({
                        getRootProps,
                        acceptedFile,
                        ProgressBar,
                        getRemoveFileProps,
                        Remove,
                      }) => (
                        <>
                          <div
                            {...getRootProps()}
                            style={Object.assign(
                              {},
                              dragStyles.zone,
                              zoneHover3 && dragStyles.zoneHover
                            )}
                          >
                            {acceptedFile ? (
                              <>
                                <div style={dragStyles.file}>
                                  <div style={dragStyles.info}>
                                    <span style={dragStyles.size}>
                                      {formatFileSize(acceptedFile.size)}
                                    </span>
                                    <span style={dragStyles.name}>{acceptedFile.name}</span>
                                  </div>
                                  <div style={dragStyles.progressBar}>
                                    <ProgressBar />
                                  </div>
                                  <div
                                    {...getRemoveFileProps()}
                                    style={dragStyles.remove}
                                    onMouseOver={(event) => {
                                      event.preventDefault();
                                      setRemoveHoverColor3(REMOVE_HOVER_COLOR_LIGHT);
                                    }}
                                    onMouseOut={(event) => {
                                      event.preventDefault();
                                      setRemoveHoverColor3(DEFAULT_REMOVE_HOVER_COLOR);
                                    }}
                                  >
                                    <Remove color={removeHoverColor3} />
                                  </div>
                                </div>
                              </>
                            ) : (
                              'Click to upload'
                            )}
                          </div>
                        </>
                      )}
                    </CSVReader3>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="input-area" id="input-string">
                  <div style={{ marginBottom: 14, textAlignLast: 'end' }}>
                    <a href={`${BASE_URL/readRemoteFile.tsx}`}>
                      Source code
                    </a>
                  </div>
                  <div>
                    <div className="text-center">
                      Type the URL of the file to be downloaded and parsed.
                      <br />
                      <small>
                        (cross-origin requests require
                        Access-Control-Allow-Origin header)
                      </small>
                    </div>
                    <input
                      type="text"
                      id="url"
                      placeholder="URL"
                      value={url}
                      onChange={(event) => handleURLChange(event)}
                    />
                    Sample remote files:
                    <ul>
                      <li>
                        <a
                          id="local-normal-file"
                          onClick={() =>
                            setURL('/static/csv/normal.csv')
                          }
                          style={{ cursor: 'pointer' }}
                        >
                          Normal file
                        </a>
                      </li>
                      <li>
                        <a
                          id="local-large-file"
                          onClick={() => setURL('/static/csv/big.csv')}
                          style={{ cursor: 'pointer' }}
                        >
                          Large file
                        </a>
                      </li>
                      <li>
                        <a
                          id="local-malformed-file"
                          onClick={() =>
                            setURL('/static/csv/malformed.csv')
                          }
                          style={{ cursor: 'pointer' }}
                        >
                          Malformed file
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="input-area" id="input-string">
                  <div style={{ float: 'right', marginBottom: 14 }}>
                    <a href={`${BASE_URL}/jsonToCSV.tsx`}>
                      Source code
                    </a>
                  </div>
                  <textarea
                    id="json"
                    placeholder="JSON string"
                    value={jsonData}
                    onChange={(event) => handleJsonDataChange(event)}
                  />
                </div>
              </TabPanel>
            </Tabs>
            <div className="text-center">
              <div className="see-results">
                Results will appear in the console of your browser's inspector
                tools
              </div>
              <button
                id="submit"
                className="green"
                onClick={() => handleImportOffer()}
              >
                Parse
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}


// ================================

/*

import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {
  CSVReader,
  readString,
  jsonToCSV,
  readRemoteFile,
} from 'react-papaparse';

const buttonRef = React.createRef();

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      str: `Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`,
      csvData: null,
      url: '',
      jsonData: `[
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
]`,
    };
  }

  handleImportOffer = () => {
    const index = this.state.tabIndex;
    if (index === 0) {
      readString(this.state.str, {
        worker: true,
        complete: (results) => {
          console.log('---------------------------');
          console.log('Parse complete!');
          console.log('Row count: ', results.data.length);
          console.log('Errors: ', results.errors.length);
          console.log('Results: ', results);
          console.log('---------------------------');
        },
      });
    } else if (index === 1) {
      const results = this.state.csvData;
      if (results) {
        console.log('---------------------------');
        console.log('Parse complete!');
        console.log('Row count: ', results.length);
        console.log('Results: ', results);
        console.log('---------------------------');
      } else {
        // eslint-disable-next-line no-undef
        alert('Please choose at least one file to parse.');
      }
    } else if (index === 2) {
      if (this.state.url === '') {
        // eslint-disable-next-line no-undef
        alert('Please enter the URL of a file to download and parse.');
        return;
      }
      console.log('Running!');
      readRemoteFile(this.state.url, {
        complete: (results) => {
          console.log('---------------------------');
          console.log('Parse complete!');
          console.log('Row count: ', results.data.length);
          console.log('Errors: ', results.errors.length);
          console.log('Results: ', results);
          console.log('---------------------------');
        },
      });
    } else {
      try {
        const results = jsonToCSV(this.state.jsonData);
        console.log('---------------------------');
        console.log(results);
        console.log('---------------------------');
      } catch (e) {
        // eslint-disable-next-line no-undef
        alert('Please enter valid JSON.');
      }
    }
  };

  setTabIndex = (index) => {
    this.setState({ tabIndex: index });
  };

  handleStrChange = (e) => {
    this.setState({ str: e.target.value });
  };

  handleJsonDataChange = (e) => {
    this.setState({ jsonData: e.target.value });
  };

  handleURLChange = (e) => {
    this.setState({ url: e.target.value });
  };

  setURL = (url) => {
    this.setState({ url });
  };

  handleOnDrop = (data) => {
    this.setState({ csvData: data });
  };

  handleOnError = (error, file, inputElem, reason) => {
    console.log(error);
  };

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  handleOnRemoveFile = (data) => {
    this.setState({ csvData: data });
  };

  render() {
    return (
      <>
        <main>
          <header>
            <div className="grid-container">
              <div className="grid-40 mobile-grid-50">
                <div className="links">
                  <a href="/">
                    <i className="fa fa-home fa-lg" /> Home
                  </a>
                  <a href="/demo">
                    <i className="fa fa-magic fa-lg" /> Demo
                  </a>
                  <a href="/docs">
                    <i className="fa fa-book fa-lg" /> Docs
                  </a>
                </div>
              </div>
              <div className="grid-20 hide-on-mobile text-center">
                <a href="/" className="text-logo">
                  react-papaparse 3
                </a>
              </div>
              <div className="grid-40 mobile-grid-50 text-right">
                <div className="links">
                  <a href="https://github.com/Bunlong/react-papaparse">
                    <i className="fa fa-github fa-lg" /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </header>

          <h1>Choose a Demo</h1>

          <div className="grid-container">
            <div className="grid-66">
              <Tabs onSelect={(index) => this.setTabIndex(index)}>
                <TabList>
                  <Tab>String</Tab>
                  <Tab>Local File(s)</Tab>
                  <Tab>Remote File</Tab>
                  <Tab>JSON to CSV</Tab>
                </TabList>
                <TabPanel>
                  <div className="input-area" id="input-string">
                    <div style={{ float: 'right', marginBottom: 14 }}>
                      <a href="https://github.com/Bunlong/react-papaparse/blob/master/demo/ReadString.js">
                        Source code
                      </a>
                    </div>
                    <textarea
                      id="input"
                      placeholder="String input"
                      onChange={this.handleStrChange}
                      value={this.state.str}
                    />
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="input-area" id="input-string">
                    <div>
                      <div className="text-center">
                        Choose one or more delimited text files for
                        react-papaparse to parse.
                      </div>
                      <div style={{ marginTop: 60, marginBottom: 46 }}>
                        <h5>Basic Upload</h5>
                        <div style={{ marginBottom: 14, textAlignLast: 'end' }}>
                          <a href="https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader1.js">
                            Source code
                          </a>
                        </div>
                        <CSVReader
                          ref={buttonRef}
                          onFileLoad={this.handleOnDrop}
                          onError={this.handleOnError}
                          noClick
                          noDrag
                          onRemoveFile={this.handleOnRemoveFile}
                        >
                          {({ file }) => (
                            <aside
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: 10,
                              }}
                            >
                              <button
                                type="button"
                                onClick={this.handleOpenDialog}
                                style={{
                                  borderRadius: 0,
                                  marginLeft: 0,
                                  marginRight: 0,
                                  width: '40%',
                                  paddingLeft: 0,
                                  paddingRight: 0,
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
                                  width: '60%',
                                }}
                              >
                                {file && file.name}
                              </div>
                              <button
                                className="button red"
                                style={{
                                  borderRadius: 0,
                                  marginLeft: 0,
                                  marginRight: 0,
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                }}
                                onClick={this.handleRemoveFile}
                              >
                                Remove
                              </button>
                            </aside>
                          )}
                        </CSVReader>
                      </div>
                      <div style={{ marginTop: 50, marginBottom: 46 }}>
                        <h5>Click and Drag Upload</h5>
                        <div style={{ marginBottom: 14, textAlignLast: 'end' }}>
                          <a href="https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader2.js">
                            Source code
                          </a>
                        </div>
                        <CSVReader
                          onDrop={this.handleOnDrop}
                          onError={this.handleOnError}
                          addRemoveButton
                          onRemoveFile={this.handleOnRemoveFile}
                        >
                          <span>Drop CSV file here or click to upload.</span>
                        </CSVReader>
                      </div>
                      <div style={{ marginTop: 50, marginBottom: 46 }}>
                        <h5>Drag ( No Click ) Upload</h5>
                        <div style={{ marginBottom: 14, textAlignLast: 'end' }}>
                          <a href="https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader3.js">
                            Source code
                          </a>
                        </div>
                        <CSVReader
                          onDrop={this.handleOnDrop}
                          onError={this.handleOnError}
                          noClick
                          addRemoveButton
                          onRemoveFile={this.handleOnRemoveFile}
                        >
                          <span>Drop CSV file here to upload.</span>
                        </CSVReader>
                      </div>
                      <div style={{ marginTop: 50, marginBottom: 46 }}>
                        <h5>Click ( No Drag ) Upload</h5>
                        <div style={{ marginBottom: 14, textAlignLast: 'end' }}>
                          <a href="https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader4.js">
                            Source code
                          </a>
                        </div>
                        <CSVReader
                          onDrop={this.handleOnDrop}
                          onError={this.handleOnError}
                          noDrag
                          addRemoveButton
                          onRemoveFile={this.handleOnRemoveFile}
                        >
                          <span>Click to upload.</span>
                        </CSVReader>
                      </div>
                      Sample files:
                      <ul>
                        <li>
                          <a
                            href="/static/csv/normal.csv"
                            id="local-normal-file"
                          >
                            Normal file
                          </a>
                        </li>
                        <li>
                          <a href="/static/csv/big.csv" id="local-large-file">
                            Large file
                          </a>
                        </li>
                        <li>
                          <a
                            href="/static/csv/malformed.csv"
                            id="local-malformed-file"
                          >
                            Malformed file
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="input-area" id="input-string">
                    <div style={{ marginBottom: 14, textAlignLast: 'end' }}>
                      <a href="https://github.com/Bunlong/react-papaparse/blob/master/demo/ReadRemoteFile.js">
                        Source code
                      </a>
                    </div>
                    <div>
                      <div className="text-center">
                        Type the URL of the file to be downloaded and parsed.
                        <br />
                        <small>
                          (cross-origin requests require
                          Access-Control-Allow-Origin header)
                        </small>
                      </div>
                      <input
                        type="text"
                        id="url"
                        placeholder="URL"
                        value={this.state.url}
                        onChange={this.handleURLChange}
                      />
                      Sample remote files:
                      <ul>
                        <li>
                          <a
                            id="local-normal-file"
                            onClick={() =>
                              this.setURL('/static/csv/normal.csv')
                            }
                            style={{ cursor: 'pointer' }}
                          >
                            Normal file
                          </a>
                        </li>
                        <li>
                          <a
                            id="local-large-file"
                            onClick={() => this.setURL('/static/csv/big.csv')}
                            style={{ cursor: 'pointer' }}
                          >
                            Large file
                          </a>
                        </li>
                        <li>
                          <a
                            id="local-malformed-file"
                            onClick={() =>
                              this.setURL('/static/csv/malformed.csv')
                            }
                            style={{ cursor: 'pointer' }}
                          >
                            Malformed file
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="input-area" id="input-string">
                    <div style={{ float: 'right', marginBottom: 14 }}>
                      <a href="https://github.com/Bunlong/react-papaparse/blob/master/demo/JsonToCSV.js">
                        Source code
                      </a>
                    </div>
                    <div>
                      <textarea
                        id="json"
                        placeholder="JSON string"
                        value={this.state.jsonData}
                        onChange={this.handleJsonDataChange}
                      />
                    </div>
                  </div>
                </TabPanel>
              </Tabs>

              <div className="text-center">
                <div className="see-results">
                  Results will appear in the console of your browser's inspector
                  tools
                </div>
                <button
                  id="submit"
                  className="green"
                  onClick={this.handleImportOffer}
                >
                  Parse
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

*/
