import React from 'react';

const Documentation = () => {
  return (
    <>
      <h1>Documentation</h1>
      <div className="grid-container">
        <div className="prefix-33 grid-33 suffix-33">
          <ol>
            <li>
              <a href="#csv-to-json">Convert CSV to JSON</a>
              <ul>
                <li>
                  <a href="#strings">readString</a>
                </li>
                <li>
                  <a href="#local-files">Parse local file</a>
                </li>
                <li>
                  <a href="#remote-files">readRemoteFile</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#json-to-csv">Convert JSON to CSV</a>
            </li>
            <li>
              <a href="#config">Config</a>
            </li>
            <li>
              <a href="#results">Results</a>
              <ul>
                <li>
                  <a href="#data">Data</a>
                </li>
                <li>
                  <a href="#errors">Errors</a>
                </li>
                <li>
                  <a href="#meta">Meta</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#extras">Extras</a>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default Documentation;
