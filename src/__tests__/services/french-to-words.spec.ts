import { IToWords } from "../../interfaces/i-to-words"
import { FrenchToWords } from "../../services/to-words/french-to-words";

type TestCaseDto = {
    args: number;
    expected: string 
}

let service: IToWords; 


describe('french to words', () => {
    const testCases: TestCaseDto[] = [
        {
            args: 0,
            expected: 'zero'
        },
        {
            args: 1,
            expected: 'un'
        },
        {
            args: 12,
            expected: 'douze'
        },
        {
            args: 18,
            expected: 'dix-huit'
        },
        {
            args: 20,
            expected: 'vingt'
        },
        {
            args: 21, 
            expected: 'vingt-et un'
        },
        {
            args: 22,
            expected: 'vingt-deux'
        },
        {
            args: 27, 
            expected: 'vingt-sept'
        },
        {
            args: 32,
            expected: 'trente-deux'
        },
        {
            args: 37, 
            expected: 'trente-sept'
        },
        {
            args: 43,
            expected: 'quarante-trois'
        },
        {
            args: 48, 
            expected: 'quarante-huit'
        },
        {
            args: 51,
            expected: 'cinquante-et un'
        },
        {
            args: 56, 
            expected: 'cinquante-six'
        },
        {
            args: 62,
            expected: 'soixante-deux'
        },
        {
            args: 67, 
            expected: 'soixante-sept'
        },
        {
            args: 70,
            expected: 'soixante-dix'
        },
        {
            args: 71, 
            expected: 'soixante-et-onze'
        },
        {
            args:74, 
            expected: 'soixante-quatorze'
        },
        {
            args:77, 
            expected: 'soixante-dix-sept'
        },
        {
            args: 80, 
            expected: 'quatre-vingts'
        },
        {
            args: 81, 
            expected: 'quatre-vingt-un'
        },
        {
            args: 90, 
            expected: 'quatre-vingt-dix'
        },
        {
            args: 95, 
            expected: 'quatre-vingt-quinze'
        },
        {
            args: 99, 
            expected: 'quatre-vingt-dix-neuf'
        },
        {
            args: 100, 
            expected: 'cent'
        },
        {
            args: 130, 
            expected: 'cent-trente'
        },
        {
            args: 333,
            expected: 'trois-cent-trente-trois'
        },
    ];

    beforeEach(() => {
        service = new FrenchToWords();
    });

    describe('convert()', () => {

        test.each
        (
            testCases            
        )
        ('It will return the expected value for input %p', async(test: TestCaseDto) => {
            expect(service.convert(test.args))
                .toBe(test.expected);
        });

        test('It will return the expected value for input 18', async() => {
            expect(service.convert(18))
                .toBe('dix-huit');
        });
    }); 
});