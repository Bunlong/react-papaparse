import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef()

export default class CSVReader1 extends Component {

  onDrop = (data) => {
    console.log('--------------------------------------------------')
    console.log(data)
    console.log('--------------------------------------------------')
  }

  onError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  openDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point 
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  render() {
    return (
      <div style={{marginTop: 60, marginBottom: 60}}>
        <h5>Basic Upload</h5>
        <div style={{marginBottom: 14, textAlignLast: 'end'}}>
          <a href='https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader1.js'>Source code</a>
        </div>
        <CSVReader
          ref={buttonRef}
          onDrop={this.onDrop}
          onError={this.onError}
          noClick
          noDrag
          config={{}}
        >
          {({file}) => (
            <>
              <aside style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
                <button
                  type="button"
                  onClick={this.openDialog}
                  style={{
                    width: '40%',
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
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
                    lineHeight: 2.2,
                  }}
                >
                  {file.name}
                </div>
              </aside>
            </>
          )}
        </CSVReader>
      </div>
    )
  }
}
