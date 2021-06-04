import React from 'react';
import expect from 'expect';
import CustomReader from './CustomReader';
import renderer from 'react-test-renderer';

// eslint-disable-next-line no-undef
describe('CSVReader', () => {
  // eslint-disable-next-line no-undef
  it('should match snapshot', function () {
    const handleFileUploaded = jest.fn().mockImplementation();
    const tree = renderer
      .create(
        <CustomReader
          onFileLoaded={handleFileUploaded}
          label="Chargez votre offre"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
