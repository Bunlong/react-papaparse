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

function useCSVDownloaderComponent() {
  const CSVDownloaderComponent = ({
    children,
    data = {},
    filename,
    type = Type.Link,
    style = {},
    className = '',
    bom = false,
    config = {},
  }: Props) => {
    const download = () => {
      const bomCode = bom ? '\ufeff' : '';
      let csvContent = null;
      let csvURL = null;

      if (typeof data === 'function') {
        data = data();
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
            {children}
          </button>
        ) : (
          <a onClick={() => download()} style={style} className={className}>
            {children}
          </a>
        )}
      </>
    );
  };

  const CSVDownloader = React.useMemo(() => CSVDownloaderComponent, []) as any;

  return CSVDownloader;
}

export function useCSVDownloader() {
  const CSVDownloader = useCSVDownloaderComponent();

  return {
    CSVDownloader,
    Type,
  };
}
