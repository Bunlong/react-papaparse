import React from 'react';
import PapaParse from 'papaparse';

export const LINK_TYPE = 'link';
export const BUTTON_TYPE = 'button';

export interface Props {
  children: React.ReactNode;
  data: any;
  filename: string;
  type?: 'link' | 'button';
  style?: any;
  className?: string;
  bom?: boolean;
}

export default class CSVDownloader extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    type: LINK_TYPE,
  };

  download = (data: any, filename: string, bom: boolean): void => {
    const bomCode = bom ? '\ufeff' : '';
    let csvContent = null;

    if (typeof data === 'object') {
      csvContent = PapaParse.unparse(data);
    } else {
      csvContent = data;
    }

    const encodedDataUrl = encodeURI(
      `data:text/csv;charset=utf8,${bomCode}${csvContent}`,
    );
    const link = document.createElement('a');

    link.setAttribute('href', encodedDataUrl);
    link.setAttribute('download', `${filename}.csv`);
    link.click();
    link.remove();
  };

  render(): React.ReactNode {
    const {
      children,
      data,
      filename,
      type,
      className,
      style,
      bom = false,
    } = this.props;

    if (type === LINK_TYPE) {
      return (
        <a
          onClick={() => this.download(data, filename, bom)}
          className={className}
          style={style}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        onClick={() => this.download(data, filename, bom)}
        className={className}
        style={style}
      >
        {children}
      </button>
    );
  }
}
