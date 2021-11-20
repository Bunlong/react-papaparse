import React, { CSSProperties, useReducer, useCallback, useMemo } from 'react';
import { /*PapaParse,*/ ParseResult } from 'papaparse';
import { CustomConfig } from './model';
import { isIeOrEdge, composeEventHandlers } from './utils';

const DEFAULT_ACCEPT = 'text/csv, .csv, application/vnd.ms-excel';

const cssProperty = {
  inputFile: {
    display: 'none',
  } as CSSProperties,
};

export interface Props<T> {
  children: React.ReactNode;
  config?: CustomConfig<T>;
  accept?: string;
  className?: string;
  style?: any;
  progressBarColor?: string;
  removeButtonColor?: string;
  onDrop?: (data: Array<ParseResult<T>>, file?: any) => void;
  onFileLoad?: (data: Array<ParseResult<T>>, file?: any) => void;
  onError?: (err: any, file: any, inputElem: any, reason: any) => void;
  onRemoveFile?: (data: null) => void;
  disabled?: boolean;
  noClick?: boolean;
  noDrag?: boolean;
  noRemoveButton?: boolean;
  noProgressBar?: boolean;
  isReset?: boolean;
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
  className?: string;
  setClassName?: () => void;
  style?: any;
  setStyle?: () => void;
  progressBarColor?: string;
  setProgressBarColor?: () => void;
  removeButtonColor?: string;
  setRemoveButtonColor?: () => void;

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
    } = CSVReader.api;

    const inputFileRef: any = React.useRef<React.ReactNode>(null);

    const [state, dispatch] = useReducer(reducer, initialState);

    console.log(state);

    React.useEffect(() => {
      const { config, accept } = props;
      config && setConfig(config);
      accept && setAccept(accept);
      disabled && setDisabled(disabled);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const childrenIsFunction = () => {
      return typeof props.children === 'function';
    };

    // Fn for opening the file dialog programmatically
    const openFileDialog = useCallback(() => {
      // if (inputFileRef.current && state.displayProgressBarStatus) {
      if (inputFileRef.current) {
        dispatch({ type: 'openDialog' });
        inputFileRef.current.value = null;
        inputFileRef.current.click();
      }
    }, [dispatch]);

    // Cb to open the file dialog when click occurs on the dropzone
    const onClickCb = useCallback(() => {
      if (noClick) {
        return;
      }

      // In IE11/Edge the file-browser dialog is blocking, therefore, use setTimeout()
      // to ensure React can handle state changes
      // See: https://github.com/react-dropzone/react-dropzone/issues/450
      if (isIeOrEdge()) {
        setTimeout(openFileDialog, 0);
      } else {
        openFileDialog();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputFileRef, noClick]);

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

    return (
      <>
        <input
          type="file"
          accept={accept || DEFAULT_ACCEPT}
          ref={inputFileRef}
          style={cssProperty.inputFile}
        />
        {!childrenIsFunction() ? (
          <div
            {...getProps()}
          >
            {props.children}
          </div>
        ) : (
          <div>
            {props.children}
          </div>
        )}
      </>
    );
  };

  const CSVReader = React.useMemo(
    () => CSVReaderComponent,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  ) as any;

  CSVReader.api = api;

  return CSVReader;
}

export function useCSVReader<T = any>() {
  const [config, setConfig] = React.useState({});
  const [accept, setAccept] = React.useState(DEFAULT_ACCEPT);
  const [className, setClassName] = React.useState('');
  const [style, setStyle] = React.useState({});
  const [progressBarColor, setProgressBarColor] = React.useState('');
  const [removeButtonColor, setRemoveButtonColor] = React.useState('');
  const [noClick, setNoClick] = React.useState(false);
  const [noDrag, setNoDrag] = React.useState(false);
  const [noRemoveButton, setNoRemoveButton] = React.useState(false);
  const [noProgressBar, setNoProgressBar] = React.useState(false);
  const [isReset, setIsReset] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const api = {
    config,
    setConfig,
    accept,
    setAccept,
    className,
    setClassName,
    style,
    setStyle,
    progressBarColor,
    setProgressBarColor,
    removeButtonColor,
    setRemoveButtonColor,
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
  } as Api<T>;

  const CSVReader = useCSVReaderComponent(api);

  return {
    ...api,
    CSVReader,
  };
}

const initialState = {
  // isFocused: false,
  // isDragActive: false,
  // isDragAccept: false,
  // isDragReject: false,
  // draggedFiles: [],
  // acceptedFiles: [],
  // fileRejections: [],
  displayProgressBarStatus: 'none',
  isFileDialogActive: false,
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
