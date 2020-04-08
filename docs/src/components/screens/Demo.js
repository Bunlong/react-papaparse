import React, { Component } from 'react'
import {
  Tab,
  Tabs,
  TabList,
  TabPanel
} from 'react-tabs'
import {
  CSVReader,
  readString,
  jsonToCSV,
  readRemoteFile
} from 'react-papaparse'

const buttonRef = React.createRef()

export default class Demo extends Component {
  constructor(props) {
    super(props)
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
]`
    }
  }

  handleImportOffer = () => {
    const index = this.state.tabIndex

    if (index === 0) {
      const results = readString(this.state.str)
      console.log('---------------------------')
      console.log('Parse complete!')
      console.log('Row count: ', results.data.length)
      console.log('Errors: ', results.errors.length)
      console.log('Results: ', results)
      console.log('---------------------------')
    } else if (index === 1) {
      const results = this.state.csvData
      if (results) {
        console.log('---------------------------')
        console.log('Parse complete!')
        console.log('Row count: ', results.length)
        console.log('Results: ', results)
        console.log('---------------------------')
      } else {
        // eslint-disable-next-line no-undef
        alert('Please choose at least one file to parse.')
      }
    } else if (index === 2) {
      if (this.state.url === '') {
        // eslint-disable-next-line no-undef
        alert('Please enter the URL of a file to download and parse.')
        return
      }
      console.log('Running!')
      readRemoteFile(
        this.state.url,
        {
          complete: (results) => {
            console.log('---------------------------')
            console.log('Parse complete!')
            console.log('Row count: ', results.data.length)
            console.log('Errors: ', results.errors.length)
            console.log('Results: ', results)
            console.log('---------------------------')
          }
        }
      )
    } else {
      try {
        const results = jsonToCSV(this.state.jsonData)
        console.log('---------------------------')
        console.log(results)
        console.log('---------------------------')
      } catch (e) {
        // eslint-disable-next-line no-undef
        alert('Please enter valid JSON.')
      }
    }
  }

  setTabIndex = (index) => {
    this.setState({ tabIndex: index })
  }

  handleStrChange = (event) => {
    this.setState({ str: event.target.value })
  }

  handleJsonDataChange = (event) => {
    this.setState({ jsonData: event.target.value })
  }

  handleURLChange = (event) => {
    this.setState({ url: event.target.value })
  }

  setURL = (url) => {
    this.setState({ url })
  }

  handleOnDrop = (data) => {
    this.setState({ csvData: data })
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  removeFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  handleOnRemoveFile = (data) => {
    this.setState({ csvData: data })
  }

  render() {
    return (
      <>
        <main>
          <header>
            <div className='grid-container'>
              <div className='grid-40 mobile-grid-50'>
                <div className='links'>
                  <a href='/'>
                    <i className='fa fa-home fa-lg' /> Home
                  </a>
                  <a href='/demo'>
                    <i className='fa fa-magic fa-lg' /> Demo
                  </a>
                  <a href='/docs'>
                    <i className='fa fa-book fa-lg' /> Docs
                  </a>
                </div>
              </div>
              <div className='grid-20 hide-on-mobile text-center'>
                <a href='/' className='text-logo'>react-papaparse 3</a>
              </div>
              <div className='grid-40 mobile-grid-50 text-right'>
                <div className='links'>
                  <a href='https://github.com/Bunlong/react-papaparse'>
                    <i className='fa fa-github fa-lg' /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </header>

          <h1>Choose a Demo</h1>

          <div className='grid-container'>
            <div className='grid-66'>
              <Tabs onSelect={index => this.setTabIndex(index)}>
                <TabList>
                  <Tab>String</Tab>
                  <Tab>Local File(s)</Tab>
                  <Tab>Remote File</Tab>
                  <Tab>JSON to CSV</Tab>
                </TabList>
                <TabPanel>
                  <div className='input-area' id='input-string'>
                    <div style={{ float: 'right', marginBottom: 14 }}>
                      <a href='https://github.com/Bunlong/react-papaparse/blob/master/demo/ReadString.js'>Source code</a>
                    </div>
                    <textarea id='input' placeholder='String input' onChange={this.handleStrChange} value={this.state.str} />
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className='input-area' id='input-string'>
                    <div>
                      <div className='text-center'>
                        Choose one or more delimited text files for react-papaparse to parse.
                      </div>

                      <div style={{ marginTop: 60, marginBottom: 46 }}>
                        <h5>Basic Upload</h5>
                        <div style={{ marginBottom: 14, textAlignLast: 'end' }}>
                          <a href='https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader1.js'>Source code</a>
                        </div>
                        <CSVReader
                          ref={buttonRef}
                          onFileLoad={this.handleOnDrop}
                          onError={this.handleOnError}
                          noClick
                          noDrag
                          addRemoveButton
                          onRemoveFile={this.handleOnRemoveFile}
                        >
                          {({ file }) => (
                            <aside style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                              <button
                                type='button'
                                onClick={this.handleOpenDialog}
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
                                className='button red'
                                style={{
                                  borderRadius: 0,
                                  marginLeft: 0,
                                  marginRight: 0,
                                  paddingLeft: 20,
                                  paddingRight: 20
                                }}
                                onClick={(e) => this.removeFile(e)}
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
                          <a href='https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader2.js'>Source code</a>
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
                          <a href='https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader3.js'>Source code</a>
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
                          <a href='https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader4.js'>Source code</a>
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
                          <a href='/static/csv/normal.csv' id='local-normal-file'>Normal file</a>
                        </li>
                        <li>
                          <a href='/static/csv/big.csv' id='local-large-file'>Large file</a>
                        </li>
                        <li>
                          <a href='/static/csv/malformed.csv' id='local-malformed-file'>Malformed file</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className='input-area' id='input-string'>
                    <div style={{ marginBottom: 14, textAlignLast: 'end' }}>
                      <a href='https://github.com/Bunlong/react-papaparse/blob/master/demo/ReadRemoteFile.js'>Source code</a>
                    </div>
                    <div>
                      <div className='text-center'>
                        Type the URL of the file to be downloaded and parsed.
                        <br />
                        <small>(cross-origin requests require Access-Control-Allow-Origin header)</small>
                      </div>
                      <input type='text' id='url' placeholder='URL' value={this.state.url} onChange={this.handleURLChange} />
                      Sample remote files:
                      <ul>
                        <li>
                          <a id='local-normal-file' onClick={() => this.setURL('/static/csv/normal.csv')} style={{ cursor: 'pointer' }}>Normal file</a>
                        </li>
                        <li>
                          <a id='local-large-file' onClick={() => this.setURL('/static/csv/big.csv')} style={{ cursor: 'pointer' }}>Large file</a>
                        </li>
                        <li>
                          <a id='local-malformed-file' onClick={() => this.setURL('/static/csv/malformed.csv')} style={{ cursor: 'pointer' }}>Malformed file</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className='input-area' id='input-string'>
                    <div style={{ float: 'right', marginBottom: 14 }}>
                      <a href='https://github.com/Bunlong/react-papaparse/blob/master/demo/JsonToCSV.js'>Source code</a>
                    </div>
                    <div>
                      <textarea id='json' placeholder='JSON string' value={this.state.jsonData} onChange={this.handleJsonDataChange} />
                    </div>
                  </div>
                </TabPanel>
              </Tabs>

              <div className='text-center'>
                <div className='see-results'>
                  Results will appear in the console of your browser's inspector tools
                </div>
                <button id='submit' className='green' onClick={this.handleImportOffer}>Parse</button>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }
}
