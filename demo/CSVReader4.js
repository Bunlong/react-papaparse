import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'

export default class CSVReader4 extends Component {
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
        <h5>Click ( No Drag ) Upload</h5>
        <CSVReader
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          noDrag
        >
          <span>Click to upload.</span>
        </CSVReader>
      </>
    )
  }
}
