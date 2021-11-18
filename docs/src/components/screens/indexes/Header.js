import React from 'react';

const Header = () => {
  return (
    <section id="header">
      <div className="grid-container narrow-grid">
        <div className="grid-100">
          <h4>Header Row</h4>
          <h5>"Great! Now I want data keyed by field name."</h5>
          <p>
            If you tell react-papaparse there is a header row, each row will be
            organized by field name instead of index.
          </p>
          <pre>
            <code className="language-javascript">
              {`// Key data by field name instead of index/position
readString(csvString, {
  worker: true,
  complete: (results) => {
    console.log(results)
  },
  header: true
})`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Header;
