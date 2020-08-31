import React, { CSSProperties } from 'react';
import PapaParse from 'papaparse';

const styles = {
  pointerCursor: {
    cursor: 'pointer',
  } as CSSProperties,
};

interface Props {
  children: any;
  data: any;
  type?: string;
  style?: any;
  className?: string;
}

export default class CSVDownloader extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
    type: 'link',
  };

  download = (data: any) => {
    // const now = new Date();
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
    link.setAttribute('download', `${'abc'}.csv`);
    link.click();
    link.remove();
  };

  render() {
    const { children, data, type, className, style } = this.props;

    return (
      <>
        {type === 'link' ? (
          <a
            onClick={() => this.download(data)}
            className={className}
            style={Object.assign({}, styles.pointerCursor, style)}
          >
            {children}
          </a>
        ) : (
          <button
            onClick={() => this.download(data)}
            className={className}
            style={Object.assign({}, styles.pointerCursor, style)}
          >
            {children}
          </button>
        )}
      </>
    );
  }
}
