import React, { Component } from 'react'

import PropTypes from 'prop-types'
import PapaParse from 'papaparse'

import getSize from './util'

export default class CSVReaderRewrite extends Component {

  inputFileRef = React.createRef()
  dropAreaRef = React.createRef()
  fileSizeInfoRef = React.createRef()
  fileNameInfoRef = React.createRef()
  progressBarFillRef = React.createRef()

  static propTypes = {
    children: PropTypes.any.isRequired,
    onDrop: PropTypes.func,
    onError: PropTypes.func,
    configOptions: PropTypes.object,
    style: PropTypes.object,
    noClick: PropTypes.bool,
    noDrag: PropTypes.bool,
  }

  state = {
    dropAreaStyle: styles.dropArea,
    hasFiles: false,
    progressBar: 0,
    displayProgressBarStatus: 'none',
  }

  componentDidMount = () => {
    const currentDropAreaRef = this.dropAreaRef.current

    const fourDragsEvent = ['dragenter', 'dragover', 'dragleave', 'drop']
    fourDragsEvent.forEach(item => {
      currentDropAreaRef.addEventListener(item, this._preventDefaults, false)
    })

    if (!this.props.noDrag) {
      const highlightDragsEvent = ['dragenter', 'dragover']
      highlightDragsEvent.forEach(item => {
        currentDropAreaRef.addEventListener(item, this._highlight, false)
      })

      currentDropAreaRef.addEventListener('dragleave', this._unhighlight, false)
      currentDropAreaRef.addEventListener('drop', this._unhighlight, false)
      currentDropAreaRef.addEventListener('drop', this._visibleProgressBar, false)
      currentDropAreaRef.addEventListener('drop', this._handleDrop, false)
    }
  }

  _preventDefaults = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  _highlight = (e) => {
    this.setState({dropAreaStyle: Object.assign({}, styles.dropArea, styles.highlight)})
    this._initializeProgress()
  }

  _unhighlight = (e) => {
    this.setState({dropAreaStyle: Object.assign({}, styles.dropArea, styles.unhighlight)})
  }

  _visibleProgressBar = () => {
    this.setState({displayProgressBarStatus: 'block'})
  }

  _handleDrop = (e) => {
    let files = {}
    if (e.files === undefined) {
      const dt = e.dataTransfer
      files = dt.files
    } else {
      files = e.files
    }
    this.setState({hasFiles: true}, () => {this._handleFiles(files)})
  }

  _handleFiles = (files) => {
    this.setState({progressBar: 0})
    files = [...files]
    files.forEach(this._uploadFile)
  }

  _updateProgress = (percent) => {
    this.setState({progressBar: percent})
  }

  _disableProgressBar = () => {
    this.setState({displayProgressBarStatus: 'none'})
  }

  _uploadFile = (file, index) => {
    this._displayFileInfo(file)

    const {
      onDrop,
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

    const size = file.size
    let percent = 0
    let data = []

    if (onDrop) {
      const self = this
      options = Object.assign({
        complete: () => {
          onDrop(data)
        },
        step: row => {
          data.push(row)
          const progress = row.meta.cursor;
          const newPercent = Math.round(progress / size * 100)
          if (newPercent === percent) return
          percent = newPercent
          self._updateProgress(percent)
        },
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
      const timeout = setTimeout(() => { this._disableProgressBar() }, 2000)
    }

    reader.readAsText(file, configOptions.encoding || 'utf-8')
  }

  _displayFileInfo = (file) => {
    if (!this._childrenIsFunction()) {
      this.fileSizeInfoRef.current.innerHTML = getSize(file.size)
      this.fileNameInfoRef.current.innerHTML = file.name
    }
  }

  _handleInputFileChange = (e) => {
    const { target } = e
    this.setState({displayProgressBarStatus: 'block'}, () => {this._handleDrop(target)})
  }

  _initializeProgress = () => {
    this.setState({progressBar: 0})
  }

  open = (e) => {
    if (e) {
      e.stopPropagation();
      this.inputFileRef.current.click()
    }
  }

  renderChildren = () => {
    const {children} = this.props
    return this._childrenIsFunction() ? children({ file: 'file', onClick: this.onClick }) : children
  }

  _childrenIsFunction = () => {
    const {children} = this.props
    return typeof children === 'function'
  }

  render() {
    const {
      style,
      noClick,
    } = this.props

    return (
      <div
        ref={this.dropAreaRef}
        style={Object.assign({}, this.state.dropAreaStyle, noClick ? styles.defaultCursor : styles.pointerCursor)}
        onClick={noClick ? () => {} : this.open}
      >
        <input
          type='file'
          accept='text/csv'
          ref={this.inputFileRef}
          style={styles.inputFile}
          onChange={e => this._handleInputFileChange(e)}
        />

        {
          this.state.hasFiles && !this._childrenIsFunction() ? (
            <div style={Object.assign({}, styles.dropFile, styles.column)}>
              <div style={styles.column}>
                <span style={styles.fileSizeInfo} ref={this.fileSizeInfoRef} />
                <span style={styles.fileNameInfo} ref={this.fileNameInfoRef} />
              </div>
              <div style={styles.progressBar}>
                <span 
                  style={
                    Object.assign(
                      {},
                      styles.progressBarFill,
                      {
                        width: `${this.state.progressBar}%`,
                        display: this.state.displayProgressBarStatus
                      }
                    )
                  }
                  ref={this.progressBarFillRef}
                />
              </div>
            </div>
          ) : (
            this.renderChildren()
          )
        }
      </div>
    )
  }
}

const styles = {
  dropArea: {
    border: '2px dashed #ccc',
    borderRadius: 20,
    width: '100%',
    height: '100%',
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
    width: 100,
    height: 120,
    position: 'relative',
    display: 'block',
    zIndex: 10,
    paddingLeft: 10,
    paddingRight: 10,
    position: 'relative',
  },
  column: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  progressBar: {
    width: '80%',
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, .2)',
    bottom: 0,
    position: 'absolute',
    bottom: 14,
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#659cef',
    borderRadius: 3,
    transition: 'width 500ms ease-in-out',
  },
  fileSizeInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: '0 0.4em',
    borderRadius: 3,
    lineHeight: 1,
    marginBottom: '0.5em',
  },
  fileNameInfo: {
    fontSize: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: '0 0.4em',
    borderRadius: 3,
    lineHeight: 1,
  },
  defaultCursor: {
    cursor: 'default',
  },
  pointerCursor: {
    cursor: 'pointer',
  },
}
