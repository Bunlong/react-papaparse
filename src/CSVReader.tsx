import React, { CSSProperties } from 'react';
import PapaParse, { ParseResult } from 'papaparse';
import { CustomConfig } from './model';
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

interface Props<T> {
  children: any;
  onDrop?: (data: Array<ParseResult<T>>, file?: any) => void;
  onFileLoad?: (data: Array<ParseResult<T>>, file?: any) => void;
  onError?: (err: any, file: any, inputElem: any, reason: any) => void;
  config?: CustomConfig<T>;
  style?: any;
  noClick?: boolean;
  noDrag?: boolean;
  progressBarColor?: string;
  addRemoveButton?: boolean;
  onRemoveFile?: (data: null) => void;
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

export default class CSVReader<T = any> extends React.Component<
  Props<T>,
  State
> {
  static defaultProps: Partial<Props<unknown>> = {
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
    if (currentDropAreaRef) {
      const fourDragsEvent = ['dragenter', 'dragover', 'dragleave', 'drop'];
      fourDragsEvent.forEach((item) => {
        currentDropAreaRef.addEventListener(item, this.preventDefaults, false);
      });

      if (!this.props.noDrag) {
        const highlightDragsEvent = ['dragenter', 'dragover'];
        highlightDragsEvent.forEach((item) => {
          currentDropAreaRef.addEventListener(item, this.highlight, false);
        });
        currentDropAreaRef.addEventListener(
          'dragleave',
          this.unhighlight,
          false,
        );
        currentDropAreaRef.addEventListener('drop', this.unhighlight, false);
        currentDropAreaRef.addEventListener(
          'drop',
          this.visibleProgressBar,
          false,
        );
        currentDropAreaRef.addEventListener('drop', this.handleDrop, false);
      }
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
    if (!this.props.noProgressBar) {
      this.setState({ displayProgressBarStatus: 'block' });
    }
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

    const size = file.size;
    const data: any = [];
    let percent = 0;

    if (onDrop || onFileLoad) {
      const self = this;
      options = Object.assign(
        {
          complete:
            config?.complete || config?.step
              ? config.complete
              : () => {
                  if (!onDrop && onFileLoad) {
                    onFileLoad(data, file);
                  } else if (onDrop && !onFileLoad) {
                    onDrop(data, file);
                  }
                },
          step: config?.step
            ? config.step
            : (row: any) => {
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
      options = Object.assign({}, config, options);
    }

    reader.onload = (e: any) => {
      PapaParse.parse(e.target.result, options);
    };

    if (!this.props.noProgressBar) {
      reader.onloadend = () => {
        clearTimeout(this.state.timeout);
        this.setState({
          timeout: setTimeout(() => {
            this.disableProgressBar();
          }, 2000),
        });
      };
    }

    reader.readAsText(file, config.encoding || 'utf-8');
  };

  displayFileInfo = (file: any) => {
    if (!this.childrenIsFunction()) {
      this.fileSizeInfoRef.current.innerHTML = getSize(file.size);
      this.fileNameInfoRef.current.innerHTML = file.name;
    }
  };

  disableProgressBar = () => {
    if (!this.props.noProgressBar) {
      this.setState({ displayProgressBarStatus: 'none' });
    }
  };

  childrenIsFunction = () => {
    return typeof this.props.children === 'function';
  };

  fileChange = (e: any) => {
    const { target } = e;
    if (!this.props.noProgressBar) {
      this.setState({ displayProgressBarStatus: 'block' }, () => {
        this.handleDrop(target);
      });
    } else {
      this.handleDrop(target);
    }
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
                    percentage={progressBar}
                    display={displayProgressBarStatus}
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
                percentage={progressBar}
                display={displayProgressBarStatus}
                isButton
              />
            )}
          </div>
        )}
      </>
    );
  }
}

// 999999999999999999999999999999999999

/* eslint-disable react-hooks/exhaustive-deps */
// import React, {
//   useReducer,
//   useCallback,
//   useMemo,
//   useEffect,
//   ReactNode,
//   useRef,
// } from 'react';
// import PapaParse, { ParseResult } from 'papaparse';
// import { CustomConfig } from './model';
// import {
//   composeEventHandlers,
//   isIeOrEdge,
//   isEventWithFiles,
//   isPropagationStopped,
//   fileAccepted,
//   fileMatchSize,
//   TOO_MANY_FILES_REJECTION,
//   onDocumentDragOver,
// } from './utils';
// import ProgressBar from './ProgressBar';

// // 'text/csv' for MacOS
// // '.csv' for Linux
// // 'application/vnd.ms-excel' for Window 10
// const DEFAULT_ACCEPT = 'text/csv, .csv, application/vnd.ms-excel';

// export interface Props<T> {
//   children: (fn: any) => void | ReactNode;
//   accept?: string;
//   config?: CustomConfig<T>;

//   minSize?: number;
//   maxSize?: number;
//   maxFiles?: number;

//   disabled?: boolean;
//   noClick?: boolean;
//   noDrag?: boolean;
//   noDragEventsBubbling?: boolean;
//   noKeyboard?: boolean;
//   multiple?: boolean;
//   preventDropOnDocument?: boolean;

//   onUploadAccepted?: (data: ParseResult<T>, file?: File, event?: Event) => void;
//   onDropAccepted?: (
//     data: ParseResult<T>,
//     file?: File,
//     event?: DragEvent | Event,
//   ) => void;
//   onDropRejected?: (file?: File, event?: DragEvent | Event) => void;
//   validator?: (file: File) => void;
//   onDragEnter?: (event?: DragEvent) => void;
//   onDragOver?: (event?: DragEvent) => void;
//   onDragLeave?: (event?: DragEvent) => void;
// }

// export interface ProgressBarComponentProp {
//   style?: any;
//   className?: string;
// }

// function useCSVReaderComponent<T = any>() {
//   const CSVReaderComponent = ({
//     children,
//     accept = DEFAULT_ACCEPT,
//     config = {},
//     minSize = 0,
//     maxSize = Infinity,
//     maxFiles = 1,
//     disabled = false,
//     noClick = false,
//     noDrag = false,
//     noDragEventsBubbling = false,
//     noKeyboard = false,
//     multiple = false,
//     preventDropOnDocument = false,
//     onUploadAccepted,
//     validator,
//     onDropRejected,
//     onDropAccepted,
//     onDragEnter,
//     onDragOver,
//     onDragLeave,
//   }: Props<T>) => {
//     const inputRef: any = useRef<ReactNode>(null);
//     const rootRef: any = useRef<ReactNode>(null);
//     const dragTargetsRef = useRef([]);

//     const [state, dispatch] = useReducer(reducer, initialState);
//     const {
//       acceptedFile,
//       displayProgressBar,
//       progressBarPercentage,
//       draggedFiles,
//     } = state;

//     const onDocumentDrop = (event: DragEvent) => {
//       if (rootRef.current && rootRef.current.contains(event.target)) {
//         // If we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
//         return;
//       }
//       event.preventDefault();
//       dragTargetsRef.current = [];
//     };

//     useEffect(() => {
//       if (preventDropOnDocument) {
//         document.addEventListener('dragover', onDocumentDragOver, false);
//         document.addEventListener('drop', onDocumentDrop, false);
//       }

//       return () => {
//         if (preventDropOnDocument) {
//           document.removeEventListener('dragover', onDocumentDragOver);
//           document.removeEventListener('drop', onDocumentDrop);
//         }
//       };
//     }, [rootRef, preventDropOnDocument]);

//     // ============== GLOBAL ==============
//     const composeHandler = (fn: any) => {
//       return disabled ? null : fn;
//     };

//     const composeDragHandler = (fn: any) => {
//       return noDrag ? null : composeHandler(fn);
//     };

//     const stopPropagation = (event: Event) => {
//       if (noDragEventsBubbling) {
//         event.stopPropagation();
//       }
//     };

//     const allowDrop = (event: any) => {
//       event.preventDefault(event);
//       // Persist here because we need the event later after getFilesFromEvent() is done
//       event.persist();
//       stopPropagation(event);
//     };

//     const setDisplayProgressBar = (display: string) => {
//       dispatch({
//         displayProgressBar: display,
//         type: 'setDisplayProgressBar',
//       });
//     };

//     const setProgressBarPercentage = (percentage: number) => {
//       dispatch({
//         progressBarPercentage: percentage,
//         type: 'setProgressBarPercentage',
//       });
//     };

//     const ProgressBarComponent = ({
//       style,
//       className,
//     }: ProgressBarComponentProp) => {
//       return (
//         <ProgressBar
//           display={displayProgressBar}
//           percentage={progressBarPercentage}
//           style={style}
//           className={className}
//         />
//       );
//     };

//     const renderChildren = () => {
//       return onUploadAccepted
//         ? children({
//             getButtonProps,
//             acceptedFile,
//             ProgressBar: ProgressBarComponent,
//           })
//         : children({
//             getDropzoneProps,
//             acceptedFile,
//             ProgressBar: ProgressBarComponent,
//           });
//     };

//     // Fn for opening the file dialog programmatically
//     const openFileDialog = useCallback(() => {
//       if (inputRef.current && state.displayProgressBar) {
//         // if (inputRef.current) {
//         dispatch({ type: 'openDialog' });
//         inputRef.current.value = null;
//         inputRef.current.click();
//       }
//     }, [dispatch]);

//     // Cb to open the file dialog when click occurs on the dropzone
//     const onClickCb = useCallback(() => {
//       if (noClick) {
//         return;
//       }

//       // In IE11/Edge the file-browser dialog is blocking, therefore, use setTimeout()
//       // to ensure React can handle state changes
//       if (isIeOrEdge()) {
//         setTimeout(openFileDialog, 0);
//       } else {
//         openFileDialog();
//       }
//     }, [inputRef, noClick]);

//     const onDropCb = useCallback(
//       (event) => {
//         allowDrop(event);

//         setProgressBarPercentage(0);

//         dragTargetsRef.current = [];

//         if (isEventWithFiles(event)) {
//           if (isPropagationStopped(event) && !noDragEventsBubbling) {
//             return;
//           }

//           const acceptedFiles = [] as any;
//           const fileRejections = [] as any;
//           const files =
//             event.target.files ||
//             (event.dataTransfer && event.dataTransfer.files);
//           Array.from(files).forEach((file) => {
//             const [accepted, acceptError] = fileAccepted(file, accept);
//             const [sizeMatch, sizeError] = fileMatchSize(
//               file,
//               minSize,
//               maxSize,
//             );
//             const customErrors = validator ? validator(file as File) : null;

//             if (accepted && sizeMatch && !customErrors) {
//               acceptedFiles.push(file);
//             } else {
//               let errors = [acceptError, sizeError];

//               if (customErrors) {
//                 errors = errors.concat(customErrors);
//               }

//               fileRejections.push({ file, errors: errors.filter((e) => e) });
//             }
//           });

//           if (
//             (!multiple && acceptedFiles.length > 1) ||
//             (multiple && maxFiles >= 1 && acceptedFiles.length > maxFiles)
//           ) {
//             // Reject everything and empty accepted files
//             acceptedFiles.forEach((file: File) => {
//               fileRejections.push({ file, errors: [TOO_MANY_FILES_REJECTION] });
//             });
//             acceptedFiles.splice(0);
//           }

//           dispatch({
//             acceptedFiles,
//             fileRejections,
//             type: 'setFiles',
//           });

//           setDisplayProgressBar('block');

//           // if (onDrop) {
//           //   onDrop(acceptedFiles, fileRejections, event)
//           // }

//           if (fileRejections.length > 0 && onDropRejected) {
//             onDropRejected(fileRejections, event);
//           }

//           if (
//             acceptedFiles.length > 0 &&
//             (onUploadAccepted || onDropAccepted)
//           ) {
//             let configs = {} as any;
//             const data: any = [];
//             const errors: any = [];
//             const meta: any = [];
//             const reader = new window.FileReader();
//             let percentage = 0;

//             configs = Object.assign({}, config, configs);
//             acceptedFiles.forEach((file: File) => {
//               dispatch({
//                 acceptedFile: file,
//                 type: 'setFile',
//               });

//               configs = {
//                 complete:
//                   config?.complete || config?.step
//                     ? config.complete
//                     : () => {
//                         const obj = { data, errors, meta };
//                         if (!onDropAccepted && onUploadAccepted) {
//                           onUploadAccepted(obj, file);
//                         } else if (onDropAccepted && !onUploadAccepted) {
//                           onDropAccepted(obj, file);
//                         }
//                       },
//                 step: config?.step
//                   ? config.step
//                   : (row: any) => {
//                       data.push(row.data);
//                       if (row.errors.length > 0) {
//                         errors.push(row.errors);
//                       }
//                       if (row.length > 0) {
//                         meta.push(row[0].meta);
//                       }
//                       if (config && config.preview) {
//                         percentage = Math.round(
//                           (data.length / config.preview) * 100,
//                         );
//                         // setProgressBarPercentage(percentage);
//                         if (data.length === config.preview) {
//                           if (!onDropAccepted && onUploadAccepted) {
//                             onUploadAccepted(data, file);
//                           } else if (onDropAccepted && !onUploadAccepted) {
//                             onDropAccepted(data, file);
//                           }
//                         }
//                       } else {
//                         const cursor = row.meta.cursor;
//                         const newPercentage = Math.round(
//                           (cursor / file.size) * 100,
//                         );
//                         if (newPercentage === percentage) {
//                           return;
//                         }
//                         percentage = newPercentage;
//                       }
//                       setProgressBarPercentage(percentage);
//                     },
//               };
//               reader.onload = (e: any) => {
//                 PapaParse.parse(e.target.result, configs);
//               };
//               reader.onloadend = () => {
//                 setTimeout(() => {
//                   setDisplayProgressBar('none');
//                 }, 2000);
//               };
//               reader.readAsText(file, config.encoding || 'utf-8');
//             });
//           }
//         }
//         // dispatch({ type: 'reset' });
//       },
//       [
//         multiple,
//         accept,
//         minSize,
//         maxSize,
//         maxFiles,
//         validator,
//         onUploadAccepted,
//         onDropAccepted,
//       ],
//     );

//     const onInputElementClick = useCallback((event) => {
//       stopPropagation(event);
//     }, []);
//     // ====================================

//     // ============== BUTTON ==============
//     const getButtonProps = useMemo(
//       () =>
//         ({ onClick = () => {}, ...rest } = {}) => ({
//           onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
//           ...rest,
//         }),
//       [onClickCb],
//     );
//     // ====================================

//     // ============== DROP ==============
//     const composeKeyboardHandler = (fn: any) => {
//       return noKeyboard ? null : composeHandler(fn);
//     };

//     const onDragEnterCb = useCallback(
//       (event: DragEvent) => {
//         allowDrop(event);

//         dragTargetsRef.current = [
//           ...dragTargetsRef.current,
//           event.target,
//         ] as never[];

//         if (isEventWithFiles(event)) {
//           if (isPropagationStopped(event) && !noDragEventsBubbling) {
//             return;
//           }

//           dispatch({
//             draggedFiles,
//             isDragActive: true,
//             type: 'setDraggedFiles',
//           });

//           if (onDragEnter) {
//             onDragEnter(event);
//           }
//         }
//       },
//       [onDragEnter, noDragEventsBubbling],
//     );

//     const onDragOverCb = useCallback(
//       (event: DragEvent) => {
//         allowDrop(event);

//         const hasFiles = isEventWithFiles(event);
//         if (hasFiles && event.dataTransfer) {
//           try {
//             event.dataTransfer.dropEffect = 'copy';
//           } catch {} /* eslint-disable-line no-empty */
//         }

//         if (hasFiles && onDragOver) {
//           onDragOver(event);
//         }

//         return false;
//       },
//       [onDragOver, noDragEventsBubbling],
//     );

//     const onDragLeaveCb = useCallback(
//       (event: DragEvent) => {
//         allowDrop(event);

//         // Only deactivate once the dropzone and all children have been left
//         const targets = dragTargetsRef.current.filter(
//           (target) => rootRef.current && rootRef.current.contains(target),
//         );
//         // Make sure to remove a target present multiple times only once
//         // (Firefox may fire dragenter/dragleave multiple times on the same element)
//         const targetIdx = targets.indexOf(event.target as never);
//         if (targetIdx !== -1) {
//           targets.splice(targetIdx, 1);
//         }
//         dragTargetsRef.current = targets;
//         if (targets.length > 0) {
//           return;
//         }

//         dispatch({
//           isDragActive: false,
//           type: 'setDraggedFiles',
//           draggedFiles: [],
//         });

//         if (isEventWithFiles(event) && onDragLeave) {
//           onDragLeave(event);
//         }
//       },
//       [rootRef, onDragLeave, noDragEventsBubbling],
//     );

//     // Cb to open the file dialog when SPACE/ENTER occurs on the dropzone
//     const onKeyDownCb = useCallback(
//       (event: KeyboardEvent) => {
//         // Ignore keyboard events bubbling up the DOM tree
//         if (!rootRef.current || !rootRef.current.isEqualNode(event.target)) {
//           return;
//         }

//         if (event.key === 'Space' || event.key === 'Enter') {
//           event.preventDefault();
//           openFileDialog();
//         }
//       },
//       [rootRef, inputRef],
//     );

//     // Update focus state for the dropzone
//     const onFocusCb = useCallback(() => {
//       dispatch({ type: 'focus' });
//     }, []);

//     const onBlurCb = useCallback(() => {
//       dispatch({ type: 'blur' });
//     }, []);

//     const getDropzoneProps = useMemo(
//       () =>
//         ({
//           onClick = () => {},
//           onDrop = () => {},
//           onDragOver = () => {},
//           onDragLeave = () => {},
//           onKeyDown = () => {},
//           onFocus = () => {},
//           onBlur = () => {},
//           onDragEnter = () => {},
//           refKey = rootRef,
//           ...rest
//         } = {}) => ({
//           onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
//           onDrop: composeDragHandler(composeEventHandlers(onDrop, onDropCb)),
//           onDragEnter: composeDragHandler(
//             composeEventHandlers(onDragEnter, onDragEnterCb),
//           ),
//           onDragOver: composeDragHandler(
//             composeEventHandlers(onDragOver, onDragOverCb),
//           ),
//           onDragLeave: composeDragHandler(
//             composeEventHandlers(onDragLeave, onDragLeaveCb),
//           ),
//           onKeyDown: composeKeyboardHandler(
//             composeEventHandlers(onKeyDown, onKeyDownCb), // Done
//           ),
//           onFocus: composeKeyboardHandler(
//             composeEventHandlers(onFocus, onFocusCb), // Done
//           ),
//           onBlur: composeKeyboardHandler(
//             composeEventHandlers(onBlur, onBlurCb), // Done
//           ),
//           [refKey]: rootRef,
//           ...rest,
//         }),
//       [
//         rootRef,
//         onKeyDownCb,
//         onFocusCb,
//         onBlurCb,
//         onClickCb,
//         onDragEnterCb,
//         onDragOverCb,
//         onDragLeaveCb,
//         onDropCb,
//         noKeyboard,
//         noDrag,
//         disabled,
//       ],
//     );
//     // ==================================

//     // ============== INPUT ==============
//     const getInputProps = useMemo(
//       () =>
//         ({
//           refKey = 'ref',
//           onChange = () => {},
//           onClick = () => {},
//           ...rest
//         } = {}) => {
//           const inputProps = {
//             accept,
//             multiple,
//             type: 'file',
//             style: { display: 'none' },
//             onChange: composeHandler(composeEventHandlers(onChange, onDropCb)),
//             onClick: composeHandler(
//               composeEventHandlers(onClick, onInputElementClick),
//             ),
//             autoComplete: 'off',
//             tabIndex: -1,
//             [refKey]: inputRef,
//           };

//           return {
//             ...inputProps,
//             ...rest,
//           };
//         },
//       [inputRef, accept, onDropCb, disabled],
//     );
//     // ===================================

//     return (
//       <>
//         <input {...getInputProps()} />
//         {renderChildren()}
//       </>
//     );
//   };

//   const CSVReader = useMemo(() => CSVReaderComponent, []) as any;

//   return CSVReader;
// }

// export function useCSVReader() {
//   const CSVReader = useCSVReaderComponent();

//   return {
//     CSVReader,
//   };
// }

// const initialState = {
//   displayProgressBar: 'none',
//   progressBarPercentage: 0,

//   isDragActive: false,
//   isFileDialogActive: false,
//   isFocused: false,

//   draggedFiles: [],
//   acceptedFiles: [],
//   acceptedFile: null,

//   // isDragAccept: false,
//   // isDragReject: false,
//   // fileRejections: [],
// };

// function reducer(state: any, action: any) {
//   switch (action.type) {
//     case 'openDialog':
//       return {
//         ...state,
//         isFileDialogActive: true,
//       };
//     case 'closeDialog':
//       return {
//         ...state,
//         isFileDialogActive: false,
//       };
//     case 'setFiles':
//       return {
//         ...state,
//         acceptedFiles: action.acceptedFiles,
//         fileRejections: action.fileRejections,
//       };
//     case 'setFile':
//       return {
//         ...state,
//         acceptedFile: action.acceptedFile,
//       };
//     case 'setDisplayProgressBar':
//       return {
//         ...state,
//         displayProgressBar: action.displayProgressBar,
//       };
//     case 'setProgressBarPercentage':
//       return {
//         ...state,
//         progressBarPercentage: action.progressBarPercentage,
//       };
//     case 'setDraggedFiles':
//       /* eslint no-case-declarations: 0 */
//       const { isDragActive, draggedFiles } = action;
//       return {
//         ...state,
//         draggedFiles,
//         isDragActive,
//       };
//     case 'focus':
//       return {
//         ...state,
//         isFocused: true,
//       };
//     case 'blur':
//       return {
//         ...state,
//         isFocused: false,
//       };
//     // case 'reset':
//     //   return {
//     //     ...initialState
//     //   }
//     default:
//       return state;
//   }
// }


// 999999999999999999999999999999999999
