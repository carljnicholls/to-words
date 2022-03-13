import { App } from "./app";
import { CsvArgsParser } from "./services/args-parsers/csv-args-parser";
import { ConsoleSerializer } from "./services/results-serializer/console-serializer";
import { ToWordsProvider } from "./services/to-words-provider";
import { BelgiumFrenchToWords } from "./services/to-words/belgium-french-to-words";
import { FrenchToWords } from "./services/to-words/french-to-words";

const argsParser = new CsvArgsParser();
const frenchToWords = new FrenchToWords();
const belgiumFrenchToWords = new BelgiumFrenchToWords();
const toWordsProvider = new ToWordsProvider(frenchToWords, belgiumFrenchToWords);
const serializer = new ConsoleSerializer();

const app = new App(
    argsParser,
    toWordsProvider, 
    serializer
); 

app.run(process.argv)
    .catch((err) => {
        console.log(`Global Error Catch: ${(err as Error).message}`, err)
    });