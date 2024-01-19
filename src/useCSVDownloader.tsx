import React from 'react';
import PapaParse, { UnparseConfig } from 'papaparse';

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorAttributes = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type CommonButtonAnchorProps = Pick<
  ButtonAttributes & AnchorAttributes,
  Exclude<keyof ButtonAttributes, keyof AnchorAttributes>
>;

const Type = {
  Link: 'link',
  Button: 'button',
} as const;

interface _Props {
  children: React.ReactNode;
  data: any;
  filename: string;
  type?: 'link' | 'button';
  style?: any;
  className?: string;
  bom?: boolean;
  config?: UnparseConfig;
}
export type Props = _Props & CommonButtonAnchorProps;

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
    ...props
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

    return (
      <>
        {type === Type.Button ? (
          <button
            onClick={() => download()}
            style={style}
            className={className}
            {...props}
          >
            {children}
          </button>
        ) : (
          <a
            onClick={() => download()}
            style={style}
            className={className}
            {...props}
          >
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
