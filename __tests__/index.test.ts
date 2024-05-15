import { getSegmentByCustomFunc } from '../src/index';

describe('getSegmentByCustomFunc', () => {
    it('should return a segment with the result of the custom function', () => {
        const fn = (val: any) => val.toUpperCase();
        const value = 'hello';
        const expectedSegment = 'HELLO/';
        const segment = getSegmentByCustomFunc(fn, value);
        expect(segment).toBe(expectedSegment);
    });
});