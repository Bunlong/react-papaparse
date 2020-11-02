import React from 'react';

const Result = () => {
  return (
    <section>
      <div className="grid-container">
        <div className="grid-100">
          <h4 id="results">The Parse Result Object</h4>
          <p>
            A parse result always contains three objects: data, errors, and
            meta. Data and errors are arrays, and meta is an object. In the step
            callback, the data array will only contain one element.
          </p>
        </div>
        <div className="grid-100">
          <h5 id="results-structure">Result Structure</h5>
        </div>
        <div className="grid-50">
          <pre>
            <code className="language-javascript">
              {`{
  data:   // array of parsed data
  errors: // array of errors
  meta:   // object with extra info
}`}
            </code>
          </pre>
        </div>
        <div className="grid-50">
          <ul>
            <li>
              <code>data</code> is an array of rows. If header is false, rows
              are arrays; otherwise they are objects of data keyed by the field
              name.
            </li>
            <li>
              <code>errors</code> is an array of <a href="#errors">errors</a>.
            </li>
            <li>
              <code>meta</code> contains extra information about the parse, such
              as delimiter used, the newline sequence, whether the process was
              aborted, etc. Properties in this object are not guaranteed to
              exist in all situations.
            </li>
          </ul>
        </div>
        <div className="clear" />

        <div className="grid-100">
          <h5 id="data">Data</h5>
        </div>
        <div className="grid-50">
          <pre>
            <code className="language-javascript">
              {`// Example (header: false)
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
]`}
            </code>
          </pre>
        </div>
        <div className="grid-50">
          <ul>
            <li>
              If header row is enabled and more fields are found on a row of
              data than in the header row, an extra field will appear in that
              row called <code>__parsed_extra</code>. It contains an array of
              all data parsed from that row that extended beyond the header row.
            </li>
          </ul>
        </div>

        <div className="clear" />

        <div className="grid-100">
          <h5 id="errors">Errors</h5>
        </div>
        <div className="grid-50">
          <pre>
            <code className="language-javascript">
              {`// Error structure
{
  type: "",     // A generalization of the error
  code: "",     // Standardized error code
  message: "",  // Human-readable details
  row: 0,       // Row index of parsed data where error is
}`}
            </code>
          </pre>
        </div>
        <div className="grid-50">
          <ul>
            <li>
              The error <code>type</code> will be one of "Quotes", "Delimiter",
              or "FieldMismatch".
            </li>
            <li>
              The <code>code</code> may be "MissingQuotes",
              "UndetectableDelimiter", "TooFewFields", or "TooManyFields"
              (depending on the error type).
            </li>
            <li>
              Just because errors are generated does not necessarily mean that
              parsing failed. The worst error you can get is probably
              MissingQuotes.
            </li>
          </ul>
        </div>

        <div className="clear" />

        <div className="grid-100">
          <h5 id="meta">Meta</h5>
        </div>
        <div className="grid-50">
          <pre>
            <code className="language-javascript">
              {`{
  delimiter: // Delimiter used
  linebreak: // Line break sequence used
  aborted:   // Whether process was aborted
  fields:    // Array of field names
  truncated: // Whether preview consumed all input
}`}
            </code>
          </pre>
        </div>
        <div className="grid-50">
          <ul>
            <li>
              Not all meta properties will always be available. For instance,{' '}
              <code>fields</code> is only given when header row is enabled.
            </li>
          </ul>
        </div>
        <div className="clear" />
      </div>
    </section>
  );
};

export default Result;
