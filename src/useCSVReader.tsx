import React, {
  // CSSProperties,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from 'react';
import PapaParse, { ParseResult } from 'papaparse';
import { CustomConfig } from './model';
import {
  isIeOrEdge,
  composeEventHandlers,
  isEventWithFiles,
  isPropagationStopped,
  fileAccepted,
  fileMatchSize,
  TOO_MANY_FILES_REJECTION,
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
  config?: CustomConfig<T>;
  accept?: string;
  minSize?: number;
  maxSize?: number;
  maxFiles?: number;
  className?: string;
  style?: any;
  removeButtonColor?: string;
  validator?: (file: any) => void;
  onDropAccepted?: (data: ParseResult<T>, file?: any) => void;
  onUploadAccepted?: (data: ParseResult<T>, file?: any, event?: any) => void;
  onError?: (err: any, file: any, inputElem: any, reason: any) => void;
  onRemove?: (data: null) => void;
  onFileDialogCancel?: () => void;
  disabled?: boolean;
  noClick?: boolean;
  noDrag?: boolean;
  noRemoveButton?: boolean;
  isReset?: boolean;
  noKeyboard?: boolean;
  noDragEventsBubbling?: boolean;
  multiple?: boolean;
}

// interface State {
//   dropAreaCustom: any;
//   progressBar: number;
//   displayProgressBarStatus: string;
//   file: any;
//   timeout: any;
//   files: any;
//   removeIconColor: string;
//   isCanceled: boolean;
// }

export interface Api<T> {
  config?: CustomConfig<T>;
  setConfig?: () => void;
  accept?: string;
  setAccept?: () => void;
  minSize?: number;
  setMinSize?: () => void;
  maxSize?: number;
  setMaxSize?: () => void;
  maxFiles?: number;
  setMaxFiles?: () => void;
  className?: string;
  setClassName?: () => void;
  style?: any;
  setStyle?: () => void;
  removeButtonColor?: string;
  setRemoveButtonColor?: () => void;
  validator?: null;
  setValidator?: () => void;
  noClick?: boolean;
  setNoClick?: () => void;
  noDrag?: boolean;
  setNoDrag?: () => void;
  noRemoveButton?: boolean;
  setNoRemoveButton?: () => void;
  isReset?: boolean;
  setIsReset?: () => void;
  disabled?: boolean;
  setDisabled?: () => void;
  noKeyboard?: boolean;
  setNoKeyboard?: () => void;
  noDragEventsBubbling?: boolean;
  setNoDragEventsBubbling?: () => void;
  multiple?: boolean;
  setMultiple?: () => void;
}

function useCSVReaderComponent<T = any>(api: Api<T>) {
  const CSVReaderComponent = (props: Props<T>) => {
    const {
      config,
      setConfig,
      accept,
      setAccept,
      noClick,
      setNoClick,
      disabled,
      setDisabled,
      noDragEventsBubbling,
      setNoDragEventsBubbling,
      minSize,
      setMinSize,
      maxSize,
      setMaxSize,
      validator,
      setValidator,
      multiple,
      setMultiple,
      maxFiles,
      setMaxFiles,
    } = CSVReader.api;
    const { onUploadAccepted, onDropAccepted } = props;

    const inputRef: any = useRef<ReactNode>(null);
    const rootRef: any = useRef<ReactNode>(null);
    const dragTargetsRef = useRef([]);

    const [state, dispatch] = useReducer(reducer, initialState);
    const {
      isFileDialogActive,
      // acceptedFiles,
      acceptedFile,
      progressBarPercentage,
      displayProgressBar,
    } = state;

    useEffect(() => {
      const {
        config,
        accept,
        noDragEventsBubbling,
        minSize,
        maxSize,
        validator,
        multiple,
        maxFiles,
        noClick,
      } = props;

      config && setConfig(config);
      accept && setAccept(accept);
      disabled && setDisabled(disabled);
      noDragEventsBubbling && setNoDragEventsBubbling(noDragEventsBubbling);
      minSize && setMinSize(minSize);
      maxSize && setMaxSize(maxSize);
      validator && setValidator(validator);
      multiple && setMultiple(multiple);
      maxFiles && setMaxFiles(maxFiles);
      noClick && setNoClick(noClick);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const childrenIsFunction = () => {
      return typeof props.children === 'function';
    };

    // Fn for opening the file dialog programmatically
    const openFileDialog = useCallback(() => {
      // if (inputRef.current && state.displayProgressBarStatus) {
      if (inputRef.current) {
        dispatch({ type: 'openDialog' });
        inputRef.current.value = null;
        inputRef.current.click();
      }
    }, [dispatch]);

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

    // Update file dialog active state when the window is focused on
    const onWindowFocus = () => {
      // Execute the timeout only if the file dialog is opened in the browser
      if (isFileDialogActive) {
        setTimeout(() => {
          if (inputRef.current) {
            const { files } = inputRef.current;

            if (!files.length) {
              dispatch({ type: 'closeDialog' });
              if (typeof props.onFileDialogCancel === 'function') {
                props.onFileDialogCancel();
              }
            }
          }
        }, 300);
      }
    };

    useEffect(() => {
      window.addEventListener('focus', onWindowFocus, false);
      return () => {
        window.removeEventListener('focus', onWindowFocus, false);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputRef, isFileDialogActive, props.onFileDialogCancel]);

    const Pro = (props: any) => {
      return (
        <ProgressBar
          isButton
          display={displayProgressBar}
          percentage={progressBarPercentage}
          style={props.style}
          className={props.className}
        />
      );
    };

    const renderChildren = () => {
      const { children } = props;
      return childrenIsFunction()
        ? children({ getProps, acceptedFile, ProgressBar: Pro })
        : children;
    };

    const onInputElementClick = useCallback((event) => {
      event.stopPropagation();
    }, []);

    const stopPropagation = (event: any) => {
      if (props.noDragEventsBubbling) {
        event.stopPropagation();
      }
    };

    const onDropCb = useCallback(
      (event) => {
        event.preventDefault();
        // Persist here because we need the event later after getFilesFromEvent() is done
        event.persist();
        stopPropagation(event);

        setProgressBarPercentage(0);

        dragTargetsRef.current = [];

        if (isEventWithFiles(event)) {
          if (isPropagationStopped(event) && !noDragEventsBubbling) {
            return;
          }

          const acceptedFiles = [] as any;
          const fileRejections = [] as any;

          Array.from(event.target.files).forEach((file) => {
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

          setDisplayProgressBar('block');

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
                      setProgressBarPercentage(percentage);
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
                  },
            };
            reader.onload = (e: any) => {
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
        // onDropRejected,
        // noDragEventsBubbling,
        // getFilesFromEvent,
      ],
    );

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

    const getProps = useMemo(
      () =>
        ({ onClick = () => {}, ...rest } = {}) => ({
          onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
          ...rest,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onClickCb],
    );

    const getRootProps = useMemo(
      () =>
        ({ onClick = () => {}, ...rest } = {}) => ({
          onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
          ...rest,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onClickCb],
    );

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

    return (
      <>
        <input {...getInputProps()} />
        {childrenIsFunction() ? (
          // button
          <>{renderChildren()}</>
        ) : (
          // drop div
          <div {...getRootProps()} ref={rootRef}>
            {props.children}
          </div>
        )}
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
  const [accept, setAccept] = useState(DEFAULT_ACCEPT);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(3000000);
  const [maxFiles, setMaxFiles] = useState(1);
  const [className, setClassName] = useState('');
  const [style, setStyle] = useState({});
  const [removeButtonColor, setRemoveButtonColor] = useState('');
  const [validator, setValidator] = useState(null);
  const [noClick, setNoClick] = useState(false);
  const [noDrag, setNoDrag] = useState(false);
  const [noRemoveButton, setNoRemoveButton] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [noKeyboard, setNoKeyboard] = useState(false);
  const [noDragEventsBubbling, setNoDragEventsBubbling] = useState(false);
  const [multiple, setMultiple] = useState(false);

  const api = {
    config,
    setConfig,
    accept,
    setAccept,
    minSize,
    setMinSize,
    maxSize,
    setMaxSize,
    maxFiles,
    setMaxFiles,
    className,
    setClassName,
    style,
    setStyle,
    removeButtonColor,
    setRemoveButtonColor,
    validator,
    setValidator,
    noClick,
    setNoClick,
    noDrag,
    setNoDrag,
    noRemoveButton,
    setNoRemoveButton,
    isReset,
    setIsReset,
    disabled,
    setDisabled,
    noKeyboard,
    setNoKeyboard,
    noDragEventsBubbling,
    setNoDragEventsBubbling,
    multiple,
    setMultiple,
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
  timeout: null,

  isFileDialogActive: false,
  acceptedFiles: [],
  acceptedFile: null,
  // isFocused: false,
  // isDragActive: false,
  // isDragAccept: false,
  // isDragReject: false,
  // draggedFiles: [],
  // fileRejections: [],
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'openDialog':
      return {
        ...state,
        isFileDialogActive: true,
      };
    case 'closeDialog':
      return {
        ...state,
        isFileDialogActive: false,
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
    case 'setTimeout':
      return {
        ...state,
        timeout: action.timeout,
      };
    default:
      return state;
  }
}