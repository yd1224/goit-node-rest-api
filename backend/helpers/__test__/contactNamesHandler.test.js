import { contactNameHandler } from "../contactNamesHandler.js";

const testingData = [
    { input: 'Jimi Hendrix', output: 'Jimi Hendrix' },
    { input: 'jimi hendrix', output: 'Jimi Hendrix' },
    { input: 'jimi Hendrix', output: 'Jimi Hendrix' },
    { input: '   Jimi  hendriX ', output: 'Jimi Hendrix' },
    { input: 'Jimi_Hendrix', output: 'Jimi Hendrix' },
    { input: 'jimi.hendrix', output: 'Jimi Hendrix' },
    { input: 'jimi@hend@rix', output: 'Jimi Hend Rix' },
    { input: '_jimi * hendrix', output: 'Jimi Hendrix' },
    { input: 'jimi hèndrix__', output: 'Jimi Hendrix' },
    { input: 'jimi中村hèndrix__', output: 'Jimi Hendrix' },
    { input: 'jimi de Hèndrix__', output: 'Jimi De Hendrix' },
    { input: '中村哲二', output: '' },
    { input: undefined, output: '' },
    { input: null, output: '' },
    { input: true, output: '' },
];

describe('User name handler tests', () => {
    test('all test cases', () => {
        for (const item of testingData) {
            expect(contactNameHandler(item.input)).toBe(item.output);
        }
    });
});

