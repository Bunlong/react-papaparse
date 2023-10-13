import React from 'react';

const Download = () => {
  return (
    <section id="download">
      <div className="grid-container">
        <div className="grid-100">
          <h3>Install</h3>
        </div>
        <div className="prefix-30 grid-40 suffix-30">
          <b style={{ display: 'block', textAlign: 'center' }}>npm</b>
          <pre>
            <code className="language-bash">
              $ npm install react-papaparse --save
            </code>
          </pre>
          <br />
          <b style={{ display: 'block', textAlign: 'center' }}>yarn</b>
          <pre>
            <code className="language-bash">
              $ yarn add react-papaparse --save
            </code>
          </pre>
        </div>
        <div className="clear" />
        <div className="grid-100 text-center">
          <br />
          <br />
          <a
            href="https://github.com/Bunlong/react-papaparse"
            className="button"
          >
            <i className="fa fa-github" />
            &nbsp; GitHub
          </a>
          <a href="/demo" className="button red">
            <i className="fa fa-magic" />
            &nbsp; Demo
          </a>
          <a href="/docs" className="button gray">
            <i className="fa fa-book" />
            &nbsp; Documentation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Download;
