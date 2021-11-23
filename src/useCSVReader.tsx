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
import { /*PapaParse,*/ ParseResult } from 'papaparse';
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
  progressBarColor?: string;
  removeButtonColor?: string;
  validator?: (file: any) => void;
  onDrop?: (data: Array<ParseResult<T>>, file?: any) => void;
  onFileLoad?: (data: Array<ParseResult<T>>, file?: any) => void;
  onError?: (err: any, file: any, inputElem: any, reason: any) => void;
  onRemoveFile?: (data: null) => void;
  onFileDialogCancel?: () => void;
  disabled?: boolean;
  noClick?: boolean;
  noDrag?: boolean;
  noRemoveButton?: boolean;
  noProgressBar?: boolean;
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
  progressBarColor?: string;
  setProgressBarColor?: () => void;
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
  noProgressBar?: boolean;
  setNoProgressBar?: () => void;
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
      // config,
      setConfig,
      accept,
      setAccept,
      noClick,
      // setNoClick,
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

    const inputRef: any = useRef<ReactNode>(null);
    const rootRef: any = useRef<ReactNode>(null);
    const dragTargetsRef = useRef([]);

    const [state, dispatch] = useReducer(reducer, initialState);
    const { isFileDialogActive } = state;

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

    const renderChildren = () => {
      const { children } = props;
      return childrenIsFunction() ? children(getProps) : children;
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

          console.log('11111111111111111111');
          console.log(acceptedFiles);
          console.log(fileRejections);
          console.log('11111111111111111111');

          // dispatch({
          //   acceptedFiles,
          //   fileRejections,
          //   type: 'setFiles'
          // })

          // if (onDrop) {
          //   onDrop(acceptedFiles, fileRejections, event)
          // }

          // if (fileRejections.length > 0 && onDropRejected) {
          //   onDropRejected(fileRejections, event)
          // }

          // if (acceptedFiles.length > 0 && onDropAccepted) {
          //   onDropAccepted(acceptedFiles, event)
          // }
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
        // getFilesFromEvent,
        // onDrop,
        // onDropAccepted,
        // onDropRejected,
        // noDragEventsBubbling,
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
  const [progressBarColor, setProgressBarColor] = useState('');
  const [removeButtonColor, setRemoveButtonColor] = useState('');
  const [validator, setValidator] = useState(null);
  const [noClick, setNoClick] = useState(false);
  const [noDrag, setNoDrag] = useState(false);
  const [noRemoveButton, setNoRemoveButton] = useState(false);
  const [noProgressBar, setNoProgressBar] = useState(false);
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
    progressBarColor,
    setProgressBarColor,
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
    noProgressBar,
    setNoProgressBar,
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
  displayProgressBarStatus: 'none',
  isFileDialogActive: false,
  // isFocused: false,
  // isDragActive: false,
  // isDragAccept: false,
  // isDragReject: false,
  // draggedFiles: [],
  // acceptedFiles: [],
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
    default:
      return state;
  }
}
