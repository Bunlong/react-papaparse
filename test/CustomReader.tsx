import React from 'react';
import { useCSVReader } from '../src/react-papaparse';

interface CustomReaderProps {
  onUploadAccepted?: ((data: any, file?: any) => void) | undefined;
  label: string;
}

const CustomReader: React.FC<CustomReaderProps> = (
  props: CustomReaderProps
) => {
  const { CSVReader } = useCSVReader<void, HTMLButtonElement>();
  const { onUploadAccepted, label } = props;

  return (
    <CSVReader onUploadAccepted={onUploadAccepted}>
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
        <>
          <div>
            <button type='button' {...getRootProps()}>
              {label}
            </button>
            <div>{acceptedFile && acceptedFile.name}</div>
            <button {...getRemoveFileProps()}>Remove</button>
          </div>
          <ProgressBar />
        </>
      )}
    </CSVReader>
  );
};

export default CustomReader;
