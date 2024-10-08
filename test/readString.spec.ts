import expect from 'expect';
import { readString } from '../src/readString';

describe('readString', () => {
  it('should return an array as expected', function() {
    const fixtures = `Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`;
    const expected = [
      ['Column 1', 'Column 2', 'Column 3', 'Column 4'],
      ['1-1', '1-2', '1-3', '1-4'],
      ['2-1', '2-2', '2-3', '2-4'],
      ['3-1', '3-2', '3-3', '3-4'],
      ['4', '5', '6', '7'],
    ];
    readString(fixtures, {
      worker: true,
      complete: (results: { data: string[][]; }) => {
        expect(Array.isArray(results.data)).toBe(true);
        expect(results.data).toEqual(expected);
      },
    });
  });

  it('should return an array as expected without config', function() {
    const fixtures = `Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`;
    const expected = {
      "data": [
        ["Column 1", "Column 2", "Column 3", "Column 4"],
        ["1-1", "1-2", "1-3", "1-4"],
        ["2-1", "2-2", "2-3", "2-4"],
        ["3-1", "3-2", "3-3", "3-4"],
        ["4", "5", "6", "7"]
      ],
      "errors": [],
      "meta": {
        "aborted": false,
        "cursor": 91,
        "delimiter": ",",
        "linebreak": "\n",
        "truncated": false
      }
    };
    const result = readString(fixtures);
    expect(result).toEqual(expected);
  });
});
