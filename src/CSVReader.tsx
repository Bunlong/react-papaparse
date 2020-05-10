import React, { CSSProperties } from 'react';
import PapaParse from 'papaparse';
import getSize from './util';
import RemoveIcon from './RemoveIcon';
import ProgressBar from './ProgressBar';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const RED = '#A01919';
const RED_LIGHT = '#DD2222';

const styles = {
  dropArea: {
    alignItems: 'center',
    borderColor: GREY,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  } as CSSProperties,
  inputFile: {
    display: 'none',
  } as CSSProperties,
  highlight: {
    borderColor: 'purple',
  },
  unhighlight: {
    borderColor: GREY,
  } as CSSProperties,
  dropFile: {
    background: 'linear-gradient(to bottom, #eee, #ddd)',
    borderRadius: 20,
    display: 'block',
    height: 120,
    width: 100,
    paddingLeft: 10,
    paddingRight: 10,
    position: 'relative',
    zIndex: 10,
  } as CSSProperties,
  column: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  } as CSSProperties,
  fileSizeInfo: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    lineHeight: 1,
    marginBottom: '0.5em',
    padding: '0 0.4em',
  } as CSSProperties,
  fileNameInfo: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 14,
    lineHeight: 1,
    padding: '0 0.4em',
  } as CSSProperties,
  defaultCursor: {
    cursor: 'default',
  } as CSSProperties,
  pointerCursor: {
    cursor: 'pointer',
  } as CSSProperties,
  dropFileRemoveButton: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  } as CSSProperties,
};

interface Props {
  children: any;
  onDrop?: (data: any, file?: any) => void;
  onFileLoad?: (data: any, file?: any) => void;
  onError?: (err: any, file: any, inputElem: any, reason: any) => void;
  config?: any;
  style?: any;
  noClick?: boolean;
  noDrag?: boolean;
  progressBarColor?: string;
  addRemoveButton?: boolean;
  onRemoveFile?: (data: any) => void;
}

interface State {
  dropAreaStyle: any;
  progressBar: number;
  displayProgressBarStatus: string;
  file: any;
  timeout: any;
  files: any;
  removeIconColor: string;
  isCanceled: boolean;
}

export default class CSVReader extends React.Component<Props, State> {
  // inputFileRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>()
  inputFileRef: any = React.createRef<HTMLDivElement>();
  dropAreaRef: any = React.createRef<HTMLDivElement>();
  fileSizeInfoRef: any = React.createRef<HTMLDivElement>();
  fileNameInfoRef: any = React.createRef<HTMLDivElement>();

  state = {
    dropAreaStyle: styles.dropArea,
    progressBar: 0,
    displayProgressBarStatus: 'none',
    file: null,
    timeout: null,
    files: null,
    removeIconColor: RED,
    isCanceled: false,
  } as State;

  componentDidMount = () => {
    const currentDropAreaRef = this.dropAreaRef.current;

    const fourDragsEvent = ['dragenter', 'dragover', 'dragleave', 'drop'];
    fourDragsEvent.forEach((item) => {
      currentDropAreaRef.addEventListener(item, this.preventDefaults, false);
    });

    if (!this.props.noDrag) {
      const highlightDragsEvent = ['dragenter', 'dragover'];
      highlightDragsEvent.forEach((item) => {
        currentDropAreaRef.addEventListener(item, this.highlight, false);
      });
      currentDropAreaRef.addEventListener('dragleave', this.unhighlight, false);
      currentDropAreaRef.addEventListener('drop', this.unhighlight, false);
      currentDropAreaRef.addEventListener(
        'drop',
        this.visibleProgressBar,
        false,
      );
      currentDropAreaRef.addEventListener('drop', this.handleDrop, false);
    }
  };

  componentWillUnmount = () => {
    const currentDropAreaRef = this.dropAreaRef.current;

    const fourDragsEvent = ['dragenter', 'dragover', 'dragleave', 'drop'];
    fourDragsEvent.forEach((item) => {
      currentDropAreaRef.removeEventListener(item, this.preventDefaults, false);
    });

    if (!this.props.noDrag) {
      const highlightDragsEvent = ['dragenter', 'dragover'];
      highlightDragsEvent.forEach((item) => {
        currentDropAreaRef.removeEventListener(item, this.highlight, false);
      });
      currentDropAreaRef.removeEventListener(
        'dragleave',
        this.unhighlight,
        false,
      );
      currentDropAreaRef.removeEventListener('drop', this.unhighlight, false);
      currentDropAreaRef.removeEventListener(
        'drop',
        this.visibleProgressBar,
        false,
      );
      currentDropAreaRef.removeEventListener('drop', this.handleDrop, false);
    }
  };

  preventDefaults = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  highlight = () => {
    this.setState({
      dropAreaStyle: Object.assign({}, styles.dropArea, styles.highlight),
    });
    this.setState({ progressBar: 0 });
  };

  unhighlight = () => {
    this.setState({
      dropAreaStyle: Object.assign({}, styles.dropArea, styles.unhighlight),
    });
  };

  visibleProgressBar = () => {
    this.setState({ displayProgressBarStatus: 'block' });
  };

  handleDrop = (e: any) => {
    let files = null;
    let isCanceled = false;

    if (e.files === undefined) {
      const dt = e.dataTransfer;
      files = dt.files;
    } else {
      files = e.files;
    }

    if (files.length === 0) {
      files = this.state.files;
      isCanceled = true;
    }

    this.setState({ files, isCanceled }, () => {
      this.handleFiles();
    });
  };

  handleFiles = () => {
    this.setState({ progressBar: 0 });
    let files = null;
    files = [...this.state.files];
    files.forEach(this.uploadFile);
  };

  uploadFile = (file: any) => {
    this.displayFileInfo(file);
    this.setState({ file });

    const { onDrop, onFileLoad, onError, config = {} } = this.props;
    const reader = new window.FileReader();
    let options = {};

    if (config.error) {
      delete config.error;
    }
    if (config.step) {
      delete config.step;
    }
    if (config.complete) {
      delete config.complete;
    }

    const size = file.size;
    const data: any = [];
    let percent = 0;

    if (onDrop || onFileLoad) {
      const self = this;
      options = Object.assign(
        {
          complete: () => {
            if (!onDrop && onFileLoad) {
              onFileLoad(data, file);
            } else if (onDrop && !onFileLoad) {
              onDrop(data, file);
            }
          },
          step: (row: any) => {
            data.push(row);
            if (config && config.preview) {
              percent = Math.round((data.length / config.preview) * 100);
              self.setState({ progressBar: percent });
              if (data.length === config.preview) {
                if (!onDrop && onFileLoad) {
                  onFileLoad(data, file);
                } else if (onDrop && !onFileLoad) {
                  onDrop(data, file);
                }
              }
            } else {
              const progress = row.meta.cursor;
              const newPercent = Math.round((progress / size) * 100);
              if (newPercent === percent) {
                return;
              }
              percent = newPercent;
            }
            self.setState({ progressBar: percent });
          },
        },
        options,
      );
    }

    if (onError) {
      options = Object.assign({ error: onError }, options);
    }
    if (config) {
      options = Object.assign(config, options);
    }

    reader.onload = (e: any) => {
      PapaParse.parse(e.target.result, options);
    };

    reader.onloadend = () => {
      clearTimeout(this.state.timeout);
      this.setState({
        timeout: setTimeout(() => {
          this.disableProgressBar();
        }, 2000),
      });
    };

    reader.readAsText(file, config.encoding || 'utf-8');
  };

  displayFileInfo = (file: any) => {
    if (!this.childrenIsFunction()) {
      this.fileSizeInfoRef.current.innerHTML = getSize(file.size);
      this.fileNameInfoRef.current.innerHTML = file.name;
    }
  };

  disableProgressBar = () => {
    this.setState({ displayProgressBarStatus: 'none' });
  };

  childrenIsFunction = () => {
    return typeof this.props.children === 'function';
  };

  fileChange = (e: any) => {
    const { target } = e;
    this.setState({ displayProgressBarStatus: 'block' }, () => {
      this.handleDrop(target);
    });
  };

  open = (e: any) => {
    const { displayProgressBarStatus } = this.state;
    if (e && displayProgressBarStatus === 'none') {
      this.preventDefaults(e);
      this.inputFileRef.current.value = null;
      this.inputFileRef.current.click();
    }
  };

  renderChildren = () => {
    return this.childrenIsFunction()
      ? this.props.children({ file: this.state.file })
      : this.props.children;
  };

  removeFile = (e: any) => {
    if (e) {
      e.stopPropagation();
      this.setState({ files: null, file: null });

      const { onRemoveFile } = this.props;
      if (onRemoveFile) {
        onRemoveFile(null);
      }

      this.inputFileRef.current.value = null;
    }
  };

  changeRemoveIconColor = (color: string) => {
    if (color) {
      this.setState({ removeIconColor: color });
    }
  };

  renderDropFileRemoveButton = () => {
    const { addRemoveButton } = this.props;
    const { removeIconColor, displayProgressBarStatus } = this.state;

    if (addRemoveButton && displayProgressBarStatus === 'none') {
      return (
        <div
          style={styles.dropFileRemoveButton}
          onClick={(e) => this.removeFile(e)}
          onMouseOver={() => this.changeRemoveIconColor(RED_LIGHT)}
          onMouseOut={() => this.changeRemoveIconColor(RED)}
        >
          <RemoveIcon color={removeIconColor} />
        </div>
      );
    }

    if (addRemoveButton) {
      return (
        <div style={styles.dropFileRemoveButton}>
          <RemoveIcon color={RED} />
        </div>
      );
    }

    return <></>;
  };

  render() {
    const { style, noClick, children, progressBarColor } = this.props;
    const {
      dropAreaStyle,
      files,
      isCanceled,
      progressBar,
      displayProgressBarStatus,
    } = this.state;

    return (
      <>
        <input
          type="file"
          accept="text/csv"
          ref={this.inputFileRef}
          style={styles.inputFile}
          onChange={(e) => this.fileChange(e)}
        />
        {!this.childrenIsFunction() ? (
          <div
            ref={this.dropAreaRef}
            style={Object.assign(
              {},
              style,
              dropAreaStyle,
              noClick !== undefined || displayProgressBarStatus === 'block'
                ? styles.defaultCursor
                : styles.pointerCursor,
            )}
            onClick={(e) => {
              if (!noClick) {
                this.open(e);
              }
            }}
          >
            {files && files.length > 0 ? (
              <div style={Object.assign({}, styles.dropFile, styles.column)}>
                {this.renderDropFileRemoveButton()}
                <div style={styles.column}>
                  <span
                    style={styles.fileSizeInfo}
                    ref={this.fileSizeInfoRef}
                  />
                  <span
                    style={styles.fileNameInfo}
                    ref={this.fileNameInfoRef}
                  />
                </div>
                {files && files.length > 0 && !isCanceled && (
                  <ProgressBar
                    progressBarColor={progressBarColor || ''}
                    progressBar={progressBar}
                    displayProgressBarStatus={displayProgressBarStatus}
                  />
                )}
              </div>
            ) : (
              children
            )}
          </div>
        ) : (
          <div ref={this.dropAreaRef}>
            {this.renderChildren()}
            {files && files.length > 0 && !isCanceled && (
              <ProgressBar
                progressBarColor={progressBarColor || ''}
                progressBar={progressBar}
                displayProgressBarStatus={displayProgressBarStatus}
                isButtonProgressBar
              />
            )}
          </div>
        )}
      </>
    );
  }
}
