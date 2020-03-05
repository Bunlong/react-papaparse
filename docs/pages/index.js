import React, { Component } from 'react'

export default class Index extends Component {
  
  render() {
    return (
      <>
        <div id="skrollr-body">
          <div id="top" data-top="bottom: 0px; opacity: 1;" data-top-bottom="bottom: -350px; opacity: .3;">
            <div className="grid-container">
              <div className="grid-100">
                <div id="title-main">
                  <h1>react-papaparse</h1>
                  <h2>The powerful, in-browser React CSV parser for big boys and girls</h2>

                  <a href="#download" className="button">
                    <i className="fa fa-download"></i>&nbsp; Install
                  </a>
                  <a href="/demo" className="button red">
                    <i className="fa fa-magic"></i>&nbsp; Demo
                  </a>
                  <a href="/docs" className="button gray">
                    <i className="fa fa-book"></i>&nbsp; Documentation
                  </a>
                </div>
                <div id="title-code">
                  <pre><code className="language-javascript">{`// Parse CSV string
var data = readString(csvString)

// Convert back to CSV
var csv = jsonToCSV(jsonData)

// Parse local CSV file
<CSVReader 
  onDrop={this.onDrop}
  onError={this.onError}
  noDrag
>
  <span>Click to upload.</span>
</CSVReader>

// Stream big file in worker thread
readRemoteFile(bigFileURL, {
  worker: true,
  step: function(results) {
    console.log('Row:', results.data)
  }
})`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main>
          <header>
            <div className="grid-container">
              <div className="grid-40 mobile-grid-50">
                <div className="links">
                  <a href="/demo">
                    <i className="fa fa-magic fa-lg"></i> Demo
                  </a>
                  <a href="/docs">
                    <i className="fa fa-book fa-lg"></i> Docs
                  </a>
                </div>
              </div>
              <div className="grid-20 hide-on-mobile text-center">
                <a href="/" className="text-logo">react-papaparse 2</a>
              </div>
              <div className="grid-40 mobile-grid-50 text-right">
                <div className="links">
                  <a href="https://github.com/Bunlong/react-papaparse">
                    <i className="fa fa-github fa-lg"></i> GitHub
                  </a>
                </div>
              </div>
            </div>
          </header>

          <div className="insignia">
            <div className="firefox-hack"><div id="version-intro">Version</div><div id="version">2.0</div></div>
          </div>

          <section style={{paddingTop: 0}}>
            <div className="grid-container">
              <div className="grid-100">
                <h3>Features</h3>
              </div>
            </div>

            <div id="ticker">
              <div className="ticker-item current">
                <p>Now the fastest React CSV parser for the browser</p>
              </div>
              <div className="ticker-item">
                <p>The world's first multi-threaded CSV parser for the browser</p>
              </div>
              <div className="ticker-item">
                <p>react-papaparse can handle files gigabytes in size without crashing</p>
              </div>
              <div className="ticker-item">
                <p>Use react-papaparse when performance, privacy, and correctness matter to you</p>
              </div>
              <div className="ticker-item">
                <p>react-papaparse alleviates privacy concerns related to uploading files</p>
              </div>
              <div className="ticker-item">
                <p>Malformed CSV is handled gracefully with a detailed error report</p>
              </div>
            </div>

            <div className="grid-container">
              <div className="grid-33">
                <li>CSV&#8594;JSON and <a href="#unparse">JSON&#8594;CSV</a></li>
                <li>Auto-detect <a href="#delimiter">delimiter</a></li>
                <li><a href="#local-files">Open local files</a></li>
                <li><a href="#remote-files">Download remote files</a></li>
              </div>

              <div className="grid-33">
                <li><a href="#stream">Stream</a> local and remote files</li>
                <li><a href="#worker">Multi-threaded</a></li>
                <li><a href="#header">Header row</a> support</li>
                <li><a href="#type-conversion">Type conversion</a></li>
              </div>

              <div className="grid-33">
                <li>Skip <a href="#comments">commented lines</a></li>
                <li>Fast mode</li>
                <li>Graceful <a href="#errors">error</a> handling</li>
                <li>Easy to use</li>
              </div>

              <div className="clear" /><br/><br/>
              <div className="grid-100 text-center">
                <a href="https://github.com/Bunlong/react-papaparse" className="button">
                  <i className="fa fa-github"></i>&nbsp; GitHub
                </a>
                <a href="/docs" className="button gray">
                  <i className="fa fa-book"></i>&nbsp; Documentation
                </a>
              </div>
            </div>
          </section>

          <section>
            <div className="grid-container narrow-grid">
              <div className="grid-100">
                <h3>Frameworks</h3>
                <p>
                  react-papaparse strongly support <a href="https://nextjs.org" target="blank">Next</a>, <a href="https://create-react-app.dev" target="blank">Create React App</a> and other React frameworks. react-papaparse is the fastest React CSV parser for the browser (only works in the browser), so you need to set the component with no SSR (server-side render) <b>in case you use <code>readRemoteFile</code> function</b>.
                </p>
                <p>
                  <ul>
                    <li><a href="https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr" target="blank">Next — component with no SSR</a></li>
                  </ul>
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="grid-container">
              <div className="grid-100 text-center">
                <h3>People <i className="fa fa-heart"></i> react-papaparse</h3>
                <p>
                  <a href='https://www.npmjs.com/package/react-papaparse'>
                    <img src="https://img.shields.io/npm/dm/react-papaparse.svg" alt='react-papaparse' />
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section id="parse">
            <div className="grid-container narrow-grid">
              <div className="grid-100">
                <h4>CSV Parsing</h4>
                <h5>"Isn't parsing CSV just <code>String.split(',')</code>?"</h5>

                <p>react-papaparse does it right. Just pass in the CSV string with an optional <a href="/docs#config">configuration</a>.</p>

                <pre><code className="language-javascript">{`
import { readString } from 'react-papaparse'

var results = readString(csvString, config)

/*
  results = {
    data: [ ... ],    // parsed data
    errors: [ ... ],  // errors encountered
    meta: { ... }     // extra parse info
  }
*/`}
</code></pre>
              </div>
            </div>
          </section>

          <section id="delimiter">
            <div className="grid-container narrow-grid">
              <div className="grid-100">
                <h4>Delimiter Detection</h4>
                <h5>"But I don't know the delimiter..."</h5>

                <p>That's okay. react-papaparse will scan the first few rows to find the right delimiter.</p>

                <pre><code className="language-javascript">{`
import { readString } from 'react-papaparse'

var results = readString(csvString)

console.log(results.meta.delimiter)

`}

// <span dangerouslySetInnerHTML={{__html: '&bsol;t'}} />
</code></pre>
              </div>
            </div>
          </section>

          <section id="local-files">
            <div className="grid-container narrow-grid">
              <div className="grid-100">
                <h4>Local Files</h4>
                <h5>"Great, but I have a <i>file</i> to parse."</h5>

                <p>Then use CSVReader component instead of readString method. Since file parsing is asynchronous, don't forget callback methods.</p>

                <div id="drag-no-click-upload" style={{fontSize: 20, marginTop: 10,}}>
                  Basic Upload
                </div>

                <div style={{textAlign: 'center', paddingTop: 50, paddingBottom: 50, }}>
                  <img src='/static/images/csvreader1.png' alt='Basic Upload' style={{maxWidth: '100%', height: 
                'auto'}} />
                </div>

                <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 14}}>
                  <a href='/docs#basic-upload'>Document</a>&nbsp; | &nbsp;<a href='/demo'>Demo</a>
                </div>

                <pre><code className="language-javascript">{`import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef()

export default class CSVReader extends Component {

  onFileLoad = (data) => {
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
      <>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.onFileLoad}
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
      </>
    )
  }
}
`}</code></pre>

              <div id="drag-no-click-upload" style={{fontSize: 20, marginTop: 35,}}>
                Click and Drag Upload
              </div>

              <div style={{textAlign: 'center', paddingTop: 50, paddingBottom: 50, }}>
                <img src='/static/images/csvreader2.png' alt='Click and Drag Upload' style={{maxWidth: '100%', height: 
              'auto'}} />
              </div>

              <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 14}}>
                <a href='/docs#click-and-drag-upload'>Properties</a>&nbsp; | &nbsp;<a href='/demo'>Demo</a>
              </div>

              <pre><code className="language-javascript">{`import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

export default class CSVReader extends Component {

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
        <CSVReader 
          onDrop={this.onDrop}
          onError={this.onError}
          style={{}}
          config={{}}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
      </>
    )
  }
}
`}</code></pre>

                <div id="drag-no-click-upload" style={{fontSize: 20, marginTop: 35,}}>
                  Drag ( No Click ) Upload
                </div>

                <div style={{textAlign: 'center', paddingTop: 50, paddingBottom: 50, }}>
                  <img src='/static/images/csvreader3.png' alt='Drag ( No Click ) Upload' style={{maxWidth: '100%', height: 
                'auto'}} />
                </div>

                <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 14}}>
                  <a href='/docs#drag-no-click-upload'>Properties</a>&nbsp; | &nbsp;<a href='/demo'>Demo</a>
                </div>

                <pre><code className="language-javascript">{`import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

export default class CSVReader extends Component {

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
        <CSVReader
          onDrop={this.onDrop}
          onError={this.onError}
          noClick
          style={{}}
          config={{}}
        >
          <span>Drop CSV file here to upload.</span>
        </CSVReader>
      </>
    )
  }
}
`}</code></pre>
              
                <div id="drag-no-click-upload" style={{fontSize: 20, marginTop: 35,}}>
                  Click ( No Drag ) Upload
                </div>

                <div style={{textAlign: 'center', paddingTop: 50, paddingBottom: 50, }}>
                  <img src='/static/images/csvreader4.png' alt='Click ( No Drag ) Upload' style={{maxWidth: '100%', height: 
                'auto'}} />
                </div>

                <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 14}}>
                  <a href='/docs#click-no-drag-upload'>Properties</a>&nbsp; | &nbsp;<a href='/demo'>Demo</a>
                </div>

                <pre><code className="language-javascript">{`import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

export default class CSVReader extends Component {

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
`}</code></pre>

              </div>
            </div>
          </section>

          <section id="remote-files">
            <div className="grid-container narrow-grid">
              <div className="grid-100">
                <h4>Remote Files</h4>
                <h5>"No &mdash; I mean, the file isn't on my computer."</h5>
                <p>Oh, well then just pass in the URL and &mdash; of course &mdash; a callback.</p>

                <pre><code className="language-javascript">{`readRemoteFile('http://example.com/file.csv', {
  download: true,
  complete: function(results) {
    console.log(results)
  }
})`}</code></pre>
              </div>
            </div>
          </section>

          <section id="stream">
            <div className="grid-container narrow-grid">
              <div className="grid-100">
                <h4>Streaming</h4>
                <h5>"Did I mention the file is huge?"</h5>

                <p>That's what streaming is for. Specify a step callback to receive the results row-by-row. This way, you won't load the whole file into memory and crash the browser.</p>

                <pre><code className="language-javascript">{`readRemoteFile('http://example.com/big.csv', {
  step: function(row) {
    console.log('Row:', row.data)
  },
  complete: function() {
    console.log('All done!')
  }
})`}</code></pre>
              </div>
            </div>
          </section>

          <section id="worker">
            <div className="grid-container narrow-grid">
              <div className="grid-100">
                <h4>Multi-Threading</h4>
                <h5>"Lovely. Now my web page locked up."</h5>

                <p>That happens when a long-running script is executing in the same thread as the page. Use a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Worker">Worker</a> thread by specifying <code>worker: true</code>. It may take slightly longer, but your page will stay reactive.</p>

                <pre><code className="language-javascript">{`readRemoteFile(bigFileURL, {
  worker: true,
  step: function(row) {
    console.log('Row:', row.data)
  },
  complete: function() {
    console.log('All done!')
  }
})`}</code></pre>
              </div>
            </div>
          </section>

          <section id="header">
            <div className="grid-container narrow-grid">
              <div className="grid-100">
                <h4>Header Row</h4>
                <h5>"Great! Now I want data keyed by field name."</h5>

                <p>If you tell react-papaparse there is a header row, each row will be organized by field name instead of index.</p>

                <pre><code className="language-javascript">{`// Key data by field name instead of index/position
var results = readString(csvString {
  header: true
})`}</code></pre>
              </div>
            </div>
          </section>

          <section id="type-conversion">
            <div className="grid-container narrow-grid">
              <div className="grid-100">
                <h4>Type Conversion</h4>
                <h5>"Hey, these numbers are parsed as strings."</h5>

                <p><i>Everything</i> is parsed as strings. If you want numbers and booleans, you can enable dynamic typing to do the conversion for you.</p>

                <pre><code className="language-javascript">{`// Converts numeric/boolean data
var results = readString(csvString {
  header: true
})`}</code></pre>
              </div>
            </div>
          </section>

          <section id="comments">
            <div className="grid-container narrow-grid">
              <div className="grid-100">
                <h4>Comments</h4>
                <h5>"I forgot to mention: my CSV files have comments in them."</h5>

                <p>Okay, first off: that's really weird. But fortunately, you can skip those lines... just specify the comment string.</p>

                <pre><code className="language-javascript">{`// Mostly found in academia, some CSV files
// may have commented lines in them
var results = readString(csvString {
  comments: "#"
})`}</code></pre>
              </div>
            </div>
          </section>

          <section id="errors">
            <div className="grid-container narrow-grid">
              <div className="grid-100">
                <h4>Error Handling</h4>
                <h5>"Aw, shoot. Errors."</h5>

                <p>react-papaparse handles errors pretty well. The <a href="http://tools.ietf.org/html/rfc4180">CSV standard</a> is somewhat <strike>loose</strike> ambiguous, so react-papaparse is designed for edge cases. For example, mismatched fields won't break parsing.</p>

                <pre><code className="language-javascript">{`// Example error:
{
  type: "FieldMismatch",
  code: "TooManyFields",
  message: "Expected 3 fields, but parsed 4",
  row: 1
}`}</code></pre>
              </div>
            </div>
          </section>

          <section id="unparse">
            <div className="grid-container narrow-grid">
              <div className="grid-100">
                <h4>JSON to CSV</h4>
                <h5>"Last thing: what about converting JSON to CSV?"</h5>

                <p>Use <code>jsonToCSV()</code> function, passing in your array of arrays or array of objects. react-papaparse will figure it out.</p>

                <pre><code className="language-javascript">{`// Output is a properly-formatted CSV string.
var csv = jsonToCSV(jsonData)
`}</code></pre>
              </div>
            </div>
          </section>

          <section id="download">
            <div className="grid-container">
              <div className="grid-100">
                <h3>Install</h3>
              </div>
              <div className="prefix-30 grid-40 suffix-30">
                <b style={{display: 'block', textAlign: 'center'}}>npm</b>
                <pre><code className="language-bash">$ npm install --save react-papaparse</code></pre>
                <br/>
                <b style={{display: 'block', textAlign: 'center'}}>yarn</b>
                <pre><code className="language-bash">$ yarn add react-papaparse</code></pre>
              </div>

              <div className="clear"></div>

              <div className="grid-100 text-center">
                <br/><br/>

                <a href="https://github.com/Bunlong/react-papaparse" className="button">
                  <i className="fa fa-github"></i>&nbsp; GitHub
                </a>
                <a href="/demo" className="button red">
                  <i className="fa fa-magic"></i>&nbsp; Demo
                </a>
                <a href="/docs" className="button gray">
                  <i className="fa fa-book"></i>&nbsp; Documentation
                </a>
              </div>
            </div>
          </section>
        </main>
      </>
    )
  }
}
