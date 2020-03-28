/* eslint-disable react/jsx-no-target-blank */
import React from 'react'

const CSVToJSON = () => {
  return (
    <section>
      <div className='grid-container'>
        <div className='grid-100'>
          <h4 id='csv-to-json'>Convert CSV to JSON</h4>
          <p>Delimited data can be parsed out of strings or files. Files that are parsed can be local. Local files are used with CSVReader component.</p>
        </div>

        <div className='grid-100'>
          <h5 id='strings'>Parse string</h5>
        </div>
        <div className='grid-50'>
          <pre><code className='language-javascript'>readString(csvString<i>[, <a href='#config'>config</a>]</i>)</code></pre>
        </div>
        <div className='grid-50'>
          <ul>
            <li><code>csvString</code> is a string of delimited text to be parsed.</li>
            <li><code>config</code> is an optional <a href='#config'>config object</a>.</li>
            <li>Returns a <a href='#results'>parse results</a> object (if not streaming or using worker).</li>
          </ul>
        </div>

        <div className='clear' />

        <div className='grid-100'>
          <h5 id='local-files'>Parse local files</h5>
        </div>
        <div className='grid-100'>
          <p id='basic-upload' style={{ fontSize: 20 }}>Basic Upload</p>
        </div>
        <div className='grid-50'>
          <pre>
            <code className='language-javascript'>
              {`<CSVReader
  ref={buttonRef}
  onFileLoad={this.handleOnFileLoad}
  onError={this.handleOnError}
  noClick
  noDrag
  config={{}}
  style={{}}
>
  {({file}) => (
    <aside
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
      }}
    >
      <button
        type="button"
        onClick={this.handleOpenDialog}
      >
        Browe file
      </button>
      <div>
        {file.name}
      </div>
    </aside>
  )}
</CSVReader>
`}
            </code>
          </pre>
          <span style={{ float: 'right', marginBottom: 14, textAlignLast: 'end' }}><a href='https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader1.js'>Source code</a></span>
        </div>
        <div className='grid-50'>
          <ul>
            <li><code><a href='https://reactjs.org/docs/refs-and-the-dom.html' target='_blank'>ref</a></code> is a way to access/get files from <code>{'<input type="file">'}</code> element.</li>
            <li><code>onFileLoad</code> is the function to be called passing loaded results.</li>
            <li><code>onError</code> is error handling function.</li>
            <li><code>noClick</code> If true, disables click to open the native file selection dialog.</li>
            <li><code>noDrag</code> If true, disables drag 'n' drop.</li>
            <li><code>config</code> is a <a href='#config'>config object</a> which contains a callback.</li>
            <li><code>progressBarColor</code> is a property to be used to set the color of progress bar (for example, <code>progressBarColor='#659cef'</code>).</li>
            <li><code>style</code> is some styles to be applied to the <code>{'<input>'}</code> element.</li>
            <li>Doesn't return anything. Results are provided asynchronously to a callback function.</li>
          </ul>
        </div>

        <div className='clear' />

        <div className='grid-100'>
          <p id='click-and-drag-upload' style={{ fontSize: 20, marginTop: 50 }}>Click and Drag Upload</p>
        </div>
        <div className='grid-50'>
          <pre>
            <code className='language-javascript'>
              {`<CSVReader 
  onDrop={this.handleOnDrop}
  onError={this.handleOnError}
  style={{}}
  config={{}}
>
  <span>Drop CSV file here or click to upload.</span>
</CSVReader>
`}
            </code>
          </pre>
          <span style={{ float: 'right', marginBottom: 14, textAlignLast: 'end' }}><a href='https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader2.js'>Source code</a></span>
        </div>
        <div className='grid-50'>
          <ul>
            <li><code>onDrop</code> is the function to be called passing loaded results.</li>
            <li><code>onError</code> is error handling function.</li>
            <li><code>config</code> is a <a href='#config'>config object</a> which contains a callback.</li>
            <li><code>progressBarColor</code> is a property to be used to set the color of progress bar (for example, <code>progressBarColor='#659cef'</code>).</li>
            <li><code>style</code> is some styles to be applied to the <code>{'<input>'}</code> element.</li>
            <li>Doesn't return anything. Results are provided asynchronously to a callback function.</li>
          </ul>
        </div>

        <div className='clear' />

        <div className='grid-100'>
          <p id='drag-no-click-upload' style={{ fontSize: 20, marginTop: 50 }}>Drag ( No Click ) Upload</p>
        </div>
        <div className='grid-50'>
          <pre>
            <code className='language-javascript'>
              {`<CSVReader
  onDrop={this.handleOnDrop}
  onError={this.handleOnError}
  noClick
  style={{}}
  config={{}}
>
  <span>Drop CSV file here to upload.</span>
</CSVReader>
`}
            </code>
          </pre>
          <span style={{ float: 'right', marginBottom: 14, textAlignLast: 'end' }}><a href='https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader3.js'>Source code</a></span>
        </div>
        <div className='grid-50'>
          <ul>
            <li><code>onDrop</code> is the function to be called passing loaded results.</li>
            <li><code>onError</code> is error handling function.</li>
            <li><code>noClick</code> If true, disables click to open the native file selection dialog.</li>
            <li><code>config</code> is a <a href='#config'>config object</a> which contains a callback.</li>
            <li><code>progressBarColor</code> is a property to be used to set the color of progress bar (for example, <code>progressBarColor='#659cef'</code>).</li>
            <li><code>style</code> is some styles to be applied to the <code>{'<input>'}</code> element.</li>
            <li>Doesn't return anything. Results are provided asynchronously to a callback function.</li>
          </ul>
        </div>

        <div className='clear' />

        <div className='grid-100'>
          <p id='click-no-drag-upload' style={{ fontSize: 20, marginTop: 50 }}>Click ( No Drag ) Upload</p>
        </div>
        <div className='grid-50'>
          <pre>
            <code className='language-javascript'>
              {`<CSVReader 
  onDrop={this.handleOnDrop}
  onError={this.handleOnError}
  noDrag
  style={{}}
  config={{}}
>
  <span>Click to upload.</span>
</CSVReader>
`}
            </code>
          </pre>
          <span style={{ float: 'right', marginBottom: 14, textAlignLast: 'end' }}><a href='https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader4.js'>Source code</a></span>
        </div>
        <div className='grid-50'>
          <ul>
            <li><code>onDrop</code> is the function to be called passing loaded results.</li>
            <li><code>onError</code> is error handling function.</li>
            <li><code>noDrag</code> If true, disables drag 'n' drop.</li>
            <li><code>config</code> is a <a href='#config'>config object</a> which contains a callback.</li>
            <li><code>progressBarColor</code> is a property to be used to set the color of progress bar (for example, <code>progressBarColor='#659cef'</code>).</li>
            <li><code>style</code> is some styles to be applied to the <code>{'<input>'}</code> element.</li>
            <li>Doesn't return anything. Results are provided asynchronously to a callback function.</li>
          </ul>
        </div>

        <div className='clear' />

        <div className='grid-100'>
          <h5 id='remote-files'>Parse remote file</h5>
        </div>
        <div className='grid-50'>
          <pre>
            <code className='language-javascript'>
              {`readRemoteFile(url, {
  // rest of config ...
})`}
            </code>
          </pre>
        </div>
        <div className='grid-50'>
          <ul>
            <li><code>url</code> is the path or URL to the file to download.</li>
            <li>The second argument is a <a href='#config'>config object</a>.</li>
            <li>Doesn't return anything. Results are provided asynchronously to a callback function.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default CSVToJSON
