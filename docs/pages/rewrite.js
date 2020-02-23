import React, { Component } from 'react'

import { CSVReaderRewrite } from 'react-papaparse'

const buttonRef = React.createRef()

export default class Rewrite extends Component {

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
              <CSVReaderRewrite 
                onDrop={this.onDrop}
                noClick={false}
                noDrag={true}
                ref={buttonRef}
                style={{}}
                configOptions={{}}
              >
                <button type="button" onClick={this.openDialog}>Open File Dialog</button>
              </CSVReaderRewrite>
            </div>
          </div>
        </main>
      </>
    )
  }
}

/*

<>
  <main>
    <div className="grid-container">
      <div className="grid-66">
        <CSVReaderRewrite 
          onDrop={this.onDrop}
          onError={this.onError}
          noClick={false}
          noDrag={true}
          style={{}}
          configOptions={{}}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReaderRewrite>
      </div>
    </div>
  </main>
</>

*/

/*

<>
  <main>
    <div className="grid-container">
      <div className="grid-66">
        <CSVReaderRewrite 
          onDrop={this.onDrop}
          noClick={false}
          noDrag={true}
          ref={buttonRef}
          style={{}}
          configOptions={{}}
        >
          <button type="button" onClick={this.openDialog}>Open File Dialog</button>
        </CSVReaderRewrite>
      </div>
    </div>
  </main>
</>

*/

// ================== Draft ==================

/*

<>
  <main>
    <div className="grid-container">
      <div className="grid-66">
        <CSVReaderRewrite 
          onDrop={this.onDrop}
          noClick={true}
          noDrag={true}
          ref={buttonRef}
          style={{}}
          configOptions={{}}
        >
          {({file}) => (
            <>
              <p>Drop CSV file here or click to upload.</p>
              <button type="button" onClick={this.openDialog}>Open File Dialog</button>
              <aside>
                <h4>File</h4>
                <ul>{file}</ul>
              </aside>
            </>
          )}
        </CSVReaderRewrite>
      </div>
    </div>
  </main>
</>

*/
