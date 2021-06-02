import React from 'react';

const CSVDownloader = () => {
  return (
    <section id="csv-downloader">
      <div className="grid-container narrow-grid">
        <div className="grid-100">
          <h4>CSVDownloader</h4>
          <h5>"Allow to download CSV file from js object."</h5>
          <p>Just pass in the js object with an optional <a href="/docs#config">configuration</a> ( setting delimiter / separator ).</p>
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
  filename={'filename'}
  config={{}}
>
  Download
</CSVDownloader>
`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default CSVDownloader;
