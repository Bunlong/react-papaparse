import React, { Component } from 'react'

import PropTypes from 'prop-types'
import PapaParse from 'papaparse'

export default class CSVReader extends Component {
  static propTypes = {
    onFileLoaded: PropTypes.func,
    onError: PropTypes.func,
    inputRef: PropTypes.object,
    configOptions: PropTypes.object,
    style: PropTypes.object
  }

  handleChangeFile = (e) => {
    const {
      onFileLoaded,
      onError,
      configOptions = {}
    } = this.props

    const reader = new window.FileReader()
    const filename = e.target.files[0].name

    let options = {}

    if (onFileLoaded) {
      options = Object.assign({complete: function (results) {
        onFileLoaded(results, filename)
      }}, options)
    }

    if (onError) {
      options = Object.assign({error: onError}, options)
    }

    if (configOptions) {
      options = Object.assign(configOptions, options)
    }

    reader.onload = (event) => {
      PapaParse.parse(event.target.result, options)
    }

    reader.readAsText(e.target.files[0], configOptions.encoding || 'utf-8')
  }

  render() {
    const {
      inputRef,
      style
    } = this.props

    return (
      <input
        type='file'
        accept='text/csv'
        ref={inputRef}
        onChange={e => this.handleChangeFile(e)}
        style={style}
      />
    )
  }
}
