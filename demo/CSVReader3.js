import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'

export default class CSVReader3 extends Component {
  handleOnDrop = (data) => {
    console.log('--------------------------------------------------')
    console.log(data)
    console.log('--------------------------------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  render() {
    return (
      <>
        <h5>Drag ( No Click ) Upload</h5>
        <CSVReader
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          noClick
        >
          <span>Drop CSV file here to upload.</span>
        </CSVReader>
      </>
    )
  }
}
