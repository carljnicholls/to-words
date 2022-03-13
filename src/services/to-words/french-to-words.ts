import { IToWords } from "../../interfaces/i-to-words";
import { BaseFrenchToWords } from "./base-french-to-words";

export class FrenchToWords extends BaseFrenchToWords implements IToWords {
    protected readonly units: NumberKeyValue<string> = {
        [0]: 'zero',
        [1]: 'un',
        [2]: 'deux',
        [3]: 'trois',
        [4]: 'quatre',
        [5]: 'cinq',
        [6]: 'six',
        [7]: 'sept',
        [8]: 'huit',
        [9]: 'neuf',
        [10]: 'dix',
        [11]: 'onze',
        [12]: 'douze',
        [13]: 'treize',
        [14]: 'quatorze',
        [15]: 'quinze',
        [16]: 'seize',
        [17]: 'dix-sept',
        [18]: 'dix-huit',
        [19]: 'dix-neuf'
    };
    protected readonly tens: NumberKeyValue<string> = {
        [10]: 'dix',
        [20]: 'vingt',
        [30]: 'trente',
        [40]: 'quarante',
        [50]: 'cinquante',
        [60]: 'soixante',
        [70]: 'soixante',
        [80]: 'quatre-vingt',
        [90]: 'quatre-vingt',
    };
    protected readonly hundreds: NumberKeyValue<string> = {
        [100]: 'cent',
        [200]: 'deux',
        [300]: 'trois',
        [400]: 'quatre',
        [500]: 'cinq',
        [600]: 'six',
        [700]: 'sept',
        [800]: 'huit',
        [900]: 'neuf',
    };

    constructor() {
        super();
    }

    //#region public

    convert(value: number): string {
        // validate
        if(!super.isWholeNumber(value)) throw Error('Decimals are not handled');
        const absoluteVal = Number(Math.trunc(value));

        const lowNumber = this.handleLowNumberRuleExceptions(absoluteVal);
        if(lowNumber.fitsRule) return lowNumber.word;

        if(absoluteVal < 100){
            return this.handleTens(absoluteVal);
        }

        if(absoluteVal < 1000) {
            return this.handleHundreds(absoluteVal);
        }

        throw new Error("Not Implemented");
    }

    convertAll(value: number[]): string[] {
        let result: string[] = [];
        value.forEach(val => {
            result.push(this.convert(val));
        });

        return result;
    }
    //#endregion

    //#region private

    /**
     * Gets words < 16
     * @param val 
     * @returns 
     */
    private handleLowNumberRuleExceptions(val: number): RulesResult {
        if(val < 17) return { fitsRule: true, word: this.units[val] };

        return { fitsRule: false, word: '' }
    }

    /**
     * Gets words < 100 
     * @param val 
     * @returns 
     */
    private handleTens(val: number): string {
        let isGreaterThan99 = false;
        if(val > 99) {
            const str = val.toString();
            val = Number(str.substring(str.length - 2, str.length));
            isGreaterThan99 = true;
        }

        const tensValue = super.roundDownToNearest(val, 10);
        const isLessThan70 = val < 70;

        if((tensValue == val && isLessThan70)) {
            return `${this.tens[val]}`;
        }

        const str = val.toString();
        const singleDigit = Number(str.substring(str.length - 1, str.length));
        
        if(isLessThan70) {
            if(singleDigit === 1) {
                return `${this.tens[tensValue]}-et ${this.units[singleDigit]}`;
            }

            return `${this.tens[tensValue]}-${this.units[singleDigit]}`;
        }

        if(tensValue == 70 || tensValue == 90){
            if(val == 71) {
                return `${this.tens[tensValue]}-et-${this.units[singleDigit + 10]}`;
            }

            return `${this.tens[tensValue]}-${this.units[singleDigit + 10]}`;
        }

        // 80
        if(tensValue == val) {
            return `${this.tens[tensValue]}s`; 
        }

        return `${this.tens[tensValue]}-${this.units[singleDigit]}`;
    }

    /**
     * Gets words < 1000 
     * @param val 
     * @returns 
     */
    private handleHundreds(val: number): string {
        const roundedHundred = super.roundDownToNearest(val, 100);

        if(roundedHundred == val) return `${this.hundreds[val]}`;

        const tensValue = this.handleTens(val);
        
        if(roundedHundred === 100)
            return `${this.hundreds[roundedHundred]}-${tensValue}`;
        
        return `${this.hundreds[roundedHundred]}-${this.hundreds[100]}-${tensValue}`;
    }

    //#endregion
}


