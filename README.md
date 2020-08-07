<p align="center">
  ⭐️ If you like react-papaparse, give it a star! ⭐️
</p>

# react-papaparse

react-papaparse is the fastest in-browser CSV (or delimited text) parser for React. It is full of useful features such as CSVReader, readString, jsonToCSV, readRemoteFile, ... etc.

[![NPM](https://img.shields.io/npm/v/react-papaparse.svg)](https://www.npmjs.com/package/react-papaparse) [![downloads](https://img.shields.io/npm/dm/react-papaparse.svg?style=flat-square)](https://www.npmjs.com/package/react-papaparse) ![npm bundle size](https://img.shields.io/bundlephobia/min/react-papaparse) [![Build Status](https://api.travis-ci.com/Bunlong/react-papaparse.svg?branch=master)](https://travis-ci.com/Bunlong/react-papaparse) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 🎁 Features

* Compatible with both JavaScript and TypeScript
* Easy to use
* Parse CSV files directly (local or over the network)
* Fast mode (is really fast)
* Stream large files (even via HTTP)
* Reverse parsing (converts JSON to CSV)
* Auto-detect delimiter
* Worker threads to keep your web page reactive
* Header row support
* Pause, resume, abort
* Can convert numbers and booleans to their types
* One of the only parsers that correctly handles line-breaks and quotations

## 🔧 Install

react-papaparse is available on npm. It can be installed with the following command:

```
npm install react-papaparse --save
```

react-papaparse is available on yarn as well. It can be installed with the following command:

```
yarn add react-papaparse
```

## 📖 Demo & Documentation

* [Demo](https://react-papaparse.github.io/demo)

To learn how to use react-papaparse:

* [Documentation](https://react-papaparse.github.io/docs)

Wiki:

* [How to customize CSVReader (Drag to upload) style?](https://github.com/Bunlong/react-papaparse/wiki/CSVReader-(Drag-to-Upload)-Style)

## 📚 Useful Features

* [CSVReader](https://react-papaparse.github.io/docs#local-files) – React component that handles csv files input and returns its content as array.
* [readString](https://react-papaparse.github.io/docs#strings) – The function that read CSV comma separated string and returns its content as array.
* [readRemoteFile](https://react-papaparse.github.io/docs#remote-files) – The function that read remote CSV files and returns its content as array.
* [jsonToCSV](https://react-papaparse.github.io/docs#json-to-csv) – The function that read an array of object (json) and returns its content as CSV comma separated string.

## 💡 Usage

### 🎀 CSVReader

#### Basic Upload

![basic-upload](https://react-papaparse.github.io/static/images/csvreader1.png)

```javascript
import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef()

export default class CSVReader extends Component {
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point 
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }
  
  handleOnFileLoad = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  render() {
    return (
      <CSVReader
        ref={buttonRef}
        onFileLoad={this.handleOnFileLoad}
        onError={this.handleOnError}
        noClick
        noDrag
        onRemoveFile={this.handleOnRemoveFile}
      >
        {({ file }) => (
          <aside
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10
            }}
          >
            <button
              type='button'
              onClick={this.handleOpenDialog}
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                width: '40%',
                paddingLeft: 0,
                paddingRight: 0
              }}
            >
              Browe file
            </button>
            <div
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ccc',
                height: 45,
                lineHeight: 2.5,
                marginTop: 5,
                marginBottom: 5,
                paddingLeft: 13,
                paddingTop: 3,
                width: '60%'
              }}
            >
              {file && file.name}
            </div>
            <button
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 20,
                paddingRight: 20
              }}
              onClick={this.handleRemoveFile}
            >
              Remove
            </button>
          </aside>
        )}
      </CSVReader>
    )
  }
}
```

#### Click and Drag Upload

![click-and-drag-upload](https://react-papaparse.github.io/static/images/csvreader2.png)

```javascript
import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

export default class CSVReader extends Component {
  handleOnDrop = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  render() {
    return (
      <CSVReader
        onDrop={this.handleOnDrop}
        onError={this.handleOnError}
        addRemoveButton
        removeButtonColor='#659cef'
        onRemoveFile={this.handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
    )
  }
}
```

#### Drag ( No Click ) Upload

![drag-no-click-upload](https://react-papaparse.github.io/static/images/csvreader3.png)

```javascript
import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

export default class CSVReader extends Component {
  handleOnDrop = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  render() {
    return (
      <CSVReader
        onDrop={this.handleOnDrop}
        onError={this.handleOnError}
        noClick
        addRemoveButton
        onRemoveFile={this.handleOnRemoveFile}
      >
        <span>Drop CSV file here to upload.</span>
      </CSVReader>
    )
  }
}
```

#### Click ( No Drag ) Upload

![click-no-drag-upload](https://react-papaparse.github.io/static/images/csvreader4.png)

```javascript
import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

export default class CSVReader extends Component {
  handleOnDrop = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  render() {
    return (
      <CSVReader
        onDrop={this.handleOnDrop}
        onError={this.handleOnError}
        noDrag
        addRemoveButton
        onRemoveFile={this.handleOnRemoveFile}
      >
        <span>Click to upload.</span>
      </CSVReader>
    )
  }
}
```

### 🎀 readString

```javascript
import { readString } from 'react-papaparse'

const str = `Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`

const results = readString(str)
```

### 🎀 readRemoteFile

```javascript
import { readRemoteFile } from 'react-papaparse'

readRemoteFile(
  url,
  {
    complete: (results) => {
      console.log('Results:', results)
    }
  }
)
```

### 🎀 jsonToCSV

```javascript
import { jsonToCSV } from 'react-papaparse'

const jsonData = `[
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

const results = jsonToCSV(jsonData)
```

#### Header row support

If you tell react-papaparse there is a header row, each row will be organized by field name instead of index.

```javascript
const results = readString(csvString {
  header: true
})
```

#### Stream

That's what streaming is for. Specify a step callback to receive the results row-by-row. This way, you won't load the whole file into memory and crash the browser.

```javascript
readRemoteFile('http://example.com/big.csv', {
  step: (row) => {
    console.log('Row:', row.data)
  },
  complete: () => {
    console.log('All done!')
  }
})
```

## 👨‍👩‍👦 Family

You might be interested in:

* [React Patterns](https://github.com/reactpatterns/reactpatterns) – React patterns & techniques to use in development for React Developer.
* [react-webspeech](https://github.com/Bunlong/react-webspeech) – The official WebSpeech for React.
* [react-barcodes](https://github.com/Bunlong/react-barcodes) – React hooks for generating barcodes.
* [react-qrcodes](https://github.com/Bunlong/react-qrcodes) – React hooks for generating qrcodes.

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

## ✨ Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Bunlong">
        <img src="https://avatars0.githubusercontent.com/u/1308397?s=400&u=945dc6b97571e2b98b659d34b1c81ae2514046bf&v=4" width="100" alt="Bunlong" />
        <br />
        <sub>
          <b>Bunlong</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/timtutt">
        <img src="https://avatars0.githubusercontent.com/u/1517492?s=400&u=5aa483a9df5cdeb0824dd9db92348dbda483df22&v=4" width="100" alt="Tim Tutt" />
        <br />
        <sub>
          <b>Tim Tutt</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/pkuppens">
        <img src="https://avatars2.githubusercontent.com/u/8671392?s=460&u=fe33bd06c7fd8bb7637a7dbe9681932b065f29f6&v=4" width="100" alt="Pieter Kuppens" />
        <br />
        <sub>
          <b>Pieter Kuppens</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/bugzpodder">
        <img src="https://avatars1.githubusercontent.com/u/14841421?s=460&u=9e9735544217bc05e7ac7f94c398d98924089fb1&v=4" width="100" alt="Jack Zhao" />
        <br />
        <sub>
          <b>Jack Zhao</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/pablo-menichini">
        <img src="https://avatars3.githubusercontent.com/u/52842336?s=460&v=4" width="100" alt="Pablo Mnichini" />
        <br />
        <sub>
          <b>Pablo Mnichini</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/mysticaltech">
        <img src="https://avatars0.githubusercontent.com/u/518555?s=400&u=0537eaf44c5fe646aa0831d88d726c10ccdc317f&v=4" width="100" alt="Mystical Tech" />
        <br />
        <sub>
          <b>Mystical Tech</b>
        </sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/takebo">
        <img src="https://avatars1.githubusercontent.com/u/5289210?s=400&u=0d0abca823b6e45d07eb521bcdfad5287b9cfb3e&v=4" width="100" alt="Bruno" />
        <br />
        <sub>
          <b>Bruno</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/samuelhulla">
        <img src="https://avatars0.githubusercontent.com/u/17268815?s=400&u=dbfc4d951f2df4a202ec037794b6e3dfa1bac88e&v=4" width="100" alt="Samuel Hulla" />
        <br />
        <sub>
          <b>Samuel Hulla</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/glinkot">
        <img src="https://avatars0.githubusercontent.com/u/13640691?s=400&v=4" width="100" alt="glinkot" />
        <br />
        <sub>
          <b>glinkot</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/pleavitt">
        <img src="https://avatars2.githubusercontent.com/u/33077532?s=400&u=ecfdf7ac6e89d66329fb409b7b0c5c3c2e7494ca&v=4" width="100" alt="Paul Leavitt" />
        <br />
        <sub>
          <b>Paul Leavitt</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/gtupak">
        <img src="https://avatars2.githubusercontent.com/u/5834876?s=400&u=8c38f633c231b53f58d8f4d091994cf9ec98f594&v=4" width="100" alt="Gabriel" />
        <br />
        <sub>
          <b>Gabriel</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/sakkie6yster">
        <img src="https://avatars0.githubusercontent.com/u/20445565?s=400&u=9db346c3217e36514bda7af2cd66a08146608757&v=4" width="100" alt="Izaak" />
        <br />
        <sub>
          <b>Izaak</b>
        </sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/Olovorr">
        <img src="https://avatars0.githubusercontent.com/u/15366622?s=400&u=deb7491f406673d6dffbf7f2d16554b5155c08ab&v=4" width="100" alt="Oliver" />
        <br />
        <sub>
          <b>Oliver</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## ⚖️ License

The MIT License [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<!-- https://github.com/siddharthkp/bundlesize -->
