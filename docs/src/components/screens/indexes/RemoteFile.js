import React from 'react';

const RemoteFile = () => {
  return (
    <section id="remote-files">
      <div className="grid-container narrow-grid">
        <div className="grid-100">
          <h4>Remote Files</h4>
          <h5>"No &mdash; I mean, the file isn't on my computer."</h5>
          <p>
            Oh, well then just pass in the URL and &mdash; of course &mdash; a
            callback.
          </p>
          <pre>
            <code className="language-javascript">
              {`import React from 'react';

import { usePapaParse } from 'react-papaparse';

export default function ReadRemoteFile() {
  const { readRemoteFile } = usePapaParse();

  const handleReadRemoteFile = () => {
    readRemoteFile(url, {
      complete: (results) => {
        console.log('---------------------------');
        console.log('Results:', results)
        console.log('---------------------------');
      }
    });
  };

  return (<button onClick={() => handleReadRemoteFile()}>readRemoteFile</button>);
}`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default RemoteFile;
