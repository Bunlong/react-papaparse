import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef()

export default class CSVReader1 extends Component {
  handleOnFileLoad = (data) => {
    console.log('--------------------------------------------------')
    console.log(data)
    console.log('--------------------------------------------------')
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

  render() {
    return (
      <>
        <h5>Basic Upload</h5>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
        >
          {({ file }) => (
            <aside style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
              <button
                type='button'
                onClick={this.handleOpenDialog}
                style={{
                  width: '40%',
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 0,
                  paddingRight: 0
                }}
              >
                Browe file
              </button>
              <div
                style={{
                  width: '60%',
                  height: 45,
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ccc',
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  lineHeight: 2.5
                }}
              >
                {file.name}
              </div>
            </aside>
          )}
        </CSVReader>
      </>
    )
  }
}
