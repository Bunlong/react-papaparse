import expect from 'expect'
import { formatFileSize } from '../src/utils'

// eslint-disable-next-line no-undef
describe('util', () => {
  // eslint-disable-next-line no-undef
  it('should return 1 KB', function() {
    const strSize = formatFileSize(1000)
    expect(strSize).toEqual('1 KB')
  })
})

// ======= Docs =======
// https://github.com/facebook/jest/issues/3457
// https://jestjs.io/docs/en/expect.html
// https://enzymejs.github.io/enzyme/
// ====================
