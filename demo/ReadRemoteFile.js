import React, { Component } from 'react';
import { readRemoteFile } from 'react-papaparse';

export default class ReadRemoteFile extends Component {
  handleClick = () => {
    readRemoteFile('http://example.com/file.csv', {
      complete: (results) => {
        console.log('Results:', results);
      },
    });
  };

  render() {
    return <button onClick={this.handleClick}>readRemoteFile</button>;
  }
}
