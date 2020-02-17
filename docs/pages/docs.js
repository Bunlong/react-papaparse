import React, { Component } from 'react'

export default class Docs extends Component {
  render() {
    return (
      <>
        <main>
          <header>
            <div className="grid-container">
              <div className="grid-40 mobile-grid-50">
                <div className="links">
                  <a href="/">
                    <i className="fa fa-home fa-lg"></i> Home
                  </a>
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
                  <a href="https://github.com/themodernjavascript/react-papaparse">
                    <i className="fa fa-github fa-lg"></i> GitHub
                  </a>
                </div>
              </div>
            </div>
          </header>

          <h1>Documentation</h1>

          <div className="grid-container">
            <div className="prefix-33 grid-33 suffix-33">
              <ol>
                <li>
                  <a href="#csv-to-json">Convert CSV to JSON</a>
                  <ul>
                    <li><a href="#strings">readString</a></li>
                    <li><a href="#local-files">Parse local file</a></li>
                  </ul>
                </li>
                <li><a href="#json-to-csv">Convert JSON to CSV</a></li>
                <li><a href="#config">Config</a></li>
                <li>
                  <a href="#results">Results</a>
                  <ul>
                    <li><a href="#data">Data</a></li>
                    <li><a href="#errors">Errors</a></li>
                    <li><a href="#meta">Meta</a></li>
                  </ul>
                </li>
                <li><a href="#extras">Extras</a></li>
              </ol>
            </div>
          </div>

          <section>
            <div className="grid-container">
              <div className="grid-100">
                <h4 id="csv-to-json">Convert CSV to JSON</h4>

                <p>
                  Delimited data can be parsed out of strings or files. Files that are parsed can be local. Local files are used with CSVReader component.
                </p>
              </div>

              <div className="grid-100">
                <h5 id="strings">Parse string</h5>
              </div>

              <div className="grid-50">
                <pre><code className="language-javascript">readString(csvString<i>[, <a href="#config">config</a>]</i>)</code></pre>
              </div>

              <div className="grid-50">
                <ul>
                  <li><code>csvString</code> is a string of delimited text to be parsed.</li>
                  <li><code>config</code> is an optional <a href="#config">config object</a>.</li>
                  <li>Returns a <a href="#results">parse results</a> object (if not streaming or using worker).</li>
                </ul>
              </div>

              <div className="clear"></div>

              <div className="grid-100">
                <h5 id="local-files">Parse local files</h5>
              </div>

              <div className="grid-50">
                <pre><code className="language-javascript">{`<CSVReader
  onFileLoaded={this.handleReadCSV}
  inputRef={this.fileInput}
  style={{display: 'none'}}
  onError={this.handleOnError}
  configOptions={`
}<a href="#config">config</a>{`}
/>
`}</code></pre>
              </div>

              <div className="grid-50">
                <ul>
                  <li><code>onFileLoaded</code> is the function to be called passing loaded results.</li>
                  <li><code>onError</code> is error handling function.</li>
                  <li><code>configOptions</code> is a <a href="#config">config object</a> which contains a callback.</li>
                  <li><code><a href="https://reactjs.org/docs/refs-and-the-dom.html" target="_blank">inputRef</a></code> is a way to access/get files from <code>{`<input type="file">`}</code> element.</li>
                  <li><code>style</code> is some styles to be applied to the <code>{`<input>`}</code> element.</li>
                  <li>Doesn't return anything. Results are provided asynchronously to a callback function.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="grid-container">
              <div className="grid-100">
                <h4 id="json-to-csv">Convert JSON to CSV</h4>

                <p>
                  react-papaparse <code>unparse</code> utility writes out correct delimited text strings given an array of arrays or an array of objects using <code>jsonToCSV()</code> function.
                </p>
              </div>

              <div className="grid-100">
                <h5 id="unparse">Unparse</h5>
              </div>

              <div className="grid-50">
                <pre><code className="language-javascript">jsonToCSV(jsonData<i>[, <a href="#unparse-config-default">config</a>]</i>)</code></pre>
              </div>

              <div className="grid-50">
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
                    <code>config</code> is an optional <a href="#unparse-config-default">config object</a>
                  </li>
                </ul>
              </div>

              <div className="clear"></div>

              <div className="grid-100">
                <h5 id="unparse-config-default">Default Unparse Config with all options</h5>
              </div>

              <div className="prefix-25 grid-50 suffix-25">
                <pre><code className="language-javascript">{`
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
          </code></pre>
              </div>

              <div className="clear"></div>

              <div className="grid-100">
                <h5>Unparse Config Options</h5>
              </div>

              <div className="grid-100" style={{overflowX: 'auto'}}>
                <table>
                  <thead>
                    <tr>
                      <th style={{width: '20%'}}>Option</th>
                      <th style={{width: '80%'}}>Explanation</th>
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
                        The delimiting character. It must not be found in <a href="#readonly">BAD_DELIMITERS</a>.
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

              <div className="clear"></div>

              <div className="grid-100">
                <h5 id="unparse-examples">Examples</h5>
              </div>

              <div className="grid-33">
                <pre><code className="language-javascript">{`// Two-line, comma-delimited file
var csv = jsonToCSV([
  ["1-1", "1-2", "1-3"],
  ["2-1", "2-2", "2-3"]
])`}</code></pre>
              </div>

              <div className="grid-33">
                <pre><code className="language-javascript">{`// With implicit header row
// (keys of first object populate header row)
var csv = jsonToCSV([
  {
    "Column 1": "foo",
    "Column 2": "bar"
  },
  {
    "Column 1": "abc",
    "Column 2": "def"
  }
])`}</code></pre>
              </div>

              <div className="grid-33">
                <pre><code className="language-javascript">{`// Specifying fields and data explicitly
var csv = jsonToCSV({
  "fields": ["Column 1", "Column 2"],
  "data": [
    ["foo", "bar"],
    ["abc", "def"]
  ]
})`}</code></pre>
              </div>

              <div className="clear"></div>
            </div>
          </section>

          <section>
            <div className="grid-container">
              <div className="grid-100">
                <h4 id="config">The Parse Config Object</h4>

                <p>
                  The <code>readString</code> function <code>CSVReader</code> component may be passed a configuration object. It defines settings, behavior, and callbacks used during parsing. Any properties left unspecified will resort to their default values.
                </p>
              </div>

              <div className="grid-100">
                <h5 id="config-default">Default Config With All Options</h5>
              </div>

              <div className="prefix-25 grid-50 suffix-25">
                <pre><code className="language-javascript">{`{
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
  delimitersToGuess: [',', '\t', '|', ';',`} <a href="#readonly">RECORD_SEP</a>, <a href="#readonly">UNIT_SEP</a>{`]
}`}</code></pre>
              </div>

              <div className="clear"></div>

              <div className="grid-100">
                <h5 id="config-details">Config Options</h5>
              </div>

              <div className="grid-100" style={{overflowX: 'auto'}}>
                <table>
                  <thead>
                    <tr>
                      <th style={{width: '20%'}}>Option</th>
                      <th style={{width: '80%'}}>Explanation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <code>delimiter</code>
                      </td>
                      <td>
                        The delimiting character. Leave blank to auto-detect from a list of most common delimiters, or any values passed in through <code>delimitersToGuess</code>. It can be a string or a function. If string, it must be one of length 1. If a function, it must accept the input as first parameter and it must return a string which will be used as delimiter. In both cases it cannot be found in <a href="#readonly">BAD_DELIMITERS</a>.
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
                        If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in <a href="#meta">meta</a>, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
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
                        To <a href="/faq#streaming">stream</a> the input, define a callback function:
                        <pre><code className="language-javascript">{`step: function(`}<a href="#results">results</a>{`, parser) {
    console.log("Row data:", results.data)
    console.log("Row errors:", results.errors)
  }`}</code></pre>
                        Streaming is necessary for large files which would otherwise crash the browser. You can call <code>parser.abort()</code> to abort parsing. And, except when using a <a href="/faq#worker">Web Worker</a>, you can call <code>parser.pause()</code> to pause it, and <code>parser.resume()</code> to resume.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>complete</code>
                      </td>
                      <td>
                        The callback to execute when parsing is complete. It receives the parse <a href="#results">results</a>. If parsing a local file, the <a href="https://developer.mozilla.org/en-US/docs/Web/API/File">File</a> is passed in, too:

                        <pre><code className="language-javascript">{`complete: function(results, file) {
    console.log("Parsing complete:", results, file)
  }`}</code></pre>
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
                          <code className="language-javascript">{`downloadRequestHeaders: {
    'Authorization': 'token 123345678901234567890',
  }`}</code></pre>
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

          <section>
            <div className="grid-container">
              <div className="grid-100">
                <h4 id="results">The Parse Result Object</h4>

                <p>
                  A parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
                </p>
              </div>

              <div className="grid-100">
                <h5 id="results-structure">Result Structure</h5>
              </div>

              <div className="grid-50">
                <pre><code className="language-javascript">{`{
  data:   // array of parsed data
  errors: // array of errors
  meta:   // object with extra info
}`}</code></pre>
              </div>

              <div className="grid-50">
                <ul>
                  <li><code>data</code> is an array of rows. If header is false, rows are arrays; otherwise they are objects of data keyed by the field name.</li>
                  <li><code>errors</code> is an array of <a href="#errors">errors</a>.</li>
                  <li><code>meta</code> contains extra information about the parse, such as delimiter used, the newline sequence, whether the process was aborted, etc. Properties in this object are not guaranteed to exist in all situations.</li>
                </ul>
              </div>

              <div className="clear"></div>

              <div className="grid-100">
                <h5 id="data">Data</h5>
              </div>

              <div className="grid-50">
                <pre><code className="language-javascript">{`// Example (header: false)
[
  ["Column 1", "Column 2"],
  ["foo", "bar"],
  ["abc", "def"]
]

// Example (header: true)
[
  {
    "Column 1": "foo",
    "Column 2": "bar"
  },
  {
    "Column 1": "abc",
    "Column 2": "def"
  }
]`}</code></pre>
              </div>

              <div className="grid-50">
                <ul>
                  <li>If header row is enabled and more fields are found on a row of data than in the header row, an extra field will appear in that row called <code>__parsed_extra</code>. It contains an array of all data parsed from that row that extended beyond the header row.</li>
                </ul>
              </div>

              <div className="clear"></div>

              <div className="grid-100">
                <h5 id="errors">Errors</h5>
              </div>

              <div className="grid-50">
                <pre><code className="language-javascript">{`// Error structure
{
  type: "",     // A generalization of the error
  code: "",     // Standardized error code
  message: "",  // Human-readable details
  row: 0,       // Row index of parsed data where error is
}`}</code></pre>
              </div>

              <div className="grid-50">
                <ul>
                  <li>The error <code>type</code> will be one of "Quotes", "Delimiter", or "FieldMismatch".</li>
                  <li>The <code>code</code> may be "MissingQuotes", "UndetectableDelimiter", "TooFewFields", or "TooManyFields" (depending on the error type).</li>
                  <li>Just because errors are generated does not necessarily mean that parsing failed. The worst error you can get is probably MissingQuotes.</li>
                </ul>
              </div>

              <div className="clear"></div>

              <div className="grid-100">
                <h5 id="meta">Meta</h5>
              </div>

              <div className="grid-50">
                <pre><code className="language-javascript">{`{
  delimiter: // Delimiter used
  linebreak: // Line break sequence used
  aborted:   // Whether process was aborted
  fields:    // Array of field names
  truncated: // Whether preview consumed all input
}`}</code></pre>
              </div>

              <div className="grid-50">
                <ul>
                  <li>Not all meta properties will always be available. For instance, <code>fields</code> is only given when header row is enabled.</li>
                </ul>
              </div>

              <div className="clear"></div>
            </div>
          </section>

          <section style={{borderBottom: 0, paddingBottom: 0}}>
            <div className="grid-container">
              <div className="grid-100">
                <h4 id="extras">Extras</h4>

                <p>
                  There's a few other things that react-papaparse exposes to you that weren't explained above.
                </p>
              </div>

              <div className="grid-100">
                <h5 id="readonly">Read-Only</h5>
              </div>

              <div className="grid-100">
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

              <div className="grid-100">
                <h5 id="configurable">Configurable</h5>
              </div>

              <div className="grid-100">
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

              <div className="clear"></div>
            </div>
          </section>
        </main>
      </>
    )
  }
}
