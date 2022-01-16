import React from 'react';

const CSVDownloader = () => {
  return (
    <section id="csv-downloader">
      <div className="grid-container narrow-grid">
        <div className="grid-100">
          <h4>CSVDownloader</h4>
          <h5>"Allow to download CSV file from js object."</h5>
          <p>
            Just pass in the js object with an optional{' '}
            <a href="/docs#config">configuration</a> ( setting delimiter /
            separator ).
          </p>
          <pre>
            <code className="language-javascript">
              {`import React from 'react';

import { useCSVDownloader } from 'react-papaparse';

export default function CSVDownloader() {
  const { CSVDownloader, Type } = useCSVDownloader();

  return (
    <CSVDownloader
      type={Type.Button}
      filename={'filename'}
      bom={true}
      config={{
        delimiter: ';',
      }}
      data={[
        {
          'Column 1': '1-1',
          'Column 2': '1-2',
          'Column 3': '1-3',
          'Column 4': '1-4',
        },
        {
          'Column 1': '2-1',
          'Column 2': '2-2',
          'Column 3': '2-3',
          'Column 4': '2-4',
        },
        {
          'Column 1': '3-1',
          'Column 2': '3-2',
          'Column 3': '3-3',
          'Column 4': '3-4',
        },
        {
          'Column 1': 4,
          'Column 2': 5,
          'Column 3': 6,
          'Column 4': 7,
        },
      ]}
    >
      Download
    </CSVDownloader>
  );
}`}
            </code>
          </pre>
        </div>
        <div className="grid-100 break">
          <p>
            <code>data={}</code> can be a function that returns a data object.
          </p>
          <pre>
            <code className="language-javascript">
              {`<CSVDownloader
  filename={'filename'}
  data={() => {
    return [
      {
        "Column 1": "1-1",
        "Column 2": "1-2",
        "Column 3": "1-3",
        "Column 4": "1-4",
      }
    ]}
  }
>
  Download
</CSVDownloader>`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default CSVDownloader;
