import React, { useCallback } from 'react';
import Papa, { UnparseConfig } from 'papaparse';

export const Type = {
  Link: 'link',
  Button: 'button',
} as const;

type DownloadType = (typeof Type)[keyof typeof Type];

export interface Props {
  children: React.ReactNode;
  data: unknown | (() => unknown | Promise<unknown>);
  filename: string;
  type?: DownloadType;
  style?: React.CSSProperties;
  className?: string;
  bom?: boolean;
  config?: UnparseConfig;
}

const CSVDownloaderComponent: React.FC<Props> = ({
  children,
  data,
  filename,
  type = Type.Link,
  style,
  className,
  bom = false,
  config = {},
}) => {
  const download = useCallback(async () => {
    const bomCode = bom ? '\ufeff' : '';

    const resolvedData = typeof data === 'function' ? await data() : data;

    const csvContent =
      typeof resolvedData === 'object'
        ? Papa.unparse(resolvedData as any, config)
        : String(resolvedData);

    const csvBlob = new Blob([`${bomCode}${csvContent}`], {
      type: 'text/csv;charset=utf-8;',
    });

    const nav = window.navigator as Navigator & {
      msSaveBlob?: (blob: Blob, filename: string) => void;
    };

    if (nav.msSaveBlob) {
      nav.msSaveBlob(csvBlob, `${filename}.csv`);
      return;
    }

    const url = URL.createObjectURL(csvBlob);

    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.csv`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      URL.revokeObjectURL(url);
    }
  }, [data, filename, bom, config]);

  if (type === Type.Button) {
    return (
      <button
        type="button"
        onClick={download}
        style={style}
        className={className}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        void download();
      }}
      style={style}
      className={className}
    >
      {children}
    </a>
  );
};

export function useCSVDownloader() {
  return {
    CSVDownloader: CSVDownloaderComponent,
    Type,
  };
}
