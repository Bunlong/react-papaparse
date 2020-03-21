import expect from 'expect'

import { jsonToCSV } from '../src/jsonToCSV'

// eslint-disable-next-line no-undef
describe('jsonToCSV', () => {
  // eslint-disable-next-line no-undef
  it('should return a csv format as expected', function() {
    const fixtures = `[
      {
        "Column 1": "1-1",
        "Column 2": "1-2",
        "Column 3": "1-3",
        "Column 4": "1-4"
      },
      {
        "Column 1": "2-1",
        "Column 2": "2-2",
        "Column 3": "2-3",
        "Column 4": "2-4"
      },
      {
        "Column 1": "3-1",
        "Column 2": "3-2",
        "Column 3": "3-3",
        "Column 4": "3-4"
      },
      {
        "Column 1": 4,
        "Column 2": 5,
        "Column 3": 6,
        "Column 4": 7
      }
    ]`
    const expected = `Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`

    const actual = jsonToCSV(fixtures)

    expect(typeof actual).toBe('string')
    expect(actual.split('\r\n').join('')).toEqual(expected.split('\n').join(''))
  })
})
