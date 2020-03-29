import React from 'react'

const Error = () => {
  return (
    <section id='errors'>
      <div className='grid-container narrow-grid'>
        <div className='grid-100'>
          <h4>Error Handling</h4>
          <h5>"Aw, shoot. Errors."</h5>
          <p>react-papaparse handles errors pretty well. The <a href='http://tools.ietf.org/html/rfc4180'>CSV standard</a> is somewhat <strike>loose</strike> ambiguous, so react-papaparse is designed for edge cases. For example, mismatched fields won't break parsing.</p>
          <pre>
            <code className='language-javascript'>
              {`// Example error:
{
  type: 'FieldMismatch',
  code: 'TooManyFields',
  message: 'Expected 3 fields, but parsed 4',
  row: 1
}`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}

export default Error
