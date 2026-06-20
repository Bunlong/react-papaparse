

import { readString } from './readString';

describe('readString', () => {
  it('should return an array as expected', () => {
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

    return new Promise<void>((resolve, reject) => {
      readString(fixtures, {
        complete: (results: any) => {
          try {
            expect(Array.isArray(results.data)).toBe(true);
            expect(results.data).toEqual(expected);
            resolve();
          } catch (err) {
            reject(err);
          }
        },
        error: (err: any) => reject(err),
      });
    });
  });
});
