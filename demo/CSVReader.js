import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

export default class CSVReader extends Component {
  constructor(props) {
    super(props)
    this.fileInput = React.createRef()
  }

  handleReadCSV = (data) => {
    console.log('--------------------------------------------------')
    console.log(data)
    console.log('--------------------------------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleImportOffer = () => {
    this.fileInput.current.click()
  }

  render() {
    return (
      <>
        <CSVReader
          onFileLoaded={this.handleReadCSV}
          inputRef={this.fileInput}
          style={{display: 'none'}}
          onError={this.handleOnError}
        />
        <button onClick={this.handleImportOffer}>Import</button>
      </>
    )
  }
}
