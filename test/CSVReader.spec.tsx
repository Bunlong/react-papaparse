/**
 * @jest-environment jsdom
 */

import React from 'react';
// import expect from 'expect';
import CustomReader from './CustomReader';
import renderer from 'react-test-renderer';

// eslint-disable-next-line no-undef
describe('CSVReader', () => {
  // eslint-disable-next-line no-undef
  it('should match snapshot', async function () {
    const handleUploadAccepted = jest.fn().mockImplementation();
    const tree = renderer
      .create(
        <CustomReader
          onUploadAccepted={handleUploadAccepted}
          label="Chargez votre offre"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
