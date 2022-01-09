import React from 'react';

const CSVParsing = () => {
  return (
    <section id="parse">
      <div className="grid-container narrow-grid">
        <div className="grid-100">
          <h4>CSV Parsing</h4>
          <h5>
            "Isn't parsing CSV just <code>String.split(',')</code>?"
          </h5>
          <p>
            react-papaparse does it right. Just pass in the CSV string with an
            optional <a href="/docs#config">configuration</a>.
          </p>
          <pre>
            <code className="language-javascript">
              {`import React from 'react';

import { usePapaParse } from 'react-papaparse';

export default function ReadString() {
  const { readString } = usePapaParse();

  const handleReadString = () => {
    const csvString = 'Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7';

    readString(csvString, {
      worker: true,
      complete: (results) => {
        console.log('---------------------------');
        console.log(results);
        console.log('---------------------------');
      },
    });
  };

  return (<button onClick={() => handleReadString()}>readString</button>);
}

/*
results = {
  data: [ ... ],    // parsed data
  errors: [ ... ],  // errors encountered
  meta: { ... }     // extra parse info
}
*/`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default CSVParsing;
