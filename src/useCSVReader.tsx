import React from 'react';

export interface Props {
}

export interface Api {
}

function useCSVReaderComponent(api: Api) {
  const CSVReaderComponent = (props: Props) => {
    return (
      <>
        Hello
      </>
    );
  }

  const CSVReader = React.useMemo(
    () => CSVReaderComponent,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  ) as any;

  CSVReader.api = api;

  return CSVReader;
}

export function useCSVReader() {

}
