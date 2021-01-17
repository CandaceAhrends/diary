import { stripAllAfterFirstComma, addElipses } from './utils';

it('should extract all text before the first comma', () => {
    const commaStripped = stripAllAfterFirstComma('a,b,c,d');
    expect(commaStripped).toBe('a');
});

it('should add Elipses', () => {
    const testData = Array.from({ length: 40 }, i => 'test');
    const elipses = addElipses(`${testData.join(",")}`);
    expect(elipses).toBe('test,test,...');
});
