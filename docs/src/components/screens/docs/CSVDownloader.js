/* eslint-disable react/jsx-no-target-blank */
import React from 'react';

const CSVDownloader = () => {
  return (
    <section>
      <div className="grid-container">
        <div className="grid-100">
          <h4 id="csv-downloader">CSVDownloader</h4>
          <p>
            Allow download CSV file from js object.
          </p>
        </div>

        <div className="clear" />

        <div className="grid-50">
          <pre>
            <code className="language-javascript">
              {`<CSVDownloader
  data={[
    {
      "Column 1": "1-1",
      "Column 2": "1-2",
      "Column 3": "1-3",
      "Column 4": "1-4",
    },
  ]}
  type="button"
  filename={'filename'}
  bom={true}
>
  Download
</CSVDownloader>
`}
            </code>
          </pre>
          <span
            style={{ float: 'right', marginBottom: 14, textAlignLast: 'end' }}
          >
            <a href="https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader1.js">
              Source code
            </a>
          </span>
        </div>
        <div className="grid-50">
          <ul>
            <li>
              <code>data</code> is Downloaded data.
            </li>
            <li>
              <code>bom</code> Activate or deactivate bom mode.
            </li>
          </ul>
        </div>

        <div className="clear" />
      </div>
    </section>
  );
};

export default CSVDownloader;
