import React from 'react'

const Config = () => {
  return (
    <section>
      <div className='grid-container'>
        <div className='grid-100'>
          <h4 id='config'>The Parse Config Object</h4>
          <p>The <code>readString</code> function <code>CSVReader</code> component may be passed a configuration object. It defines settings, behavior, and callbacks used during parsing. Any properties left unspecified will resort to their default values.</p>
        </div>

        <div className='grid-100'>
          <h5 id='config-default'>Default Config With All Options</h5>
        </div>

        <div className='prefix-25 grid-50 suffix-25'>
          <pre>
            <code className='language-javascript'>
              {`{
  delimiter: "",  // auto-detect
  newline: "",  // auto-detect
  quoteChar: '"',
  escapeChar: '"',
  header: false,
  transformHeader: undefined,
  dynamicTyping: false,
  preview: 0,
  encoding: "",
  worker: false,
  comments: false,
  step: undefined,
  complete: undefined,
  error: undefined,
  download: false,
  downloadRequestHeaders: undefined,
  skipEmptyLines: false,
  chunk: undefined,
  fastMode: undefined,
  beforeFirstChunk: undefined,
  withCredentials: undefined,
  transform: undefined,
  delimitersToGuess: [',', '\t', '|', ';',`} <a href='#readonly'>RECORD_SEP</a>, <a href='#readonly'>UNIT_SEP</a>{`]
}`}
            </code>
          </pre>
        </div>

        <div className='clear' />

        <div className='grid-100'>
          <h5 id='config-details'>Config</h5>
        </div>

        <div className='grid-100' style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Option</th>
                <th style={{ width: '80%' }}>Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>delimiter</code>
                </td>
                <td>
                  The delimiting character. Leave blank to auto-detect from a list of most common delimiters, or any values passed in through <code>delimitersToGuess</code>. It can be a string or a function. If string, it must be one of length 1. If a function, it must accept the input as first parameter and it must return a string which will be used as delimiter. In both cases it cannot be found in <a href='#readonly'>BAD_DELIMITERS</a>.
                </td>
              </tr>
              <tr>
                <td>
                  <code>newline</code>
                </td>
                <td>
                  The newline sequence. Leave blank to auto-detect. Must be one of \r, \n, or \r\n.
                </td>
              </tr>
              <tr>
                <td>
                  <code>quoteChar</code>
                </td>
                <td>
                  The character used to quote fields. The quoting of all fields is not mandatory. Any field which is not quoted will correctly read.
                </td>
              </tr>
              <tr>
                <td>
                  <code>escapeChar</code>
                </td>
                <td>
                  The character used to escape the quote character within a field. If not set, this option will default to the value of <code>quoteChar</code>, meaning that the default escaping of quote character within a quoted field is using the quote character two times. (e.g. <code>"column with ""quotes"" in text"</code>)
                </td>
              </tr>
              <tr>
                <td>
                  <code>header</code>
                </td>
                <td>
                  If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in <a href='#meta'>meta</a>, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
                </td>
              </tr>
              <tr>
                <td>
                  <code>transformHeader</code>
                </td>
                <td>
                  A function to apply on each header. Requires <code>header</code> to be <code>true</code>. The function receives the header as its first argument.
                </td>
              </tr>
              <tr>
                <td>
                  <code>dynamicTyping</code>
                </td>
                <td>
                  If true, numeric and boolean data will be converted to their type instead of remaining strings. Numeric data must conform to the definition of a decimal literal. Numerical values greater than <code>2^53</code> or less than <code>-2^53</code> will not be converted to numbers to preserve precision. European-formatted numbers must have commas and dots swapped. If also accepts an object or a function. If object it's values should be a boolean to indicate if dynamic typing should be applied for each column number (or header name if using headers). If it's a function, it should return a boolean value for each field number (or name if using headers) which will be passed as first argument.
                </td>
              </tr>
              <tr>
                <td>
                  <code>preview</code>
                </td>
                <td>
                  If &gt; 0, only that many rows will be parsed.
                </td>
              </tr>
              <tr>
                <td>
                  <code>encoding</code>
                </td>
                <td>
                  The encoding to use when opening local files. If specified, it must be a value supported by the FileReader API.
                </td>
              </tr>
              <tr>
                <td>
                  <code>worker</code>
                </td>
                <td>
                  Whether or not to use a worker thread. Using a worker will keep your page reactive, but may be slightly slower.
                </td>
              </tr>
              <tr>
                <td>
                  <code>comments</code>
                </td>
                <td>
                  A string that indicates a comment (for example, "#" or "//"). When react-papaparse encounters a line starting with this string, it will skip the line.
                </td>
              </tr>
              <tr>
                <td>
                  <code>step</code>
                </td>
                <td>
                  To <a href='/faq#streaming'>stream</a> the input, define a callback function:
                  <pre>
                    <code className='language-javascript'>
                      step: function(<a href='#results'>results</a>{`, parser) {
  console.log("Row data:", results.data)
  console.log("Row errors:", results.errors)
}`}
                    </code>
                  </pre>
                  Streaming is necessary for large files which would otherwise crash the browser. You can call <code>parser.abort()</code> to abort parsing. And, except when using a <a href='/faq#worker'>Web Worker</a>, you can call <code>parser.pause()</code> to pause it, and <code>parser.resume()</code> to resume.
                </td>
              </tr>
              <tr>
                <td>
                  <code>complete</code>
                </td>
                <td>
                  The callback to execute when parsing is complete. It receives the parse <a href='#results'>results</a>. If parsing a local file, the <a href='https://developer.mozilla.org/en-US/docs/Web/API/File'>File</a> is passed in, too:
                  <pre>
                    <code className='language-javascript'>
                      {`complete: function(results, file) {
  console.log("Parsing complete:", results, file)
}`}
                    </code>
                  </pre>
                  When streaming, parse results are <i>not</i> available in this callback.
                </td>
              </tr>
              <tr>
                <td>
                  <code>error</code>
                </td>
                <td>
                  A callback to execute if FileReader encounters an error. The function is passed two arguments: the error and the File.
                </td>
              </tr>
              <tr>
                <td>
                  <code>downloadRequestHeaders</code>
                </td>
                <td>
                  If defined, should be an object that describes the headers, example:
                  <pre>
                    <code className='language-javascript'>
                      {`downloadRequestHeaders: {
  'Authorization': 'token 123345678901234567890',
}`}
                    </code>
                  </pre>
                </td>
              </tr>
              <tr>
                <td>
                  <code>skipEmptyLines</code>
                </td>
                <td>
                  If true, lines that are completely empty (those which evaluate to an empty string) will be skipped. If set to <code>'greedy'</code>, lines that don't have any content (those which have only whitespace after parsing) will also be skipped.
                </td>
              </tr>
              <tr>
                <td>
                  <code>chunk</code>
                </td>
                <td>
                  A callback function, identical to step, which activates streaming. However, this function is executed after every <i>chunk</i> of the file is loaded and parsed rather than every row. Works only with local and remote files. Do not use both chunk and step callbacks together. For the function signature, see the documentation for the step function.
                </td>
              </tr>
              <tr>
                <td>
                  <code>fastMode</code>
                </td>
                <td>
                  Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no <code>"</code> characters appear in the input. You can force fast mode either way by setting it to <code>true</code> or <code>false</code>.
                </td>
              </tr>
              <tr>
                <td>
                  <code>beforeFirstChunk</code>
                </td>
                <td>
                  A function to execute before parsing the first chunk. Can be used with chunk or step streaming modes. The function receives as an argument the chunk about to be parsed, and it may return a modified chunk to parse. This is useful for stripping header lines (as long as the header fits in a single chunk).
                </td>
              </tr>
              <tr>
                <td>
                  <code>withCredentials</code>
                </td>
                <td>
                  A boolean value passed directly into XMLHttpRequest's "withCredentials" property.
                </td>
              </tr>
              <tr>
                <td>
                  <code>transform</code>
                </td>
                <td>
                  A function to apply on each value. The function receives the value as its first argument and the column number or header name when enabled as its second argument. The return value of the function will replace the value it received. The transform function is applied before dynamicTyping.
                </td>
              </tr>
              <tr>
                <td>
                  <code>delimitersToGuess</code>
                </td>
                <td>
                  An array of delimiters to guess from if the <code>delimiter</code> option is not set.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Config
