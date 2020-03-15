import expect from 'expect'

import getSize from '../src/util'

describe('Util', () => {
  it('should return 1 K', function() {
    const strSize = getSize(1000)
    expect(strSize).toEqual('1 KB')
  })
})
