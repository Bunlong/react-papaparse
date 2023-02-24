/* eslint-disable react/jsx-no-target-blank */
import React from 'react';

const CSVToJSON = () => {
  return (
    <section>
      <div className="grid-container">
        <div className="grid-100">
          <h4 id="csv-to-json">Convert CSV to JSON</h4>
          <p>
            Delimited data can be parsed out of strings or files. Files that are
            parsed can be local. Local files are used with CSVReader component.
          </p>
        </div>

        <div className="grid-100">
          <h5 id="strings">Parse string</h5>
        </div>
        <div className="grid-50">
          <pre>
            <code className="language-javascript">
              readString(csvString
              <i>
                [, <a href="#config">config</a>]
              </i>
              )
            </code>
          </pre>
          <span
            style={{ float: 'right', marginBottom: 14, textAlignLast: 'end' }}
          >
            <a href="https://github.com/Bunlong/react-papaparse/blob/v4.0.0/examples/readString.tsx">
              Source code
            </a>
          </span>
        </div>
        <div className="grid-50">
          <ul>
            <li>
              <code>csvString</code> is a string of delimited text to be parsed.
            </li>
            <li>
              <code>config</code> is an {' '}
              <a href="#config">config object</a>.
            </li>
            <li>
              Returns a <a href="#results">parse results</a> object in <code>complete</code> of config object (if not
              streaming or using worker).
            </li>
          </ul>
        </div>

        <div className="clear" />

        <div className="grid-100">
          <h5 id="local-files">Parse local files</h5>
        </div>
        <div className="grid-100">
          <p id="basic-upload" style={{ fontSize: 20 }}>
            Basic Upload
          </p>
        </div>
        <div className="grid-50">
          <pre>
            <code className="language-javascript">
              {`<CSVReader
  onUploadAccepted={(results) => {
    console.log('---------------------------');
    console.log(results);
    console.log('---------------------------');
  }}
>
  {({
    getRootProps,
    acceptedFile,
    ProgressBar,
    getRemoveFileProps,
  }) => (
    <>
      <div style={styles.csvReader}>
        <button type='button' {...getRootProps()} style={styles.browseFile}>
          Browse file
        </button>
        <div style={styles.acceptedFile}>
          {acceptedFile && acceptedFile.name}
        </div>
        <button {...getRemoveFileProps()} style={styles.remove}>
          Remove
        </button>
      </div>
      <ProgressBar style={styles.progressBarBackgroundColor} />
    </>
  )}
</CSVReader>`}
            </code>
          </pre>
          <span
            style={{ float: 'right', marginBottom: 14, textAlignLast: 'end' }}
          >
            <a href="https://github.com/Bunlong/react-papaparse/blob/v4.0.0/examples/CSVReaderBasicUpload.tsx">
              Source code
            </a>
          </span>
        </div>
        <div className="grid-50">
          <ul>
            <li>
              <code>accept</code>is a property to be used to set MIME type for
              CSV. Default is{' '}
              <code>'text/csv, .csv, application/vnd.ms-excel'</code>.
            </li>
            <li>
              <code>onUploadAccepted</code> is the function to be called passing
              uploaded results.
            </li>
            <li>
              <code>noClick</code> If true, disables click to open the native
              file selection dialog.
            </li>
            <li>
              <code>config</code> is a <a href="#config">config object</a> which
              contains a callback.
            </li>
          </ul>
        </div>

        <div className="clear" />

        <div className="grid-100">
          <p id="click-and-drag-upload" style={{ fontSize: 20, marginTop: 50 }}>
            Click and Drag Upload
          </p>
        </div>
        <div className="grid-50">
          <pre>
            <code className="language-javascript">
              {`<CSVReader
  onUploadAccepted={(results) => {
    console.log('---------------------------');
    console.log(results);
    console.log('---------------------------');
    setZoneHover(false);
  }}
  onDragOver={(event: DragEvent) => {
    event.preventDefault();
    setZoneHover(true);
  }}
  onDragLeave={(event: DragEvent) => {
    event.preventDefault();
    setZoneHover(false);
  }}
>
  {({
    getRootProps,
    acceptedFile,
    ProgressBar,
    getRemoveFileProps,
    Remove,
  }) => (
    <>
      <div
        {...getRootProps()}
        style={Object.assign(
          {},
          styles.zone,
          zoneHover && styles.zoneHover
        )}
      >
        {acceptedFile ? (
          <>
            <div style={styles.file}>
              <div style={styles.info}>
                <span style={styles.size}>
                  {formatFileSize(acceptedFile.size)}
                </span>
                <span style={styles.name}>{acceptedFile.name}</span>
              </div>
              <div style={styles.progressBar}>
                <ProgressBar />
              </div>
              <div
                {...getRemoveFileProps()}
                style={styles.remove}
                onMouseOver={(event) => {
                  event.preventDefault();
                  setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                }}
                onMouseOut={(event) => {
                  event.preventDefault();
                  setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                }}
              >
                <Remove color={removeHoverColor} />
              </div>
            </div>
          </>
        ) : (
          'Drop CSV file here or click to upload'
        )}
      </div>
    </>
  )}
</CSVReader>`}
            </code>
          </pre>
          <span
            style={{ float: 'right', marginBottom: 14, textAlignLast: 'end' }}
          >
            <a href="https://github.com/Bunlong/react-papaparse/blob/v4.0.0/examples/CSVReaderClickAndDragUpload.tsx">
              Source code
            </a>
          </span>
        </div>
        <div className="grid-50">
          <ul>
            <li>
              <code>accept</code>is a property to be used to set MIME type for
              CSV. Default is{' '}
              <code>'text/csv, .csv, application/vnd.ms-excel'</code>.
            </li>
            <li>
              <code>onUploadAccepted</code> is the function to be called passing uploaded results.
            </li>
            <li>
              <code>config</code> is a <a href="#config">config object</a> which
              contains a callback.
            </li>
          </ul>
        </div>

        <div className="clear" />

        <div className="grid-100">
          <p id="drag-no-click-upload" style={{ fontSize: 20, marginTop: 50 }}>
            Drag ( No Click ) Upload
          </p>
        </div>
        <div className="grid-50">
          <pre>
            <code className="language-javascript">
              {`<CSVReader
  onUploadAccepted={(results) => {
    console.log('---------------------------');
    console.log(results);
    console.log('---------------------------');
    setZoneHover(false);
  }}
  onDragOver={(event: DragEvent) => {
    event.preventDefault();
    setZoneHover(true);
  }}
  onDragLeave={(event: DragEvent) => {
    event.preventDefault();
    setZoneHover(false);
  }}
  noClick
>
  {({
    getRootProps,
    acceptedFile,
    ProgressBar,
    getRemoveFileProps,
    Remove,
  }) => (
    <>
      <div
        {...getRootProps()}
        style={Object.assign(
          {},
          styles.zone,
          zoneHover && styles.zoneHover
        )}
      >
        {acceptedFile ? (
          <>
            <div style={styles.file}>
              <div style={styles.info}>
                <span style={styles.size}>
                  {formatFileSize(acceptedFile.size)}
                </span>
                <span style={styles.name}>{acceptedFile.name}</span>
              </div>
              <div style={styles.progressBar}>
                <ProgressBar />
              </div>
              <div
                {...getRemoveFileProps()}
                style={styles.remove}
                onMouseOver={(event) => {
                  event.preventDefault();
                  setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                }}
                onMouseOut={(event) => {
                  event.preventDefault();
                  setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                }}
              >
                <Remove color={removeHoverColor} />
              </div>
            </div>
          </>
        ) : (
          'Drop CSV file here to upload'
        )}
      </div>
    </>
  )}
</CSVReader>`}
            </code>
          </pre>
          <span
            style={{ float: 'right', marginBottom: 14, textAlignLast: 'end' }}
          >
            <a href="https://github.com/Bunlong/react-papaparse/blob/v4.0.0/examples/CSVReaderDragNoClickUpload.tsx">
              Source code
            </a>
          </span>
        </div>
        <div className="grid-50">
          <ul>
            <li>
              <code>accept</code>is a property to be used to set MIME type for
              CSV. Default is{' '}
              <code>'text/csv, .csv, application/vnd.ms-excel'</code>.
            </li>
            <li>
              <code>onUploadAccepted</code> is the function to be called passing uploaded results.
            </li>
            <li>
              <code>noClick</code> If true, disables click to open the native
              file selection dialog.
            </li>
            <li>
              <code>config</code> is a <a href="#config">config object</a> which
              contains a callback.
            </li>
          </ul>
        </div>

        <div className="clear" />

        <div className="grid-100">
          <p id="click-no-drag-upload" style={{ fontSize: 20, marginTop: 50 }}>
            Click ( No Drag ) Upload
          </p>
        </div>
        <div className="grid-50">
          <pre>
            <code className="language-javascript">
              {`<CSVReader
  onUploadAccepted={(results) => {
    console.log('---------------------------');
    console.log(results);
    console.log('---------------------------');
    setZoneHover(false);
  }}
  onDragOver={(event: DragEvent) => {
    event.preventDefault();
    setZoneHover(true);
  }}
  onDragLeave={(event: DragEvent) => {
    event.preventDefault();
    setZoneHover(false);
  }}
  noDrag
>
  {({
    getRootProps,
    acceptedFile,
    ProgressBar,
    getRemoveFileProps,
    Remove,
  }) => (
    <>
      <div
        {...getRootProps()}
        style={Object.assign(
          {},
          styles.zone,
          zoneHover && styles.zoneHover
        )}
      >
        {acceptedFile ? (
          <>
            <div style={styles.file}>
              <div style={styles.info}>
                <span style={styles.size}>
                  {formatFileSize(acceptedFile.size)}
                </span>
                <span style={styles.name}>{acceptedFile.name}</span>
              </div>
              <div style={styles.progressBar}>
                <ProgressBar />
              </div>
              <div
                {...getRemoveFileProps()}
                style={styles.remove}
                onMouseOver={(event) => {
                  event.preventDefault();
                  setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                }}
                onMouseOut={(event) => {
                  event.preventDefault();
                  setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                }}
              >
                <Remove color={removeHoverColor} />
              </div>
            </div>
          </>
        ) : (
          'Click to upload'
        )}
      </div>
    </>
  )}
</CSVReader>`}
            </code>
          </pre>
          <span
            style={{ float: 'right', marginBottom: 14, textAlignLast: 'end' }}
          >
            <a href="https://github.com/Bunlong/react-papaparse/blob/v4.0.0/examples/CSVReaderClickNoDragUpload.tsx">
              Source code
            </a>
          </span>
        </div>
        <div className="grid-50">
          <ul>
            <li>
              <code>accept</code>is a property to be used to set MIME type for
              CSV. Default is{' '}
              <code>'text/csv, .csv, application/vnd.ms-excel'</code>.
            </li>
            <li>
              <code>onUploadAccepted</code> is the function to be called passing uploaded results.
            </li>
            <li>
              <code>noDrag</code> If true, disables drag 'n' drop.
            </li>
            <li>
              <code>config</code> is a <a href="#config">config object</a> which
              contains a callback.
            </li>
          </ul>
        </div>

        <div className="clear" />

        <div className="grid-100">
          <h5 id="remote-files">Parse remote file</h5>
        </div>
        <div className="grid-50">
          <pre>
            <code className="language-javascript">
              {`readRemoteFile(url, {
  // rest of config ...
})`}
            </code>
          </pre>
          <span
            style={{ float: 'right', marginBottom: 14, textAlignLast: 'end' }}
          >
            <a href="https://github.com/Bunlong/react-papaparse/blob/v4.0.0/examples/readRemoteFile.tsx">
              Source code
            </a>
          </span>
        </div>
        <div className="grid-50">
          <ul>
            <li>
              <code>url</code> is the path or URL to the file to download.
            </li>
            <li>
              The second argument is a <a href="#config">config object</a>.
            </li>
            <li>
              Doesn't return anything. Results are provided asynchronously to a
              callback function.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CSVToJSON;
