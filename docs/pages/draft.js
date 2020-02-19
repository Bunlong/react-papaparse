import React, { Component } from 'react'

import { CSVReaderDraft } from 'react-papaparse'

export default class Draft extends Component {

  constructor(props) {
    super(props)
    this.fileInput = React.createRef()
  }

  handleReadCSV = (data) => {
    console.log('======================')
    console.log(data)
    console.log('======================')
  }
  
  render() {
    return (
      <>
        <main>
          <div className="grid-container">
            <div className="grid-66">
              <CSVReaderDraft 
                label='Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region'
                inputRef={this.fileInput}
                onFileLoaded={this.handleReadCSV}
              />
            </div>
          </div>
        </main>
      </>
    )
  }
}
