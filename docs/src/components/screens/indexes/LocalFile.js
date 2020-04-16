import React from 'react'

const LocalFile = () => {
  return (
    <section id='local-files'>
      <div className='grid-container narrow-grid'>
        <div className='grid-100'>
          <h4>Local Files</h4>
          <h5>"Great, but I have a <i>file</i> to parse."</h5>
          <p>Then use CSVReader component instead of readString method. Since file parsing is asynchronous, don't forget callback methods.</p>

          <div
            id='drag-no-click-upload'
            style={{ fontSize: 20, marginTop: 10 }}
          >
            Basic Upload
          </div>
          <div style={{ textAlign: 'center', paddingTop: 50, paddingBottom: 50 }}>
            <img
              src='/static/images/csvreader1.png'
              alt='Basic Upload'
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
            <a href='/docs#basic-upload'>Properties</a>&nbsp; | &nbsp;<a href='/demo'>Demo</a>
          </div>
          <pre>
            <code className='language-javascript'>
              {`import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef()

export default class CSVReader extends Component {
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point 
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }
  
  handleOnFileLoad = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  render() {
    return (
      <CSVReader
        ref={buttonRef}
        onFileLoad={this.handleOnFileLoad}
        onError={this.handleOnError}
        noClick
        noDrag
        onRemoveFile={this.handleOnRemoveFile}
      >
        {({ file }) => (
          <aside
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10
            }}
          >
            <button
              type='button'
              onClick={this.handleOpenDialog}
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                width: '40%',
                paddingLeft: 0,
                paddingRight: 0
              }}
            >
              Browe file
            </button>
            <div
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ccc',
                height: 45,
                lineHeight: 2.5,
                marginTop: 5,
                marginBottom: 5,
                paddingLeft: 13,
                paddingTop: 3,
                width: '60%'
              }}
            >
              {file && file.name}
            </div>
            <button
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 20,
                paddingRight: 20
              }}
              onClick={this.handleRemoveFile}
            >
              Remove
            </button>
          </aside>
        )}
      </CSVReader>
    )
  }
}`}
            </code>
          </pre>

          <div
            id='drag-no-click-upload'
            style={{ fontSize: 20, marginTop: 35 }}
          >
            Click and Drag Upload
          </div>
          <div style={{ textAlign: 'center', paddingTop: 50, paddingBottom: 50 }}>
            <img
              src='/static/images/csvreader2.png'
              alt='Click and Drag Upload'
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
            <a href='/docs#click-and-drag-upload'>Properties</a>&nbsp; | &nbsp;<a href='/demo'>Demo</a>
          </div>
          <pre>
            <code className='language-javascript'>
              {`import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

export default class CSVReader extends Component {
  handleOnDrop = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  render() {
    return (
      <CSVReader
        onDrop={this.handleOnDrop}
        onError={this.handleOnError}
        addRemoveButton
        onRemoveFile={this.handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
    )
  }
}
`}
            </code>
          </pre>

          <div
            id='drag-no-click-upload'
            style={{ fontSize: 20, marginTop: 35 }}
          >
            Drag ( No Click ) Upload
          </div>
          <div style={{ textAlign: 'center', paddingTop: 50, paddingBottom: 50 }}>
            <img
              src='/static/images/csvreader3.png'
              alt='Drag ( No Click ) Upload'
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
            <a href='/docs#drag-no-click-upload'>Properties</a>&nbsp; | &nbsp;<a href='/demo'>Demo</a>
          </div>
          <pre>
            <code className='language-javascript'>
              {`import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

export default class CSVReader extends Component {
  handleOnDrop = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  render() {
    return (
      <CSVReader
        onDrop={this.handleOnDrop}
        onError={this.handleOnError}
        noClick
        addRemoveButton
        onRemoveFile={this.handleOnRemoveFile}
      >
        <span>Drop CSV file here to upload.</span>
      </CSVReader>
    )
  }
}`}
            </code>
          </pre>

          <div
            id='drag-no-click-upload'
            style={{ fontSize: 20, marginTop: 35 }}
          >
            Click ( No Drag ) Upload
          </div>
          <div style={{ textAlign: 'center', paddingTop: 50, paddingBottom: 50 }}>
            <img
              src='/static/images/csvreader4.png'
              alt='Click ( No Drag ) Upload'
              style={{ maxWidth: '100%', height: 'auto ' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
            <a href='/docs#click-no-drag-upload'>Properties</a>&nbsp; | &nbsp;<a href='/demo'>Demo</a>
          </div>
          <pre>
            <code className='language-javascript'>
              {`import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

export default class CSVReader extends Component {
  handleOnDrop = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  render() {
    return (
      <CSVReader
        onDrop={this.handleOnDrop}
        onError={this.handleOnError}
        noDrag
        addRemoveButton
        onRemoveFile={this.handleOnRemoveFile}
      >
        <span>Click to upload.</span>
      </CSVReader>
    )
  }
}`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}

export default LocalFile
