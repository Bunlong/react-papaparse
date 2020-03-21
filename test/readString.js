import expect from 'expect'

import { readString } from '../src/readString'

describe('readString', () => {
  it('should return an array', function() {
    const str = `Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`
    const data = [
      ['Column 1', 'Column 2', 'Column 3', 'Column 4'],
      ['1-1', '1-2', '1-3', '1-4'],
      ['2-1', '2-2', '2-3', '2-4'],
      ['3-1', '3-2', '3-3', '3-4'],
      ['4', '5', '6', '7']
    ]

    const results = readString(str)

    expect(results.data).toEqual(data)
  })
})
