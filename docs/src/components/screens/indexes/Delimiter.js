import React from 'react';

const Delimiter = () => {
  return (
    <section id="delimiter">
      <div className="grid-container narrow-grid">
        <div className="grid-100">
          <h4>Delimiter Detection</h4>
          <h5>"But I don't know the delimiter..."</h5>
          <p>
            That's okay. react-papaparse will scan the first few rows to find
            the right delimiter.
          </p>
          <pre>
            <code className="language-javascript">
              {`const config = {
  worker: true,
  complete: (results) => {
    console.log('---------------------------');
    console.log(results.meta.delimiter);
    console.log('---------------------------');
  },
};

readString(csvString, config);

`}
              <span>
                {String.fromCharCode(47)}
                {String.fromCharCode(47)} "{String.fromCharCode(92)}t"
              </span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Delimiter;
