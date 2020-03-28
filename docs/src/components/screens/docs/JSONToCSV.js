import React from 'react'

const JSONToCSV = () => {
  return (
    <section>
      <div className='grid-container'>
        <div className='grid-100'>
          <h4 id='json-to-csv'>Convert JSON to CSV</h4>
          <p>react-papaparse <code>unparse</code> utility writes out correct delimited text strings given an array of arrays or an array of objects using <code>jsonToCSV()</code> function.</p>
        </div>
        <div className='grid-50'>
          <pre><code className='language-javascript'>jsonToCSV(jsonData<i>[, <a href='#unparse-config-default'>config</a>]</i>)</code></pre>
        </div>
        <div className='grid-50'>
          <ul>
            <li>Returns the resulting delimited text as a string.</li>
            <li>
              <code>data</code> can be one of:
              <ul>
                <li>An array of arrays</li>
                <li>An array of objects</li>
                <li>An object explicitly defining <code>fields</code> and <code>data</code></li>
              </ul>
            </li>
            <li>
              <code>config</code> is an optional <a href='#unparse-config-default'>config object</a>
            </li>
          </ul>
        </div>

        <div className='clear' />

        <div className='grid-100'>
          <h5 id='unparse-config-default'>Default Unparse Config with all options</h5>
        </div>
        <div className='prefix-25 grid-50 suffix-25'>
          <pre>
            <code className='language-javascript'>
              {`
{
  quotes: false, //or array of booleans
  quoteChar: '"',
  escapeChar: '"',
  delimiter: ",",
  header: true,
  newline: "`}<span dangerouslySetInnerHTML={{__html: '&bsol;r&bsol;n'}} />{`",
  skipEmptyLines: false, //or 'greedy',
  columns: null //or array of strings
}`}
            </code>
          </pre>
        </div>

        <div className='clear' />

        <div className='grid-100'>
          <h5>Unparse Config</h5>
        </div>
        <div className='grid-100' style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Option</th>
                <th style={{ width: '80% ' }}>Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>quotes</code>
                </td>
                <td>
                  If <code>true</code>, forces all fields to be enclosed in quotes. If an array of <code>true/false</code> values, specifies which fields should be force-quoted (first boolean is for the first column, second boolean for the second column, ...). A function that returns a boolean values can be used to determine the quotes value of a cell. This function accepts the cell value and column index as parameters.
                </td>
              </tr>
              <tr>
                <td><code>quoteChar</code></td>
                <td>
                  The character used to quote fields.
                </td>
              </tr>
              <tr>
                <td><code>escapeChar</code></td>
                <td>
                  The character used to escape <code>quoteChar</code> inside field values.
                </td>
              </tr>
              <tr>
                <td>
                  <code>delimiter</code>
                </td>
                <td>
                  The delimiting character. It must not be found in <a href='#readonly'>BAD_DELIMITERS</a>.
                </td>
              </tr>
              <tr>
                <td>
                  <code>header</code>
                </td>
                <td>
                  If <code>false</code>, will omit the header row. If <code>data</code> is an array of arrays this option is ignored. If <code>data</code> is an array of objects the keys of the first object are the header row. If <code>data</code> is an object with the keys <code>fields</code> and <code>data</code> the <code>fields</code> are the header row.
                </td>
              </tr>
              <tr>
                <td>
                  <code>newline</code>
                </td>
                <td>
                  The character used to determine newline sequence. It defaults to <code>"\r\n"</code>.
                </td>
              </tr>
              <tr>
                <td>
                  <code>skipEmptyLines</code>
                </td>
                <td>
                  If <code>true</code>, lines that are completely empty (those which evaluate to an empty string) will be skipped. If set to <code>'greedy'</code>, lines that don't have any content (those which have only whitespace after parsing) will also be skipped.
                </td>
              </tr>
              <tr>
                <td>
                  <code>columns</code>
                </td>
                <td>
                  If <code>data</code> is an array of objects this option can be used to manually specify the keys (columns) you expect in the objects. If not set the keys of the first objects are used as column.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='clear' />

        <div className='grid-100'>
          <h5 id='unparse-examples'>Examples</h5>
        </div>
        <div className='grid-33'>
          <pre>
            <code className='language-javascript'>
              {`// Two-line, comma-delimited file
const csv = jsonToCSV([
  ["1-1", "1-2", "1-3"],
  ["2-1", "2-2", "2-3"]
])`}
            </code>
          </pre>
        </div>
        <div className='grid-33'>
          <pre>
            <code className='language-javascript'>
              {`// With implicit header row
// (keys of first object populate header row)
const csv = jsonToCSV([
  {
    "Column 1": "foo",
    "Column 2": "bar"
  },
  {
    "Column 1": "abc",
    "Column 2": "def"
  }
])`}
            </code>
          </pre>
        </div>
        <div className='grid-33'>
          <pre>
            <code className='language-javascript'>
              {`// Specifying fields and data explicitly
const csv = jsonToCSV({
  "fields": ["Column 1", "Column 2"],
  "data": [
    ["foo", "bar"],
    ["abc", "def"]
  ]
})`}
            </code>
          </pre>
        </div>

        <div className='clear' />
      </div>
    </section>
  )
}

export default JSONToCSV
