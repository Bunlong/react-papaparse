import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

export default class CSVReader4 extends Component {

  onDrop = (data) => {
    console.log('--------------------------------------------------')
    console.log(data)
    console.log('--------------------------------------------------')
  }

  onError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  render() {
    return (
      <>
        <h5>Click ( No Drag ) Upload</h5>
        <CSVReader
          onDrop={this.onDrop}
          onError={this.onError}
          noDrag
          style={{}}
          config={{}}
        >
          <span>Click to upload.</span>
        </CSVReader>
      </>
    )
  }
}
