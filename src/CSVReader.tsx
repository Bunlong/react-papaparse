import React, { CSSProperties } from 'react';
import PapaParse from 'papaparse';
import getSize, { lightenDarkenColor } from './utils';
import RemoveIcon from './RemoveIcon';
import ProgressBar from './ProgressBar';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const REMOVE_ICON_DEFAULT_COLOR = '#A01919';
const GREY_DIM = '#686868';
// 'text/csv' for MacOS
// '.csv' for Linux
// 'application/vnd.ms-excel' for Window 10
const DEFAULT_ACCEPT = 'text/csv, .csv, application/vnd.ms-excel';

const styles = {
  dropArea: {
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: GREY,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  } as CSSProperties,
  dropAreaDefaultBorderColor: {
    borderColor: GREY,
  },
  inputFile: {
    display: 'none',
  } as CSSProperties,
  highlight: {
    borderColor: GREY_DIM,
  },
  unhighlight: {
    borderColor: GREY,
  } as CSSProperties,
  dropFile: {
    background: 'linear-gradient(to bottom, #EEE, #DDD)',
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
  noProgressBar?: boolean;
  removeButtonColor?: string;
  isReset?: boolean;
  accept?: string;
}

interface State {
  dropAreaCustom: any;
  progressBar: number;
  displayProgressBarStatus: string;
  file: any;
  timeout: any;
  files: any;
  removeIconColor: string;
  isCanceled: boolean;
}

export default class CSVReader extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    isReset: false,
  };

  // TODO
  // inputFileRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>()
  inputFileRef: any = React.createRef<HTMLDivElement>();
  dropAreaRef: any = React.createRef<HTMLDivElement>();
  fileSizeInfoRef: any = React.createRef<HTMLDivElement>();
  fileNameInfoRef: any = React.createRef<HTMLDivElement>();

  // TODO: Delete this.props.removeButtonColor
  REMOVE_ICON_COLOR =
    this.props.removeButtonColor ||
    this.props.style?.dropArea?.dropFile?.removeButton?.color ||
    this.props.style?.dropFile?.removeButton?.color ||
    this.props.style?.removeButton?.color ||
    REMOVE_ICON_DEFAULT_COLOR;
  REMOVE_ICON_COLOR_LIGHT = lightenDarkenColor(this.REMOVE_ICON_COLOR, 40);

  state = {
    dropAreaCustom: {},
    progressBar: 0,
    displayProgressBarStatus: 'none',
    file: null,
    timeout: null,
    files: null,
    removeIconColor: this.REMOVE_ICON_COLOR,
    isCanceled: false,
  } as State;

  componentDidUpdate = (prevProps: any) => {
    if (this.props.isReset !== prevProps.isReset) {
      this.removeFile();
    }
  };

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
    const { style } = this.props;
    this.setState({
      dropAreaCustom: Object.assign(
        {},
        style?.dropAreaActive
          ? style?.dropAreaActive.borderColor
            ? style?.dropAreaActive
            : Object.assign({}, style?.dropAreaActive, styles.highlight)
          : style?.dropArea?.dropAreaActive
          ? style?.dropArea?.dropAreaActive.borderColor
            ? style?.dropArea?.dropAreaActive
            : Object.assign(
                {},
                style?.dropArea?.dropAreaActive,
                styles.highlight,
              )
          : styles.highlight,
      ),
    });
    this.setState({ progressBar: 0 });
  };

  unhighlight = () => {
    this.setState({
      dropAreaCustom: Object.assign(
        {},
        this.props.style?.dropArea?.borderColor
          ? {}
          : styles.dropAreaDefaultBorderColor,
      ),
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
    const { children } = this.props;
    const { file, progressBar } = this.state;
    return this.childrenIsFunction()
      ? children({ file, progressBar })
      : children;
  };

  handleRemoveFile = (e: any) => {
    if (e) {
      e.stopPropagation();
      this.removeFile();
    }
  };

  removeFile = () => {
    this.setState({ files: null, file: null });

    const { onRemoveFile } = this.props;
    if (onRemoveFile) {
      onRemoveFile(null);
    }

    this.inputFileRef.current.value = null;
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
          onClick={(e) => this.handleRemoveFile(e)}
          onMouseOver={() =>
            this.changeRemoveIconColor(this.REMOVE_ICON_COLOR_LIGHT)
          }
          onMouseOut={() => this.changeRemoveIconColor(this.REMOVE_ICON_COLOR)}
        >
          <RemoveIcon color={removeIconColor} />
        </div>
      );
    }

    if (addRemoveButton) {
      return (
        <div style={styles.dropFileRemoveButton}>
          <RemoveIcon color={this.REMOVE_ICON_COLOR} />
        </div>
      );
    }

    return null;
  };

  render() {
    const {
      style,
      noClick,
      children,
      noProgressBar,
      progressBarColor,
      accept,
    } = this.props;
    const {
      dropAreaCustom,
      files,
      isCanceled,
      progressBar,
      displayProgressBarStatus,
    } = this.state;

    return (
      <>
        <input
          type="file"
          accept={accept || DEFAULT_ACCEPT}
          ref={this.inputFileRef}
          style={styles.inputFile}
          onChange={(e) => this.fileChange(e)}
        />
        {!this.childrenIsFunction() ? (
          <div
            ref={this.dropAreaRef}
            style={Object.assign(
              {},
              styles.dropArea,
              style?.dropArea,
              dropAreaCustom,
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
              <div
                style={Object.assign(
                  {},
                  styles.dropFile,
                  styles.column,
                  style?.dropArea?.dropFile || style?.dropFile,
                )}
              >
                {this.renderDropFileRemoveButton()}
                <div style={styles.column}>
                  <span
                    style={Object.assign(
                      {},
                      styles.fileSizeInfo,
                      style?.dropArea?.dropFile?.fileSizeInfo ||
                        style?.dropArea?.fileSizeInfo ||
                        style?.fileSizeInfo,
                    )}
                    ref={this.fileSizeInfoRef}
                  />
                  <span
                    style={Object.assign(
                      {},
                      styles.fileNameInfo,
                      style?.dropArea?.dropFile?.fileNameInfo ||
                        style?.dropFile?.fileNameInfo ||
                        style?.fileNameInfo,
                    )}
                    ref={this.fileNameInfoRef}
                  />
                </div>
                {files && files.length > 0 && !isCanceled && !noProgressBar && (
                  <ProgressBar
                    // TODO: Delete progressBar
                    style={Object.assign(
                      {},
                      progressBarColor
                        ? { backgroundColor: progressBarColor }
                        : {},
                      style?.dropArea?.dropFile?.progressBar ||
                        style?.dropFile?.progressBar ||
                        style?.progressBar,
                    )}
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
            {files && files.length > 0 && !isCanceled && !noProgressBar && (
              <ProgressBar
                // TODO: Delete progressBar
                style={Object.assign(
                  {},
                  progressBarColor ? { backgroundColor: progressBarColor } : {},
                  style?.dropArea?.dropFile?.progressBar ||
                    style?.dropFile?.progressBar ||
                    style?.progressBar,
                )}
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
