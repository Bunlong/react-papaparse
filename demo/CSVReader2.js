import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';

export default class CSVReader2 extends Component {
  handleOnDrop = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  render() {
    return (
      <>
        <h5>Click and Drag Upload</h5>
        <CSVReader onDrop={this.handleOnDrop} onError={this.handleOnError}>
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
      </>
    );
  }
}
