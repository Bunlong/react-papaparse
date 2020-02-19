import React, { Component } from 'react'

import PropTypes from 'prop-types'
import PapaParse from 'papaparse'

export default class CSVReaderDraft extends Component {

  static propTypes = {
    onFileLoaded: PropTypes.func,
    onError: PropTypes.func,
    inputRef: PropTypes.object,
    configOptions: PropTypes.object,
    style: PropTypes.object
  }

  dropAreaRef = React.createRef()
  fileNameRef = React.createRef()
  uploadProgress = []

  state = {
    dropAreaStyle: styles.dropArea,
    progressBar: 0
  }

  componentDidMount = () => {
    const dropAreaRefDom = this.dropAreaRef.current

    const fourDrags = ['dragenter', 'dragover', 'dragleave', 'drop']
    fourDrags.forEach(item => {
      dropAreaRefDom.addEventListener(item, this.preventDefaults, false)
    })

    const highlightDrags = ['dragenter', 'dragover']
    highlightDrags.forEach(item => {
      dropAreaRefDom.addEventListener(item, this.highlight, false)
    })

    const unhighlightDrags = ['dragleave', 'drop']
    unhighlightDrags.forEach(item => {
      dropAreaRefDom.addEventListener(item, this.unhighlight, false)
    })

    dropAreaRefDom.addEventListener('drop', this.handleDrop, false)
  }

  preventDefaults = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  highlight = (e) => {
    this.setState({dropAreaStyle: Object.assign({}, styles.dropArea, styles.highlight)})
  }

  unhighlight = (e) => {
    this.setState({dropAreaStyle: Object.assign({}, styles.dropArea, styles.unhighlight)})
  }

  handleDrop = (e) => {
    let files = {}
    if (e.target.files === undefined) {
      const dt = e.dataTransfer
      files = dt.files
    } else {
      files = e.target.files
    }
    this.handleFiles(files)
  }

  handleFiles = (files) => {
    files = [...files]
    this.initializeProgress(files.length)
    files.forEach(this.uploadFile)
    files.forEach(this.previewFile)
  }

  previewFile = (file) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      console.log(this.fileNameRef.current)
      this.fileNameRef.current.innerHTML = file.name + ' - ' + file.size

      console.log(file)
    }
  }

  initializeProgress = (numFiles) => {
    this.setState({progressBar: 0})
    this.uploadProgress = []

    for(let i = numFiles; i > 0; i--) {
      this.uploadProgress.push(0)
    }
  }

  updateProgress = (fileNumber, percent) => {
    this.uploadProgress[fileNumber] = percent
    let total = this.uploadProgress.reduce((tot, curr) => tot + curr, 0) / this.uploadProgress.length
    this.setState({progressBar: total})
  }

  uploadFile = (file, index) => {
    const {
      onFileLoaded,
      onError,
      configOptions = {}
    } = this.props

    const reader = new window.FileReader()

    let options = {}

    if (configOptions.error) {
      delete configOptions['error']
    }

    if (configOptions.step) {
      delete configOptions['step']
    }

    if (configOptions.complete) {
      delete configOptions['complete']
    }

    if (onFileLoaded) {
      options = Object.assign({complete: function (results) {
        onFileLoaded(results)
      }}, options)
    }

    if (onError) {
      options = Object.assign({error: onError}, options)
    }

    if (configOptions) {
      options = Object.assign(configOptions, options)
    }

    reader.onprogress = (e) => {
      this.updateProgress(index, (e.loaded * 100.0 / e.total) || 100)
    }

    reader.onload = (e) => {
      PapaParse.parse(e.target.result, options)
    }

    reader.readAsText(file, configOptions.encoding || 'utf-8')
  }

  handleClick = () => {
    this.props.inputRef.current.click()
  }

  render() {
    const {
      label,
      inputRef,
    } = this.props
    
    return (
      <div style={this.state.dropAreaStyle} ref={this.dropAreaRef} onClick={this.handleClick}>
        <p>{label}</p>
        <input
          type='file'
          accept='text/csv'
          ref={inputRef}
          style={styles.inputFile}
          onChange={e => this.handleDrop(e)}
        />
        <div style={styles.dropFile}>
          <div ref={this.fileNameRef}></div>
          <div style={styles.progressBar}>
            <span style={Object.assign({}, styles.progressBarFill, {width: `${this.state.progressBar}%`})}></span>
          </div>
        </div>
      </div>
    )
  }
}

let styles = {
  dropArea: {
    border: '2px dashed #ccc',
    borderRadius: 20,
    width: '100%',
    margin: '50 auto',
    padding: 20,
    cursor: 'pointer',
  },
  inputFile: {
    display: 'none',
  },
  highlight: {
    borderColor: 'purple',
  },
  unhighlight: {
    borderColor: '#ccc',
  },
  dropFile: {
    borderRadius: 20,
    background: 'linear-gradient(to bottom, #eee, #ddd)',
    width: 120,
    height: 120,
    position: 'relative',
    display: 'block',
    zIndex: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, .2)',
  },
  progressBarFill: {
    display: 'block',
    height: 17,
    backgroundColor: '#659cef',
    borderRadius: 3,
    transition: 'width 500ms ease-in-out',
  }
}
