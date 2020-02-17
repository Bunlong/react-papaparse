# react-papaparse

The fastest in-browser CSV (or delimited text) parser for React.

[![NPM](https://img.shields.io/npm/v/react-papaparse.svg)](https://www.npmjs.com/package/react-papaparse) [![downloads](https://img.shields.io/npm/dm/react-papaparse.svg?style=flat-square)](https://www.npmjs.com/package/react-papaparse) [![Build Status](https://travis-ci.com/themodernjavascript/react-papaparse.svg?branch=master)](https://travis-ci.com/themodernjavascript/react-papaparse) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 🎁 Features

* Easy to use
* Fast mode by default
* Stream large files
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
* [jsonToCSV](https://react-papaparse.github.io/docs#json-to-csv)
* [CSVReader](https://react-papaparse.github.io/docs#local-files)

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

### 🎀 CSVReader

```javascript
import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

class App extends Component {
  constructor(props) {
    super(props)
    this.fileInput = React.createRef()
  }

  handleReadCSV = (data) => {
    console.log(data)
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleImportOffer = () => {
    this.fileInput.current.click()
  }

  render() {
    return (
      <>
        <CSVReader
          onFileLoaded={this.handleReadCSV}
          inputRef={this.fileInput}
          style={{display: 'none'}}
          onError={this.handleOnError}
        />
        <button onClick={this.handleImportOffer}>Import</button>
      </>
    )
  }
}

export default App
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
<CSVReader
  inputRef={this.fileInput}
  style={{display: 'none'}}
  onError={this.handleOnError}
  configOptions={{
    header: true,
    step: function(row) { /* Stream */
      console.log("Row:", row.data)
    },
  }}
/>
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
