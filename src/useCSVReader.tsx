import React, {
  // CSSProperties,
  useReducer,
  useCallback,
  useMemo,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from 'react';
import PapaParse, { ParseResult } from 'papaparse';
import { CustomConfig } from './model';
import {
  composeEventHandlers,
  onDocumentDragOver,
  isEventWithFiles,
  isPropagationStopped,
  fileAccepted,
  fileMatchSize,
  TOO_MANY_FILES_REJECTION,
  isIeOrEdge,
} from './utils';
import ProgressBar from './ProgressBar';

const DEFAULT_ACCEPT = 'text/csv, .csv, application/vnd.ms-excel';

// const cssProperty = {
//   inputFile: {
//     display: 'none',
//   } as CSSProperties,
// };

export interface Props<T> {
  children: (fn: any) => void | ReactNode;
  accept?: string;
  config?: CustomConfig<T>;
  onUploadAccepted?: (data: ParseResult<T>, file?: any, event?: any) => void;
  onDragLeave?: (event?: any) => void;
  onDragOver?: (event?: any) => void;
  onDragEnter?: (event?: any) => void;
  validator?: (file: any) => void;
  onDropAccepted?: (data: ParseResult<T>, file?: any) => void;
  disabled?: boolean;
  noClick?: boolean;
  noDrag?: boolean;
  noDragEventsBubbling?: boolean;
  preventDropOnDocument?: boolean;
  noKeyboard?: boolean;
  multiple?: boolean;
  minSize?: number;
  maxSize?: number;
  maxFiles?: number;
}

// interface State {
//   dropAreaCustom: any;
//   progressBar: number;
//   displayProgressBarStatus: string;
//   file: any;
//   files: any;
//   removeIconColor: string;
//   isCanceled: boolean;
// }

export interface Api<T> {
  config?: CustomConfig<T>;
  setConfig?: (config: CustomConfig<T>) => void;
  disabled?: boolean;
  setDisabled?: () => void;
  minSize?: number;
  setMinSize?: (minSize: number) => void;
  maxSize?: number;
  setMaxSize?: (maxSize: number) => void;
  maxFiles?: number;
  setMaxFiles?: (maxFiles: number) => void;
}

function useCSVReaderComponent<T = any>(api: Api<T>) {
  const CSVReaderComponent = (props: Props<T>) => {
    // Use variables from api as global
    const {
      disabled,
      setDisabled,
      noDrag,
      setNoDrag,
      config,
      setConfig,
      minSize,
      setMinSize,
      maxSize,
      setMaxSize,
      maxFiles,
      setMaxFiles,
      noClick,
      setNoClick,
    } = CSVReader.api;

    const {
      accept = DEFAULT_ACCEPT,
      noDragEventsBubbling = false,
      preventDropOnDocument = true,
      noKeyboard = false,
      onDragLeave,
      onDragOver,
      onDragEnter,
      multiple = false,
      validator,
      onDropAccepted,
      onUploadAccepted,
    } = props;

    const inputRef: any = useRef<ReactNode>(null);
    const rootRef: any = useRef<ReactNode>(null);

    const [state, dispatch] = useReducer(reducer, initialState);

    const {
      acceptedFile,
      draggedFiles,
      progressBarPercentage,
      displayProgressBar,
    } = state;

    useEffect(() => {
      const { disabled, noDrag, config, minSize, maxSize, maxFiles, noClick } =
        props;
      disabled && setDisabled(disabled);
      noDrag && setNoDrag(noDrag);
      config && setConfig(config);
      minSize && setMinSize(minSize);
      maxSize && setMaxSize(maxSize);
      maxFiles && setMaxFiles(maxFiles);
      noClick && setNoClick(noClick);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // global

    const setProgressBarPercentage = (percentage: number) => {
      dispatch({
        progressBarPercentage: percentage,
        type: 'setProgressBarPercentage',
      });
    };

    const setDisplayProgressBar = (display: string) => {
      dispatch({
        displayProgressBar: display,
        type: 'setDisplayProgressBar',
      });
    };

    const renderChildren = () => {
      const { children, onUploadAccepted } = props;
      console.log('999999999999999999999999');
      console.log(state.acceptedFile);
      console.log('999999999999999999999999');
      return onUploadAccepted
        ? children({
            getButtonProps,
            acceptedFile,
            ProgressBar: ProgressBarComponent,
          })
        : children({
            getDropzoneProps,
            acceptedFile,
            ProgressBar: ProgressBarComponent,
          });
    };

    const ProgressBarComponent = (props: any) => {
      return (
        <ProgressBar
          display={displayProgressBar}
          percentage={progressBarPercentage}
          style={props.style}
          className={props.className}
        />
      );
    };

    const onDropCb = useCallback(
      (event) => {
        allowDrop(event);

        setProgressBarPercentage(0);

        dragTargetsRef.current = [];

        if (isEventWithFiles(event)) {
          if (isPropagationStopped(event) && !noDragEventsBubbling) {
            return;
          }

          const acceptedFiles = [] as any;
          const fileRejections = [] as any;
          const files =
            event.target.files ||
            (event.dataTransfer && event.dataTransfer.files);
          Array.from(files).forEach((file) => {
            const [accepted, acceptError] = fileAccepted(file, accept);
            const [sizeMatch, sizeError] = fileMatchSize(
              file,
              minSize,
              maxSize,
            );
            const customErrors = validator ? validator(file) : null;

            if (accepted && sizeMatch && !customErrors) {
              acceptedFiles.push(file);
            } else {
              let errors = [acceptError, sizeError];

              if (customErrors) {
                errors = errors.concat(customErrors);
              }

              fileRejections.push({ file, errors: errors.filter((e) => e) });
            }
          });

          if (
            (!multiple && acceptedFiles.length > 1) ||
            (multiple && maxFiles >= 1 && acceptedFiles.length > maxFiles)
          ) {
            // Reject everything and empty accepted files
            acceptedFiles.forEach((file: any) => {
              fileRejections.push({ file, errors: [TOO_MANY_FILES_REJECTION] });
            });
            acceptedFiles.splice(0);
          }

          dispatch({
            acceptedFiles,
            fileRejections,
            type: 'setFiles',
          });

          // setDisplayProgressBar('block');

          // if (onDrop) {
          //   onDrop(acceptedFiles, fileRejections, event)
          // }

          // if (fileRejections.length > 0 && onDropRejected) {
          //   onDropRejected(fileRejections, event)
          // }

          // if (acceptedFiles.length > 0 && onDropAccepted) {
          //   onDropAccepted(acceptedFiles, event)
          // }

          let configs = {} as any;
          const data: any = [];
          const errors: any = [];
          const meta: any = [];
          const reader = new window.FileReader();
          let percentage = 0;

          configs = Object.assign({}, config, configs);
          acceptedFiles.forEach((file: any) => {
            dispatch({
              acceptedFile: file,
              type: 'setFile',
            });

            configs = {
              complete:
                config?.complete || config?.step
                  ? config.complete
                  : () => {
                      const obj = { data, errors, meta };
                      if (!onDropAccepted && onUploadAccepted) {
                        onUploadAccepted(obj, file);
                      } else if (onDropAccepted && !onUploadAccepted) {
                        onDropAccepted(obj, file);
                      }
                    },
              step: config?.step
                ? config.step
                : (row: any) => {
                    data.push(row.data);
                    if (row.errors.length > 0) {
                      errors.push(row.errors);
                    }
                    if (row.length > 0) {
                      meta.push(row[0].meta);
                    }
                    if (config && config.preview) {
                      percentage = Math.round(
                        (data.length / config.preview) * 100,
                      );
                      if (data.length === config.preview) {
                        if (!onDropAccepted && onUploadAccepted) {
                          onUploadAccepted(data, file);
                        } else if (onDropAccepted && !onUploadAccepted) {
                          onDropAccepted(data, file);
                        }
                      }
                    } else {
                      const cursor = row.meta.cursor;
                      const newPercentage = Math.round(
                        (cursor / file.size) * 100,
                      );
                      if (newPercentage === percentage) {
                        return;
                      }
                      percentage = newPercentage;
                    }
                    setProgressBarPercentage(percentage);
                    // setDisplayProgressBar('block');
                  },
            };
            reader.onload = (e: any) => {
              setDisplayProgressBar('block');
              PapaParse.parse(e.target.result, configs);
            };
            reader.onloadend = () => {
              setTimeout(() => {
                setDisplayProgressBar('none');
              }, 2000);
            };
            reader.readAsText(file, config.encoding || 'utf-8');
          });
        }
        dispatch({ type: 'reset' });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        multiple,
        accept,
        minSize,
        maxSize,
        maxFiles,
        validator,
        onUploadAccepted,
        onDropAccepted,
      ],
    );

    // Cb to open the file dialog when click occurs on the dropzone
    const onClickCb = useCallback(() => {
      if (noClick) {
        return;
      }

      // In IE11/Edge the file-browser dialog is blocking, therefore, use setTimeout()
      // to ensure React can handle state changes
      if (isIeOrEdge()) {
        setTimeout(openFileDialog, 0);
      } else {
        openFileDialog();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputRef, noClick]);

    const onDragOverCb = useCallback(
      (event: any) => {
        allowDrop(event);

        const hasFiles = isEventWithFiles(event);
        if (hasFiles && event.dataTransfer) {
          try {
            event.dataTransfer.dropEffect = 'copy';
          } catch {} /* eslint-disable-line no-empty */
        }

        if (hasFiles && onDragOver) {
          onDragOver(event);
        }

        return false;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onDragOver, noDragEventsBubbling],
    );

    const onDragEnterCb = useCallback(
      (event: any) => {
        allowDrop(event);

        dragTargetsRef.current = [
          ...dragTargetsRef.current,
          event.target,
        ] as never[];

        if (isEventWithFiles(event)) {
          if (isPropagationStopped(event) && !noDragEventsBubbling) {
            return;
          }

          dispatch({
            draggedFiles,
            isDragActive: true,
            type: 'setDraggedFiles',
          });

          if (onDragEnter) {
            onDragEnter(event);
          }
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onDragEnter, noDragEventsBubbling],
    );

    const stopPropagation = (event: any) => {
      if (noDragEventsBubbling) {
        event.stopPropagation();
      }
    };

    const allowDrop = (event: any) => {
      event.preventDefault(event);
      // Persist here because we need the event later after getFilesFromEvent() is done
      event.persist();
      stopPropagation(event);
    };

    // Fn for opening the file dialog programmatically
    const openFileDialog = useCallback(() => {
      if (inputRef.current && state.displayProgressBar) {
        // if (inputRef.current) {
        dispatch({ type: 'openDialog' });
        inputRef.current.value = null;
        inputRef.current.click();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // =====================

    // Dropzone

    // Update focus state for the dropzone
    const onFocusCb = useCallback(() => {
      dispatch({ type: 'focus' });
    }, []);
    const onBlurCb = useCallback(() => {
      dispatch({ type: 'blur' });
    }, []);

    const onDragLeaveCb = useCallback(
      (event: any) => {
        allowDrop(event);

        // Only deactivate once the dropzone and all children have been left
        const targets = dragTargetsRef.current.filter(
          (target) => rootRef.current && rootRef.current.contains(target),
        );
        // Make sure to remove a target present multiple times only once
        // (Firefox may fire dragenter/dragleave multiple times on the same element)
        const targetIdx = targets.indexOf(event.target as never);
        if (targetIdx !== -1) {
          targets.splice(targetIdx, 1);
        }
        dragTargetsRef.current = targets;
        if (targets.length > 0) {
          return;
        }

        dispatch({
          isDragActive: false,
          type: 'setDraggedFiles',
          draggedFiles: [],
        });

        if (isEventWithFiles(event) && onDragLeave) {
          onDragLeave(event);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [rootRef, onDragLeave, noDragEventsBubbling],
    );

    // Cb to open the file dialog when SPACE/ENTER occurs on the dropzone
    const onKeyDownCb = useCallback(
      (event: any) => {
        // Ignore keyboard events bubbling up the DOM tree
        if (!rootRef.current || !rootRef.current.isEqualNode(event.target)) {
          return;
        }

        if (event.keyCode === 32 || event.keyCode === 13) {
          event.preventDefault();
          openFileDialog();
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [rootRef, inputRef],
    );

    const getDropzoneProps = useMemo(
      () =>
        ({
          onClick = () => {},
          onDragOver = () => {},
          onDrop = () => {},
          onDragEnter = () => {},
          onDragLeave = () => {},
          onKeyDown = () => {},
          onFocus = () => {},
          onBlur = () => {},
          refKey = rootRef,
          ...rest
        } = {}) => ({
          onClick: composeHandler(composeEventHandlers(onClick, onClickCb)), // Done
          onDrop: composeDragHandler(composeEventHandlers(onDrop, onDropCb)),
          onDragEnter: composeDragHandler(
            composeEventHandlers(onDragEnter, onDragEnterCb), // Done
          ),
          onDragOver: composeDragHandler(
            composeEventHandlers(onDragOver, onDragOverCb), // Done
          ),
          onDragLeave: composeDragHandler(
            composeEventHandlers(onDragLeave, onDragLeaveCb), // Done
          ),
          onKeyDown: composeKeyboardHandler(
            composeEventHandlers(onKeyDown, onKeyDownCb), // Done
          ),
          onFocus: composeKeyboardHandler(
            composeEventHandlers(onFocus, onFocusCb), // Done
          ),
          onBlur: composeKeyboardHandler(
            composeEventHandlers(onBlur, onBlurCb), // Done
          ),
          [refKey]: rootRef,
          ...rest,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        rootRef,
        onKeyDownCb,
        onFocusCb,
        onBlurCb,
        onClickCb,
        onDragEnterCb,
        onDragOverCb,
        onDragLeaveCb,
        onDropCb,
        noKeyboard,
        noDrag,
        disabled,
      ],
    );

    const dragTargetsRef = useRef([]);
    const onDocumentDrop = (event: any) => {
      if (rootRef.current && rootRef.current.contains(event.target)) {
        // If we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
        return;
      }
      event.preventDefault();
      dragTargetsRef.current = [];
    };

    useEffect(() => {
      if (preventDropOnDocument) {
        document.addEventListener('dragover', onDocumentDragOver, true);
        document.addEventListener('drop', onDocumentDrop, true);
      }

      return () => {
        if (preventDropOnDocument) {
          document.removeEventListener('dragover', onDocumentDragOver);
          document.removeEventListener('drop', onDocumentDrop);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rootRef, preventDropOnDocument]);

    const composeDragHandler = (fn: any) => {
      return noDrag ? null : composeHandler(fn);
    };

    const composeKeyboardHandler = (fn: any) => {
      return noKeyboard ? null : composeHandler(fn);
    };

    // =====================

    // Button
    const getButtonProps = useMemo(
      () =>
        ({ onClick = () => {}, ...rest } = {}) => ({
          onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
          ...rest,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onClickCb],
    );
    // =====================

    // ======= Input =======

    const getInputProps = useMemo(
      () =>
        ({
          refKey = 'ref',
          onChange = () => {},
          onClick = () => {},
          ...rest
        } = {}) => {
          const inputProps = {
            accept,
            // multiple,
            type: 'file',
            style: { display: 'none' },
            onChange: composeHandler(composeEventHandlers(onChange, onDropCb)),
            onClick: composeHandler(
              composeEventHandlers(onClick, onInputElementClick),
            ),
            autoComplete: 'off',
            tabIndex: -1,
            [refKey]: inputRef,
          };

          return {
            ...inputProps,
            ...rest,
          };
        },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [inputRef, accept, onDropCb, disabled],
    );

    const composeHandler = (fn: any) => {
      return disabled ? null : fn;
    };

    const onInputElementClick = useCallback((event) => {
      event.stopPropagation();
    }, []);

    // =====================

    return (
      <>
        <input {...getInputProps()} />
        {renderChildren() || ''}
      </>
    );
  };

  const CSVReader = useMemo(
    () => CSVReaderComponent,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  ) as any;

  CSVReader.api = api;

  return CSVReader;
}

export function useCSVReader<T = any>() {
  const [config, setConfig] = useState({});
  const [noDrag, setNoDrag] = useState(false);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(3000000);
  const [maxFiles, setMaxFiles] = useState(1);
  const [noClick, setNoClick] = useState(false);

  const api = {
    config,
    setConfig,
    noDrag,
    setNoDrag,
    minSize,
    setMinSize,
    maxSize,
    setMaxSize,
    maxFiles,
    setMaxFiles,
    noClick,
    setNoClick,
  } as Api<T>;

  const CSVReader = useCSVReaderComponent(api);

  return {
    ...api,
    CSVReader,
  };
}

const initialState = {
  displayProgressBar: 'none',
  progressBarPercentage: 0,

  isDragActive: false,
  isFileDialogActive: false,
  isFocused: false,

  draggedFiles: [],
  acceptedFiles: [],
  acceptedFile: null,

  // isDragAccept: false,
  // isDragReject: false,
  // fileRejections: [],
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'focus':
      return {
        ...state,
        isFocused: true,
      };
    case 'blur':
      return {
        ...state,
        isFocused: false,
      };
    case 'openDialog':
      return {
        ...state,
        isFileDialogActive: true,
      };
    case 'setDraggedFiles':
      /* eslint no-case-declarations: 0 */
      const { isDragActive, draggedFiles } = action;
      return {
        ...state,
        draggedFiles,
        isDragActive,
      };
    case 'reset':
      return {
        ...initialState,
      };
    case 'setProgressBarPercentage':
      return {
        ...state,
        progressBarPercentage: action.progressBarPercentage,
      };
    case 'setDisplayProgressBar':
      return {
        ...state,
        displayProgressBar: action.displayProgressBar,
      };
    case 'setFiles':
      return {
        ...state,
        acceptedFiles: action.acceptedFiles,
        fileRejections: action.fileRejections,
      };
    case 'setFile':
      return {
        ...state,
        acceptedFile: action.acceptedFile,
      };
    default:
      return state;
  }
}
