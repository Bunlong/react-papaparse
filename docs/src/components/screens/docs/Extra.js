import React from 'react'

const Extra = () => {
  return (
    <section style={{ borderBottom: 0, paddingBottom: 0 }}>
      <div className='grid-container'>
        <div className='grid-100'>
          <h4 id='extras'>Extras</h4>
          <p>There's a few other things that react-papaparse exposes to you that weren't explained above.</p>
        </div>
        <div className='grid-100'>
          <h5 id='readonly'>Read-Only</h5>
        </div>
        <div className='grid-100'>
          <table>
            <thead>
              <tr>
                <th>Read-Only Property</th>
                <th>Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>BAD_DELIMITERS</code></td>
                <td>
                  An array of characters that are not allowed as delimiters.
                </td>
              </tr>
              <tr>
                <td><code>RECORD_SEP</code></td>
                <td>
                  The true delimiter. Invisible. ASCII code 30. Should be doing the job we strangely rely upon commas and tabs for.
                </td>
              </tr>
              <tr>
                <td><code>UNIT_SEP</code></td>
                <td>
                  Also sometimes used as a delimiting character. ASCII code 31.
                </td>
              </tr>
              <tr>
                <td><code>WORKERS_SUPPORTED</code></td>
                <td>
                  Whether or not the browser supports HTML5 Web Workers. If false, <code>worker: true</code> will have no effect.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='grid-100'>
          <h5 id='configurable'>Configurable</h5>
        </div>
        <div className='grid-100'>
          <table>
            <thead>
              <tr>
                <th>Configurable Property</th>
                <th>Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>LocalChunkSize</code></td>
                <td>
                  The size in bytes of each file chunk. Used when streaming files obtained from the DOM that exist on the local computer. Default 10 MB.
                </td>
              </tr>
              <tr>
                <td><code>DefaultDelimiter</code></td>
                <td>
                  The delimiter used when it is left unspecified and cannot be detected automatically. Default is comma.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='clear' />
      </div>
    </section>
  )
}

export default Extra
