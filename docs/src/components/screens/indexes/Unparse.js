import React from 'react';

const Unparse = () => {
  return (
    <section id="unparse">
      <div className="grid-container narrow-grid">
        <div className="grid-100">
          <h4>JSON to CSV</h4>
          <h5>"Last thing: what about converting JSON to CSV?"</h5>
          <p>
            Use <code>jsonToCSV()</code> function, passing in your array of
            arrays or array of objects. react-papaparse will figure it out.
          </p>
          <pre>
            <code className="language-javascript">
              {`// Output is a properly-formatted CSV string.
const csv = jsonToCSV(jsonData)
`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Unparse;
