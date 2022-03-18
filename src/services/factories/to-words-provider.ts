import { BaseFactory } from "./base-factory";
import { IToWords } from "../../interfaces/i-to-words";


export class ToWordsProvider extends BaseFactory {
    
    constructor(
        private readonly french: IToWords, 
        private readonly belgiumFrench: IToWords
    ) {
        super();
        
    }

    /** ISO 639-3 */
    get(selector: string): NonNullable<IToWords> {
        if(selector === 'fra') {
            return this.french; 
        }
        if(selector === 'fr-BE') {
            return this.belgiumFrench; 
        }

        throw new Error('Language region not recognized.');
    }
}