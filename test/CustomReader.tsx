import React from 'react';
import { CSVReader } from '../src/react-papaparse';

interface CustomReaderProps {
  onFileLoaded?: ((data: any, file?: any) => void) | undefined;
  label: string;
}

const CustomReader: React.FC<CustomReaderProps> = (
  props: CustomReaderProps
) => {
  const { onFileLoaded, label } = props;

  return (
    <CSVReader onFileLoad={onFileLoaded}>
      <span>{label}</span>
    </CSVReader>
  );
};

export default CustomReader;
