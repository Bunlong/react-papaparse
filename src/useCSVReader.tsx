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
import { ParseResult } from 'papaparse';
import { CustomConfig } from './model';
import {
  composeEventHandlers,
  onDocumentDragOver,
  isEventWithFiles,
} from './utils';
import ProgressBar from './ProgressBar';

// const DEFAULT_ACCEPT = 'text/csv, .csv, application/vnd.ms-excel';

// const cssProperty = {
//   inputFile: {
//     display: 'none',
//   } as CSSProperties,
// };

export interface Props<T> {
  children: (fn: any) => void | ReactNode;
  onUploadAccepted?: (data: ParseResult<T>, file?: any, event?: any) => void;
  onDragLeave?: (event?: any) => void;
  onDragOver?: (event?: any) => void;
  disabled?: boolean;
  noClick?: boolean;
  noDrag?: boolean;
  noDragEventsBubbling?: boolean;
  preventDropOnDocument?: boolean;
  noKeyboard?: boolean;
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
  disabled?: boolean;
  setDisabled?: () => void;
}

function useCSVReaderComponent<T = any>(api: Api<T>) {
  const CSVReaderComponent = (props: Props<T>) => {
    // Use variables from api as global
    const { accept, disabled, setDisabled, noDrag, setNoDrag } = CSVReader.api;

    const {
      noDragEventsBubbling = false,
      preventDropOnDocument = true,
      noKeyboard = false,
      onDragLeave,
      onDragOver,
    } = props;

    const inputRef: any = useRef<ReactNode>(null);
    const rootRef: any = useRef<ReactNode>(null);

    const [state, dispatch] = useReducer(reducer, initialState);

    console.log(dispatch);

    const {
      acceptedFile,
      progressBarPercentage,
      displayProgressBar,

      draggedFiles,
    } = state;

    // global

    useEffect(() => {
      const { disabled, noDrag } = props;
      disabled && setDisabled(disabled);
      noDrag && setNoDrag(noDrag);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderChildren = () => {
      const { children, onUploadAccepted } = props;

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
          isButton
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

        alert('OnDrop');
        console.log(draggedFiles);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    // Cb to open the file dialog when click occurs on the dropzone
    const onClickCb = useCallback(() => {
      // if (noClick) {
      //   return;
      // }
      // In IE11/Edge the file-browser dialog is blocking, therefore, use setTimeout()
      // to ensure React can handle state changes
      // if (isIeOrEdge()) {
      //   setTimeout(openFileDialog, 0);
      // } else {
      //   openFileDialog();
      // }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      inputRef,
      // noClick,
    ]);

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
      (event) => {
        allowDrop(event);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
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
      // if (inputRef.current && state.displayProgressBarStatus) {
      if (inputRef.current) {
        dispatch({ type: 'openDialog' });
        inputRef.current.value = null;
        inputRef.current.click();
      }
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
          onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
          onDrop: composeDragHandler(composeEventHandlers(onDrop, onDropCb)),
          onDragEnter: composeDragHandler(
            composeEventHandlers(onDragEnter, onDragEnterCb),
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
        ({ /*onClick = () => {},*/ ...rest } = {}) => ({
          // onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
          ...rest,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        /*onClickCb*/
      ],
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

  const api = {
    config,
    setConfig,
    noDrag,
    setNoDrag,
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
    default:
      return state;
  }
}
