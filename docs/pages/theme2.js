import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef()

export default class Theme2 extends Component {

  constructor(props) {
    super(props)
  }

  onDrop = (data) => {
    console.log('======================')
    console.log(data)
    console.log('======================')
  }

  onError = (error) => {

  }

  openDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point 
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }
  
  render() {
    return (
      <>
        <main>
          <div className="grid-container">
            <div className="grid-66">
              <CSVReader 
                onDrop={this.onDrop}
                onError={this.onError}
                noClick={false}
                noDrag={true}
                style={{}}
                config={{}}
              >
                <span>Drop CSV file here or click to upload.</span>
              </CSVReader>
            </div>
          </div>
        </main>
      </>
    )
  }
}
