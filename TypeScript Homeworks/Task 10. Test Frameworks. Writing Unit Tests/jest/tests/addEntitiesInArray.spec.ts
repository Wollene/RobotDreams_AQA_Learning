import { addEntitiesInArray } from '../../../Task 7. Introduction to TypeScript/src/functions';

describe('addEntitiesInArray() Function Tests:', () => {

    describe('Verify Adding Numbers In Array Works Correctly', () => {
        test('10, 15, 20 => 45', () => {
            const array: number[] = [10, 15, 20];
            expect(addEntitiesInArray(array)).toBe(45);
        });
        test('4, 8, 15, 16, 23, 42 => 108', () => {
            const array: number[] = [4, 8, 15, 16, 23, 42];
            expect(addEntitiesInArray(array)).toBe(108);
        });
        test('-10, -11, -12 => -33', () => {
            const array: number[] = [-10, -11, -12];
            expect(addEntitiesInArray(array)).toBe(-33);
        });
    });

    describe('Verify Adding String In Array Works Correctly', () => {
        test('\'Hello\', \'Hey\', \'Hola\' => HelloHeyHola', () => {
            const array: string[] = ['Hello', 'Hey', 'Hola'];
            expect(addEntitiesInArray(array)).toBe('HelloHeyHola');
        });
        test('\'Hello\', \',\', \' \', \'World\' => Hello, World', () => {
            const array: string[] = ['Hello', ',', ' ', 'World'];
            expect(addEntitiesInArray(array)).toBe('Hello, World');
        });
    });

    describe('Verify Empty String Array Will Throw An Error', () => {
        test('string[] => Error(\'Array is empty!\')', () => {
            const array: string[] = [];
            expect(() => addEntitiesInArray(array)).toThrow('Array is empty!');
        });
    });

    describe('Verify Empty Number Array Will Throw An Error', () => {
        test('number[] => Error(\'Array is empty!\')', () => {
            const array: number[] = [];
            expect(() => addEntitiesInArray(array)).toThrow('Array is empty!');
        });
    });
});
