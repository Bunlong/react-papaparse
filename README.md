# react-papaparse

The fastest in-browser CSV (or delimited text) parser for React.

[![NPM](https://img.shields.io/npm/v/react-papaparse.svg)](https://www.npmjs.com/package/react-papaparse) [![downloads](https://img.shields.io/npm/dm/react-papaparse.svg?style=flat-square)](https://www.npmjs.com/package/react-papaparse) [![Build Status](https://api.travis-ci.com/Bunlong/react-papaparse.svg?branch=master)](https://travis-ci.com/Bunlong/react-papaparse) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 🎁 Features

* Easy to use
* Fast mode (is really fast)
* Parse CSV files directly (local or over the network)
* Stream large files (even via HTTP)
* Reverse parsing (converts JSON to CSV)
* Auto-detect delimiter
* Worker threads to keep your web page reactive
* Header row support
* Pause, resume, abort
* Can convert numbers and booleans to their types
* One of the only parsers that correctly handles line-breaks and quotations
* Integration to get files from `<input type="file">` using `inputRef`

## 🔧 Install

react-papaparse is available on npm. It can be installed with the following command:

```
npm install --save react-papaparse
```

react-papaparse is available on yarn as well. It can be installed with the following command:

```
yarn add react-papaparse
```

## 📖 Homepage & Demo

* [Homepage](https://react-papaparse.github.io)
* [Demo](https://react-papaparse.github.io/demo)

To learn how to use react-papaparse:

* [Documentation](https://react-papaparse.github.io/docs)

## 📚 Functions & Component Document

* [readString](https://react-papaparse.github.io/docs#strings)
* [CSVReader](https://react-papaparse.github.io/docs#local-files)
* [readRemoteFile](https://react-papaparse.github.io/docs#remote-files)
* [jsonToCSV](https://react-papaparse.github.io/docs#json-to-csv)

## 💡 Usage

### 🎀 readString

```javascript
import { readString } from 'react-papaparse'

var str = `Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`

var results = readString(str)
```

### 🎀 CSVReader

#### Basic Upload

![basic-upload](https://github.com/Bunlong/react-papaparse/blob/2.0.3/docs/static/images/csvreader1.png)

```javascript
import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef()

export default class CSVReader extends Component {

  onFileLoad = (data) => {
    console.log('--------------------------------------------------')
    console.log(data)
    console.log('--------------------------------------------------')
  }

  onError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  openDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point 
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  render() {
    return (
      <>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.onFileLoad}
          onError={this.onError}
          noClick
          noDrag
        >
          {({file}) => (
            <>
              <aside style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
                <button
                  type="button"
                  onClick={this.openDialog}
                  style={{
                    width: '40%',
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                >
                  Browe file
                </button>
                <div
                  style={{
                    width: '60%',
                    height: 45,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#ccc',
                    marginTop: 5,
                    marginBottom: 5,
                    paddingLeft: 13,
                    paddingTop: 3,
                    lineHeight: 2.2,
                  }}
                >
                  {file.name}
                </div>
              </aside>
            </>
          )}
        </CSVReader>
      </>
    )
  }
}
```

#### Click and Drag Upload

![basic-upload](https://github.com/Bunlong/react-papaparse/blob/2.0.3/docs/static/images/csvreader2.png)

```javascript
import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

export default class CSVReader extends Component {

  onDrop = (data) => {
    console.log('--------------------------------------------------')
    console.log(data)
    console.log('--------------------------------------------------')
  }

  onError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  render() {
    return (
      <>
        <CSVReader 
          onDrop={this.onDrop}
          onError={this.onError}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
      </>
    )
  }
}
```

### 🎀 readRemoteFile

```javascript
import { readRemoteFile } from 'react-papaparse'

readRemoteFile(
  url,
  {
    complete: function(results) {
      console.log('Results:', results)
    }
  }
)
```

### 🎀 jsonToCSV

```javascript
import { jsonToCSV } from 'react-papaparse'

var jsonData = `[
  {
      "Column 1": "1-1",
      "Column 2": "1-2",
      "Column 3": "1-3",
      "Column 4": "1-4"
  },
  {
      "Column 1": "2-1",
      "Column 2": "2-2",
      "Column 3": "2-3",
      "Column 4": "2-4"
  },
  {
      "Column 1": "3-1",
      "Column 2": "3-2",
      "Column 3": "3-3",
      "Column 4": "3-4"
  },
  {
      "Column 1": 4,
      "Column 2": 5,
      "Column 3": 6,
      "Column 4": 7
  }
]`

var results = jsonToCSV(jsonData)
```

#### Header row support

If you tell react-papaparse there is a header row, each row will be organized by field name instead of index.

```javascript
<CSVReader
  onFileLoaded={this.handleReadCSV}
  inputRef={this.fileInput}
  style={{display: 'none'}}
  onError={this.handleOnError}
  configOptions={{header: true /* Header row support */ }}
/>
```

#### Stream

That's what streaming is for. Specify a step callback to receive the results row-by-row. This way, you won't load the whole file into memory and crash the browser.

```javascript
readRemoteFile('http://example.com/big.csv', {
  step: function(row) {
    console.log('Row:', row.data)
  },
  complete: function() {
    console.log('All done!')
  }
})
```

## 💖 Wrap Up

If you think any of the `react-papaparse` can be improved, please do open a PR with any updates and submit any issues. Also, I will continue to improve this, so you might want to watch/star this repository to revisit.

## 🌟 Contribution

We'd love to have your helping hand on contributions to `react-papaparse` by forking and sending a pull request!

Your contributions are heartily ♡ welcome, recognized and appreciated. (✿◠‿◠)

How to contribute:

- Open pull request with improvements
- Discuss ideas in issues
- Spread the word
- Reach out with any feedback

## ⚖️ License

The MIT License [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
