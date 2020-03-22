import React from 'react'

const TypeConversion = () => {
  return (
    <section id='type-conversion'>
      <div className='grid-container narrow-grid'>
        <div className='grid-100'>
          <h4>Type Conversion</h4>
          <h5>"Hey, these numbers are parsed as strings."</h5>
          <p><i>Everything</i> is parsed as strings. If you want numbers and booleans, you can enable dynamic typing to do the conversion for you.</p>
          <pre>
            <code className='language-javascript'>
              {`// Converts numeric/boolean data
var results = readString(csvString {
  dynamicTyping: true
})`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}

export default TypeConversion
