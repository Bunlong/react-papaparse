import PapaParse, { type UnparseConfig } from 'papaparse';
import React from 'react';

const Type = {
  Link: 'link',
  Button: 'button',
} as const;

export type Props = {
  children?: React.ReactNode;
  data: any;
  filename: string;
  bom?: boolean;
  config?: UnparseConfig;
} & (
  | {
      style?: any;
      className?: string;
      type?: 'link' | 'button';
      component?: never;
    }
  | {
      style?: never;
      className?: never;
      type?: never;
      component?: (
        props: React.ComponentPropsWithoutRef<'button'>,
      ) => React.JSX.Element;
    }
);

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
    component: Component,
  }: Props) => {
    const download = async () => {
      const bomCode = bom ? '\ufeff' : '';
      let csvContent = null;
      let csvURL = null;

      if (typeof data === 'function') {
        data = await data();
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

    if (Component)
      return <Component onClick={() => download()}>{children}</Component>;

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

  const CSVDownloader = React.useMemo(() => CSVDownloaderComponent, []);

  return CSVDownloader;
}

export function useCSVDownloader() {
  const CSVDownloader = useCSVDownloaderComponent();

  return {
    CSVDownloader,
    Type,
  };
}
