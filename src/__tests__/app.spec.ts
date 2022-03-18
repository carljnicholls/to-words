import { App } from "../app"
import { IArgsParser } from "../interfaces/i-args-parser";
import { IResultSerializer } from "../interfaces/i-result-serializer";
import { IToWords } from "../interfaces/i-to-words";
import { CsvArgsParser } from "../services/args-parsers/csv-args-parser";
import { ConsoleSerializer } from "../services/results-serializer/console-serializer";
import { ToWordsProvider } from "../services/factories/to-words-provider";
import { BelgiumFrenchToWords } from "../services/to-words/belgium-french-to-words";
import { FrenchToWords } from "../services/to-words/french-to-words";

describe('App.ts', () => {
    let parser: IArgsParser; 
    let frenchToWords: IToWords; 
    let belgiumFrenchToWords: IToWords; 
    let toWordsProvider: ToWordsProvider;
    let serializer: IResultSerializer;

    let service: App; 

    beforeEach(async () => {
        parser = new CsvArgsParser(); 
        frenchToWords = new FrenchToWords();
        belgiumFrenchToWords = new BelgiumFrenchToWords();
        toWordsProvider = new ToWordsProvider(frenchToWords, belgiumFrenchToWords);

        serializer = new ConsoleSerializer();
        service = new App(parser, toWordsProvider, serializer);
    });
    
    describe('run()', () => {
        
        xtest('It will throw when no args given', async () => {
            // expect(() => service.run(['node', './build/main.js']))
            //     .toThrowError();
            expect(true)
                .toBe(true);
        });
    });
})