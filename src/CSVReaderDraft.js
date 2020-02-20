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
  fileInfoRef = React.createRef()
  progressBarRefFill = React.createRef()

  state = {
    dropAreaStyle: styles.dropArea,
    progressBar: 0,
    progressBarStatus: 'none'
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

    // const unhighlightDrags = ['dragleave', 'drop']
    // unhighlightDrags.forEach(item => {
    //   dropAreaRefDom.addEventListener(item, this.unhighlight, false)
    // })

    dropAreaRefDom.addEventListener('drop', this.unhighlight, false)

    dropAreaRefDom.addEventListener('drop', this.handleDrop, false)
  }

  preventDefaults = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  highlight = (e) => {
    this.setState({dropAreaStyle: Object.assign({}, styles.dropArea, styles.highlight)})
    this.initializeProgress()
  }

  unhighlight = (e) => {
    this.setState({progressBarStatus: 'block'})
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
    console.log(this.state.progressBar)
  }

  handleFiles = (files) => {
    files = [...files]
    this.setState({progressBar: 0})
    files.forEach(this.uploadFile)
  }

  initializeProgress = () => {
    this.setState({progressBar: 0})
  }

  updateProgress = (percent) => {
    this.setState({progressBar: percent})
  }

  clearProgress = () => {

  }

  uploadFile = (file, index) => {
    this.fileInfoRef.current.innerHTML = file.name + ' - ' + file.size

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

    let size = file.size
    let percent = 0

    if (onFileLoaded) {
      let self = this
      options = Object.assign({
        complete: function (results) {
          onFileLoaded(results)
        },
        step: function (row) {
          let progress = row.meta.cursor;
          let newPercent = Math.round(progress / size * 100);
          if (newPercent === percent) return;
          percent = newPercent;
          self.updateProgress(percent)
        }
      }, options)
    }

    if (onError) {
      options = Object.assign({error: onError}, options)
    }

    if (configOptions) {
      options = Object.assign(configOptions, options)
    }

    reader.onload = (e) => {
      PapaParse.parse(e.target.result, options)
    }

    reader.onloadend = (e) => {
      this.fileInfoRef.current.innerHTML = file.name + ' - ' + file.size
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
      <div 
        style={this.state.dropAreaStyle}
        ref={this.dropAreaRef}
        onClick={this.handleClick}
      >
        <p>{label}</p>
        <input
          type='file'
          accept='text/csv'
          ref={inputRef}
          style={styles.inputFile}
          onChange={e => this.handleDrop(e)}
        />
        <div style={styles.dropFile}>
          <div ref={this.fileInfoRef} />
          <div style={styles.progressBar}>
            <span 
              style={
                Object.assign(
                  {},
                  styles.progressBarFill,
                  {
                    width: `${this.state.progressBar}%`,
                    display: this.state.progressBarStatus
                  }
                )
              }
              ref={this.progressBarRefFill}
            />
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
    height: 17,
    backgroundColor: '#659cef',
    borderRadius: 3,
    transition: 'width 500ms ease-in-out',
  }
}
