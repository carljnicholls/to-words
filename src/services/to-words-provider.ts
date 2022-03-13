import { IToWords } from "../interfaces/i-to-words";

export class ToWordsProvider {
    
    constructor(
        private readonly french: IToWords, 
        private readonly belgiumFrench: IToWords
    ) {
        
    }

    /** ISO 639-3 */
    get(language: string): IToWords {
        if(language === 'fra') {
            return this.french; 
        }
        if(language === 'fr-BE') {
            return this.belgiumFrench; 
        }

        throw new Error('Language region not recognized.');
    }
}