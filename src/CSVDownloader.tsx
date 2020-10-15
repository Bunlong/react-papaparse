import React from 'react';
import PapaParse from 'papaparse';

interface Props {
  children: any;
  data: any;
  filename: string;
  type?: string;
  style?: any;
  className?: string;
  bom?: boolean;
}

export default class CSVDownloader extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    type: 'link',
  };

  download = (data: any, filename: string, bom: boolean) => {
    const bomCode = bom !== false ? '\ufeff' : '';
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

  render() {
    const {
      children,
      data,
      filename,
      type,
      className,
      style,
      bom = false,
    } = this.props;

    return (
      <>
        {type === 'link' ? (
          <a
            onClick={() => this.download(data, filename, bom)}
            className={className}
            style={style}
          >
            {children}
          </a>
        ) : (
          <button
            onClick={() => this.download(data, filename, bom)}
            className={className}
            style={style}
          >
            {children}
          </button>
        )}
      </>
    );
  }
}
