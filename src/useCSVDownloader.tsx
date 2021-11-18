import React from 'react';
import PapaParse, { UnparseConfig } from 'papaparse';

const Type = {
  Link: 'link',
  Button: 'button',
} as const;

export interface Props {
  children: React.ReactNode;
  data: any;
  filename: string;
  type?: 'link' | 'button';
  style?: any;
  className?: string;
  bom?: boolean;
  config?: UnparseConfig;
}

export interface Api {
  data: any;
  setData?: () => void;
  filename: string;
  setFilename?: () => void;
  type: string;
  setType: () => void;
  style?: any;
  setStyle?: () => void;
  className?: any;
  setClassName?: () => void;
  bom?: boolean;
  setBom?: () => void;
  config?: UnparseConfig;
  setConfig?: () => void;
}

function useCSVDownloaderComponent(api: Api) {
  const CSVDownloaderComponent = (props: Props) => {
    const {
      setData,
      data,
      setFilename,
      filename,
      setType,
      type,
      setStyle,
      style,
      className,
      setClassName,
      bom,
      setBom,
      config,
      setConfig,
    } = CSVDownloader.api;

    React.useEffect(() => {
      const { data, filename, type, style, className, bom, config } = props;
      setData(data);
      setFilename(filename);
      type && setType(type);
      style && setStyle(style);
      className && setClassName(className);
      bom && setBom(bom);
      config && setConfig(config);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const download = () => {
      const bomCode = bom ? '\ufeff' : '';
      let csvContent = null;
      let csvURL = null;

      if (typeof data === 'function') {
        setData(data());
      }

      if (typeof data === 'object') {
        csvContent = PapaParse.unparse(data, config);
      } else {
        csvContent = data;
      }

      const csvData = new Blob([`${bomCode}${csvContent}`], {
        type: 'text/csv;charset=utf-8;',
      });

      const navObj: any = window.navigator;
      if (navObj.msSaveBlob) {
        csvURL = navObj.msSaveBlob(csvData, `${filename}.csv`);
      } else {
        csvURL = window.URL.createObjectURL(csvData);
      }

      const link = document.createElement('a');
      link.href = csvURL as string;
      link.setAttribute('download', `${filename}.csv`);
      link.click();
      link.remove();
    };

    return (
      <>
        {type === Type.Button ? (
          <button
            onClick={() => download()}
            style={style}
            className={className}
          >
            {props.children}
          </button>
        ) : (
          <a onClick={() => download()} style={style} className={className}>
            {props.children}
          </a>
        )}
      </>
    );
  };

  const CSVDownloader = React.useMemo(
    () => CSVDownloaderComponent,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  ) as any;

  CSVDownloader.api = api;

  return CSVDownloader;
}

export function useCSVDownloader() {
  const [data, setData] = React.useState({});
  const [filename, setFilename] = React.useState({});
  const [type, setType] = React.useState(Type.Link);
  const [style, setStyle] = React.useState({});
  const [className, setClassName] = React.useState('');
  const [bom, setBom] = React.useState(false);
  const [config, setConfig] = React.useState({});
  const api = {
    data,
    setData,
    filename,
    setFilename,
    type,
    setType,
    style,
    setStyle,
    className,
    setClassName,
    bom,
    setBom,
    config,
    setConfig,
  } as Api;

  const CSVDownloader = useCSVDownloaderComponent(api);

  return {
    ...api,
    CSVDownloader,
    Type,
  };
}
