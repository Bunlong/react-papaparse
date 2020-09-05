import React from 'react';
import PapaParse from 'papaparse';

interface Props {
  children: any;
  data: any;
  filename: string;
  type?: string;
  style?: any;
  className?: string;
}

export default class CSVDownloader extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    type: 'link',
  };

  download = (data: any, filename: string) => {
    let csvContent = null;
    if (typeof data === 'object') {
      csvContent = PapaParse.unparse(data);
    } else {
      csvContent = data;
    }

    const encodedDataUrl = encodeURI(
      `data:text/csv;charset=utf8,${csvContent}`,
    );
    const link = document.createElement('a');
    link.setAttribute('href', encodedDataUrl);
    link.setAttribute('download', `${filename}.csv`);
    link.click();
    link.remove();
  };

  render() {
    const { children, data, filename, type, className, style } = this.props;

    return (
      <>
        {type === 'link' ? (
          <a
            onClick={() => this.download(data, filename)}
            className={className}
            style={style}
          >
            {children}
          </a>
        ) : (
          <button
            onClick={() => this.download(data, filename)}
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
