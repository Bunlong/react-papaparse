import React from 'react';

const Worker = () => {
  return (
    <section id="worker">
      <div className="grid-container narrow-grid">
        <div className="grid-100">
          <h4>Multi-Threading</h4>
          <h5>'Lovely. Now my web page locked up.'</h5>
          <p>
            That happens when a long-running script is executing in the same
            thread as the page. Use a{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Worker">
              Worker
            </a>{' '}
            thread by specifying <code>worker: true</code>. It may take slightly
            longer, but your page will stay reactive.
          </p>
          <pre>
            <code className="language-javascript">
              {`readRemoteFile(bigFileURL, {
  worker: true,
  step: (row) => {
    console.log('Row:', row.data)
  },
  complete: () => {
    console.log('All done!')
  }
})`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Worker;
