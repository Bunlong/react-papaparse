import React, { Component } from 'react'
import { CSVDownloader } from 'react-papaparse'

export default class CSVDownloader2 extends Component {
  render() {
    return (
      <CSVDownloader
        data={`Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`}
        filename={'filename'}
        type={'link'}
      >
        Download
      </CSVDownloader>
    )
  }
}
