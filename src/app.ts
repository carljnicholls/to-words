import { IArgsParser } from "./interfaces/i-args-parser";
import { IResultSerializer } from "./interfaces/i-result-serializer";
import { IToWords } from "./interfaces/i-to-words";
import { ToWordsProvider } from "./services/factories/to-words-provider";

export class App {
    private toWords: IToWords; 

    constructor(
            private readonly argsParser: IArgsParser,
            toWords: ToWordsProvider,
            private readonly serializer: IResultSerializer,
        ) {
        this.toWords = toWords.get('fra');
    }

    public async run(args: string[]): Promise<void> {
        try {
            console.info('App.run()', args);
            const parsedArgs = this.argsParser.parse(args);
    
            const words = this.toWords.convertAll(parsedArgs);

            this.serializer.write(words);
    
        } catch (error) {
            throw error;
        }
    }
}