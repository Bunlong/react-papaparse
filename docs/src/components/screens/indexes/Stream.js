import React from 'react'

const Stream = () => {
  return (
    <section id='stream'>
      <div className='grid-container narrow-grid'>
        <div className='grid-100'>
          <h4>Streaming</h4>
          <h5>"Did I mention the file is huge?"</h5>
          <p>That's what streaming is for. Specify a step callback to receive the results row-by-row. This way, you won't load the whole file into memory and crash the browser.</p>
          <pre>
            <code className='language-javascript'>
              {`readRemoteFile('http://example.com/big.csv', {
  step: function(row) {
    console.log('Row:', row.data)
  },
  complete: function() {
    console.log('All done!')
  }
})`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}

export default Stream
