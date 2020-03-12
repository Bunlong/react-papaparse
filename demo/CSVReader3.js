import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

export default class CSVReader3 extends Component {

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
        <h5>Drag ( No Click ) Upload</h5>
        <CSVReader
          onDrop={this.onDrop}
          onError={this.onError}
          noClick
        >
          <span>Drop CSV file here to upload.</span>
        </CSVReader>
      </>
    )
  }
}
