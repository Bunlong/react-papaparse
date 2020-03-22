import React from 'react'

const Welcome = () => {
  return (
    <>
      <div id='skrollr-body'>
        <div
          id='top'
          data-top='bottom: 0px; opacity: 1;'
          data-top-bottom='bottom: -350px; opacity: .3;'
        >
          <div className='grid-container'>
            <div className='grid-100'>
              <div id='title-main'>
                <h1>react-papaparse</h1>
                <h2>The powerful, in-browser React CSV parser for big boys and girls</h2>

                <a href='#download' className='button'>
                  <i className='fa fa-download' />&nbsp; Install
                </a>
                <a href='/demo' className='button red'>
                  <i className='fa fa-magic' />&nbsp; Demo
                </a>
                <a href='/docs' className='button gray'>
                  <i className='fa fa-book' />&nbsp; Documentation
                </a>
              </div>
              <div id='title-code'>
                <pre>
                  <code className='language-javascript'>
                    {`// Parse CSV string
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
})`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Welcome
