import expect from 'expect'

import getSize from '../src/util'

// eslint-disable-next-line no-undef
describe('util', () => {
  // eslint-disable-next-line no-undef
  it('should return 1 KB', function() {
    const strSize = getSize(1000)
    expect(strSize).toEqual('1 KB')
  })
})

// https://github.com/facebook/jest/issues/3457
// https://jestjs.io/docs/en/expect.html
// https://enzymejs.github.io/enzyme/

// https://github.com/react-csv/react-csv/blob/master/test/ComponentsSpec.js
// https://github.com/react-csv/react-csv/blob/master/test/coreSpec.js
