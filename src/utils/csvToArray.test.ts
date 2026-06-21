import { csvToArray } from './csvToArray';

describe('csvToArray', () => {
  it('should return an array as expected', async () => {
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

    const data = await csvToArray(fixtures);

    expect(Array.isArray(data)).toBe(true);
    expect(data).toEqual(expected);
  });
});
