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
    onFileLoad: PropTypes.func,
    onError: PropTypes.func,
    config: PropTypes.object,
    style: PropTypes.object,
    noClick: PropTypes.bool,
    noDrag: PropTypes.bool,
    progressBarColor: PropTypes.string,
  }

  state = {
    dropAreaStyle: styles.dropArea,
    hasFiles: false,
    progressBar: 0,
    displayProgressBarStatus: 'none',
    file: '',
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
    this.setState({file})

    const {
      onDrop,
      onFileLoad,
      onError,
      config = {}
    } = this.props

    const reader = new window.FileReader()

    let options = {}

    if (config.error) {
      delete config['error']
    }

    if (config.step) {
      delete config['step']
    }

    if (config.complete) {
      delete config['complete']
    }

    const size = file.size
    let data = []
    let percent = 0

    if (onDrop || onFileLoad) {
      const self = this
      options = Object.assign({
        complete: () => {
          if (!onDrop) {
            onFileLoad(data)
          } else {
            onDrop(data)
          }
        },
        step: (row, parser) => {
          data.push(row)
          const progress = row.meta.cursor
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

    if (config) {
      options = Object.assign(config, options)
    }

    reader.onload = (e) => {
      PapaParse.parse(e.target.result, options)
    }

    reader.onloadend = (e) => {
      const timeout = setTimeout(() => { this._disableProgressBar() }, 2000)
    }

    reader.readAsText(file, config.encoding || 'utf-8')
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
    return this._childrenIsFunction() ? this.props.children({file: this.state.file}) : this.props.children
  }

  _childrenIsFunction = () => {
    return typeof this.props.children === 'function'
  }

  render() {
    
    const {
      style,
      noClick,
      children,
      progressBarColor,
    } = this.props

    return (
      <>
        <input
          type='file'
          accept='text/csv'
          ref={this.inputFileRef}
          style={styles.inputFile}
          onChange={e => this._handleInputFileChange(e)}
        />
        {
          !this._childrenIsFunction() ? (
            <div
              ref={this.dropAreaRef}
              style={Object.assign({}, style, this.state.dropAreaStyle, noClick ? styles.defaultCursor : styles.pointerCursor)}
              onClick={noClick ? () => {} : this.open}
            >
              {
                this.state.hasFiles ? (
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
                  children
                )
              }
            </div>
          ) : (
            <div ref={this.dropAreaRef}>
              {this.renderChildren()}
              <div style={Object.assign({}, styles.progressBar, {position: 'inherit', width: '100%'})}>
                <span
                  style={
                    Object.assign(
                      {},
                      styles.progressBarFill,
                      {backgroundColor: progressBarColor || '#659cef'},
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
          )
        }
      </>
    )
  }
}

const styles = {
  dropArea: {
    border: '2px dashed #ccc',
    borderRadius: 20,
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
