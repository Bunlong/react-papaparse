import React from 'react';
import { /*PapaParse,*/ ParseResult } from 'papaparse';
import { CustomConfig } from './model';

const DEFAULT_ACCEPT = 'text/csv, .csv, application/vnd.ms-excel';

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
}

function useCSVReaderComponent<T = any>(api: Api<T>) {
  const CSVReaderComponent = (props: Props<T>) => {
    console.log(props);

    return <>Hello</>;
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
  } as Api<T>;

  const CSVReader = useCSVReaderComponent(api);

  return {
    ...api,
    CSVReader,
  };
}
