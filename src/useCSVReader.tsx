/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  ReactNode,
  useRef,
} from 'react';
import PapaParse, { ParseResult } from 'papaparse';
import { CSVReaderConfig } from './model';
import {
  composeEventHandlers,
  isIeOrEdge,
  isEventWithFiles,
  isPropagationStopped,
  fileAccepted,
  fileMatchSize,
  TOO_MANY_FILES_REJECTION,
  onDocumentDragOver,
} from './utils';
import ProgressBar from './ProgressBar';
import Remove, { Props as RemoveComponentProps } from './Remove';

// 'text/csv' for MacOS
// '.csv' for Linux
// 'application/vnd.ms-excel' for Window 10
const DEFAULT_ACCEPT = 'text/csv, .csv, application/vnd.ms-excel';

export interface Props<T> {
  children: (fn: any) => void | ReactNode;
  accept?: string;
  config?: CSVReaderConfig<T>;
  minSize?: number;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  noClick?: boolean;
  noDrag?: boolean;
  noDragEventsBubbling?: boolean;
  noKeyboard?: boolean;
  multiple?: boolean;
  required?: boolean;
  preventDropOnDocument?: boolean;
  onUploadAccepted?: (
    data: ParseResult<T>,
    file?: File,
    event?: DragEvent | Event,
  ) => void;
  onUploadRejected?: (file?: File, event?: DragEvent | Event) => void;
  validator?: (file: File) => void;
  onDragEnter?: (event?: DragEvent) => void;
  onDragOver?: (event?: DragEvent) => void;
  onDragLeave?: (event?: DragEvent) => void;
}

export interface ProgressBarComponentProp {
  style?: any;
  className?: string;
}

function useCSVReaderComponent<T = any>() {
  const CSVReaderComponent = ({
    children,
    accept = DEFAULT_ACCEPT,
    config = {},
    minSize = 0,
    maxSize = Infinity,
    maxFiles = 1,
    disabled = false,
    noClick = false,
    noDrag = false,
    noDragEventsBubbling = false,
    noKeyboard = false,
    multiple = false,
    required = false,
    preventDropOnDocument = true,
    onUploadAccepted,
    validator,
    onUploadRejected,
    onDragEnter,
    onDragOver,
    onDragLeave,
  }: Props<T>) => {
    const inputRef: any = useRef<ReactNode>(null);
    const rootRef: any = useRef<ReactNode>(null);
    const dragTargetsRef = useRef([]);

    const [state, dispatch] = useReducer(reducer, initialState);
    const {
      acceptedFile,
      displayProgressBar,
      progressBarPercentage,
      draggedFiles,
      isFileDialogActive,
    } = state;

    const onDocumentDrop = (event: DragEvent) => {
      if (rootRef.current && rootRef.current.contains(event.target)) {
        // If we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
        return;
      }
      event.preventDefault();
      dragTargetsRef.current = [];
    };

    useEffect(() => {
      if (preventDropOnDocument) {
        document.addEventListener('dragover', onDocumentDragOver, false);
        document.addEventListener('drop', onDocumentDrop, false);
      }

      return () => {
        if (preventDropOnDocument) {
          document.removeEventListener('dragover', onDocumentDragOver);
          document.removeEventListener('drop', onDocumentDrop);
        }
      };
    }, [rootRef, preventDropOnDocument]);

    // == GLOBAL ==
    const composeHandler = (fn: any) => {
      return disabled ? null : fn;
    };

    const composeDragHandler = (fn: any) => {
      return noDrag ? null : composeHandler(fn);
    };

    const stopPropagation = (event: Event) => {
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

    const setDisplayProgressBar = (display: string) => {
      dispatch({
        displayProgressBar: display,
        type: 'setDisplayProgressBar',
      });
    };

    const setProgressBarPercentage = (percentage: number) => {
      dispatch({
        progressBarPercentage: percentage,
        type: 'setProgressBarPercentage',
      });
    };

    const ProgressBarComponent = (props: ProgressBarComponentProp) => {
      return (
        <ProgressBar
          display={displayProgressBar}
          percentage={progressBarPercentage}
          {...props}
        />
      );
    };

    const RemoveComponent = (props: RemoveComponentProps) => {
      return <Remove {...props} />;
    };

    const renderChildren = () => {
      return children({
        getRootProps,
        acceptedFile,
        ProgressBar: ProgressBarComponent,
        getRemoveFileProps,
        Remove: RemoveComponent,
      });
    };

    // Fn for opening the file dialog programmatically
    const openFileDialog = useCallback(() => {
      if (inputRef.current && state.displayProgressBar) {
        dispatch({ type: 'openDialog' });
        inputRef.current.value = null;
        inputRef.current.click();
      }
    }, [dispatch]);

    // Update file dialog active state when the window is focused on
    const onWindowFocus = () => {
      // Execute the timeout only if the file dialog is opened in the browser
      if (isFileDialogActive) {
        setTimeout(() => {
          if (inputRef.current) {
            const { files } = inputRef.current;

            if (!files.length) {
              dispatch({ type: 'closeDialog' });
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
    }, [inputRef, isFileDialogActive]);

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
    }, [inputRef, noClick]);

    const onDropCb = useCallback(
      (event: any) => {
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
            const customErrors = validator ? validator(file as File) : null;

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
            acceptedFiles.forEach((file: File) => {
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

          if (fileRejections.length > 0 && onUploadRejected) {
            onUploadRejected(fileRejections, event);
          }

          if (acceptedFiles.length > 0 && onUploadAccepted) {
            let configs = {} as any;
            const data: any = [];
            const errors: any = [];
            let meta: any = {};
            const reader = new window.FileReader();
            let percentage = 0;

            acceptedFiles.forEach((file: File) => {
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
                        onUploadAccepted(obj, file);
                      },
                step: config?.step
                  ? config.step
                  : (row: any) => {
                      data.push(row.data);
                      if (row.errors.length > 0) {
                        errors.push(row.errors);
                      }
                      if (Object.keys(row.meta).length > 0) {
                        meta = row.meta;
                      }
                      if (config && config.preview) {
                        percentage = Math.round(
                          (data.length / config.preview) * 100,
                        );
                        // setProgressBarPercentage(percentage);
                        if (data.length === config.preview) {
                          const obj = { data, errors, meta };
                          onUploadAccepted(obj, file);
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
              configs = Object.assign({}, config, configs);

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
        }
        // dispatch({ type: 'reset' });
      },
      [
        multiple,
        accept,
        minSize,
        maxSize,
        maxFiles,
        validator,
        onUploadAccepted,
      ],
    );

    const onInputElementClick = useCallback((event) => {
      stopPropagation(event);
    }, []);
    // ============

    // == BUTTON | DROP ==
    const composeKeyboardHandler = (fn: any) => {
      return noKeyboard ? null : composeHandler(fn);
    };

    const onDragEnterCb = useCallback(
      (event: DragEvent) => {
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
      [onDragEnter, noDragEventsBubbling],
    );

    const onDragOverCb = useCallback(
      (event: DragEvent) => {
        allowDrop(event);

        const hasFiles = isEventWithFiles(event);
        if (hasFiles && event.dataTransfer) {
          try {
            event.dataTransfer.dropEffect = 'copy';
          } catch {}
        }

        if (hasFiles && onDragOver) {
          onDragOver(event);
        }

        return false;
      },
      [onDragOver, noDragEventsBubbling],
    );

    const onDragLeaveCb = useCallback(
      (event: DragEvent) => {
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
      [rootRef, onDragLeave, noDragEventsBubbling],
    );

    // Cb to open the file dialog when SPACE/ENTER occurs on the dropzone
    const onKeyDownCb = useCallback(
      (event: KeyboardEvent) => {
        // Ignore keyboard events bubbling up the DOM tree
        if (!rootRef.current || !rootRef.current.isEqualNode(event.target)) {
          return;
        }

        if (event.key === 'Space' || event.key === 'Enter') {
          event.preventDefault();
          openFileDialog();
        }
      },
      [rootRef, inputRef],
    );

    // Update focus state for the dropzone
    const onFocusCb = useCallback(() => {
      dispatch({ type: 'focus' });
    }, []);

    const onBlurCb = useCallback(() => {
      dispatch({ type: 'blur' });
    }, []);

    const getRootProps = useMemo(
      () =>
        ({
          onClick = () => {},
          onDrop = () => {},
          onDragOver = () => {},
          onDragLeave = () => {},
          onKeyDown = () => {},
          onFocus = () => {},
          onBlur = () => {},
          onDragEnter = () => {},
          // refKey = rootRef,
          ...rest
        } = {}) => ({
          onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
          onDrop: composeDragHandler(composeEventHandlers(onDrop, onDropCb)),
          onDragEnter: composeDragHandler(
            composeEventHandlers(onDragEnter, onDragEnterCb),
          ),
          onDragOver: composeDragHandler(
            composeEventHandlers(onDragOver, onDragOverCb),
          ),
          onDragLeave: composeDragHandler(
            composeEventHandlers(onDragLeave, onDragLeaveCb),
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
          // [refKey]: rootRef,
          ...rest,
        }),
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
    // ===================

    // == INPUT ==
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
            multiple,
            required,
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
      [inputRef, accept, onDropCb, disabled],
    );
    // ===========

    const removeFileProgrammaticallyCb = useCallback((event: Event) => {
      inputRef.current.value = '';
      dispatch({ type: 'reset' });
      // To prevent a parents onclick event from firing when a child is clicked
      event.stopPropagation();
    }, []);

    const getRemoveFileProps = useMemo(
      () =>
        ({ onClick = () => {}, ...rest } = {}) => ({
          onClick: composeHandler(
            composeEventHandlers(onClick, removeFileProgrammaticallyCb),
          ),
          ...rest,
        }),
      [removeFileProgrammaticallyCb],
    );

    return (
      <>
        <input {...getInputProps()} />
        {renderChildren()}
      </>
    );
  };

  const CSVReader = useMemo(() => CSVReaderComponent, []) as any;

  return CSVReader;
}

export function useCSVReader() {
  const CSVReader = useCSVReaderComponent();

  return {
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
    case 'setDisplayProgressBar':
      return {
        ...state,
        displayProgressBar: action.displayProgressBar,
      };
    case 'setProgressBarPercentage':
      return {
        ...state,
        progressBarPercentage: action.progressBarPercentage,
      };
    case 'setDraggedFiles':
      /* eslint no-case-declarations: 0 */
      const { isDragActive, draggedFiles } = action;
      return {
        ...state,
        draggedFiles,
        isDragActive,
      };
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
    case 'reset':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
