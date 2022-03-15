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
        {
            args: 801,
            expected: 'huit-cent-et un'
        },
        {
            args: 1000,
            expected: 'mille'
        },
        {
            args: 1333,
            expected: 'mille-trois-cent-trente-trois'
        },
        {
            args: 3333,
            expected: 'trois-mille-trois-cent-trente-trois'
        },
        {
            args: 8001,
            expected: 'huit-mille-et un'
        },
        {
            args: 82223,
            expected: 'quatre-vingt-deux-mille-deux-cent-vingt-trois'
        },
        {
            args: 311253,
            expected: 'trois-cent-onze-mille-deux-cent-cinquante-trois'
        },
        {
            args: 555555,
            expected: 'cinq-cent-cinquante-cinq-mille-cinq-cent-cinquante-cinq'
        },
    ];

    beforeEach(() => {
        service = new FrenchToWords();
    });

    describe('convert()', () => {
        let all: number[] = [];
        beforeAll(() => {
            let i = 0;
            let arr = [];
            while (i < 999999) {
                arr.push(i);
                i++;
            }
        })
        
        test.each
        (
            testCases            
        )
        ('It will return the expected value for input %p', async(test: TestCaseDto) => {
            expect(service.convert(test.args))
                .toBe(test.expected);
        });

        test('It will return the expected value for input 801', async() => {
            const test = {
                args: 801,
                expected: 'huit-cent-et un'
            };
            expect(service.convert(test.args))
                .toBe(test.expected);
        });
        
        test('It will return the expected value for input 1000', async() => {
            expect(service.convert(1000))
                .toBe('mille');
        });

        test('It will return the expected value for input 1001', async() => {
            expect(service.convert(1001))
                .toBe('mille-et un');
        });

        test('It will return the expected value for input 1333', async() => {
            expect(service.convert(1333))
                .toBe('mille-trois-cent-trente-trois');
        });

        test('It will return the expected value for input 3333', async() => {
            expect(service.convert(3333))
                .toBe('trois-mille-trois-cent-trente-trois');
        });
        test('It will return the expected value for input 8001', async() => {
            expect(service.convert(8001))
                .toBe('huit-mille-et un');
        });
        
        test('It will return the expected value for input 82223', async() => {
            expect(service.convert(82223))
                .toBe('quatre-vingt-deux-mille-deux-cent-vingt-trois');
        });
        

        test('It will return the expected value for input 311253', async() => {
            expect(service.convert(311253))
                .toBe('trois-cent-onze-mille-deux-cent-cinquante-trois');
        });
        
        


        /** 
         * disabled as its long running 
         * re-add as app test
         * */
        xtest('getWords(0 to 99999) will not return undefined in words', async () => {
            let i = 0;
            let arr = [];
            while (i < 999999) {
                arr.push(i);
                i++;
            }
            expect.assertions(arr.length * 3);

            for await (const iterator of arr) {
                var result = service.convert(iterator)
                
                expect(result)
                    .not
                    .toBeNull();

                expect(result.length)
                    .toBeGreaterThan(1);

                expect(result)
                    .not
                    .toContain('undefined')
            }
        });
    }); 
    describe('convertAll()', () => {

        test.each
        (
            testCases            
        )
        ('It will return the expected value for input %p', async(test: TestCaseDto) => {
            expect(service.convertAll([test.args]))
                .toEqual([ test.expected ]);
        });
    }); 
});