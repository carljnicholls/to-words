import { IToWords } from "../../interfaces/i-to-words";
import { BaseFrenchToWords } from "./base-french-to-words";

export class FrenchToWords extends BaseFrenchToWords implements IToWords {
    protected readonly units: Map<number, string> = new Map<number, string>([
        [0,"zero"],
        [1,"un"],
        [2,"deux"],
        [3,"trois"],
        [4,"quatre"],
        [5,"cinq"],
        [6,"six"],
        [7,"sept"],
        [8,"huit"],
        [9,"neuf"],
        [10,"dix"],
        [11,"onze"],
        [12,"douze"],
        [13,"treize"],
        [14,"quatorze"],
        [15,"quinze"],
        [16,"seize"],
        [17,"dix-sept"],
        [18,"dix-huit"],
        [19,"dix-neuf"],
        [20,"vingt"],
        [21,"vingt-et un"],
        [22,"vingt-deux"],
        [23,"vingt-trois"],
        [24,"vingt-quatre"],
        [25,"vingt-cinq"],
        [26,"vingt-six"],
        [27,"vingt-sept"],
        [28,"vingt-huit"],
        [29,"vingt-neuf"],
        [30,"trente"],
        [31,"Trente-et un"],
        [32,"Trente-deux"],
        [33,"Trente-trois"],
        [34,"Trente-quatre"],
        [35,"Trente-cinq"],
        [36,"Trente-six"],
        [37,"Trente-sept"],
        [38,"Trente-huit"],
        [39,"Trente-neuf"],
        [40,"quarante"],
        [41,"quarante-et un"],
        [42,"quarante-deux"],
        [43,"quarante-trois"],
        [44,"quarante-quatre"],
        [45,"quarante-cinq"],
        [46,"quarante-six"],
        [47,"quarante-sept"],
        [48,"quarante-huit"],
        [49,"quarante-neuf"],
        [50,"cinquante"],
        [51,"cinquante-et un"],
        [52,"cinquante-deux"],
        [53,"cinquante-trois"],
        [54,"cinquante-quatre"],
        [55,"cinquante-cinq"],
        [56,"cinquante-six"],
        [57,"cinquante-sept"],
        [58,"cinquante-huit"],
        [59,"cinquante-neuf"],
        [60,"soixante"],
        [61,"soixante-et un"],
        [62,"soixante-deux"],
        [63,"soixante-trois"],
        [64,"soixante-quatre"],
        [65,"soixante-cinq"],
        [66,"soixante-six"],
        [67,"soixante-sept"],
        [68,"soixante-huit"],
        [69,"soixante-neuf"],
        [70,"soixante-dix"],
        [71,"soixante-et-onze"],
        [72,"soixante-douze"],
        [73,"soixante-treize"],
        [74,"soixante-quatorze"],
        [75,"soixante-quinze"],
        [76,"soixante-seize"],
        [77,"soixante-dix-sept"],
        [78,"soixante-dix-huit"],
        [79,"soixante-dix-neuf"],
        [80,"quatre-vingts"],
        [81,"quatre-vingt-un"],
        [82,"quatre-vingt-deux"],
        [83,"quatre-vingt-trois"],
        [84,"quatre-vingt-quatre"],
        [85,"quatre-vingt-cinq"],
        [86,"quatre-vingt-six"],
        [87,"quatre-vingt-sept"],
        [88,"quatre-vingt-huit"],
        [89,"quatre-vingt-neuf"],
        [90,"quatre-vingt-dix"],
        [91,"quatre-vingt-onze"],
        [92,"quatre-vingt-douze"],
        [93,"quatre-vingt-treize"],
        [94,"quatre-vingt-quatorze"],
        [95,"quatre-vingt-quinze"],
        [96,"quatre-vingt-seize"],
        [97,"quatre-vingt-dix-sept"],
        [98,"quatre-vingt-dix-huit"],
        [99,"quatre-vingt-dix-neuf"],

    ]);
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
    private readonly thousandWord = 'mille';

    constructor() {
        super();
    }

    //#region public

    convert(value: number): string {
        // validate
        if(!super.isWholeNumber(value)) throw Error('Decimals are not handled');
        
        const absoluteVal = Number(Math.trunc(value));

        if(absoluteVal < 100){
            return this.handleTens(absoluteVal).toLocaleLowerCase();
        }

        if(absoluteVal < 1000) {
            return this.handleHundreds(absoluteVal).toLocaleLowerCase();
        }

        if(absoluteVal < 1000000) {
            return this.handleThousands(absoluteVal).toLocaleLowerCase();
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
     * Gets words < 100 from lookup
     * @param val 
     * @returns 
     */
    private handleTens(val: number): string {
        if(val > 99) {
            const str = val.toString();
            val = Number(str.substring(str.length - 2, str.length));
        }

        const word = this.units.get(val);
        if(word === undefined) 
            throw new Error(`Value ${val} found no match under 100`);
        
        return word;
    }

    /**
     * Gets words < 1000 
     * @param val 
     * @returns 
     */
    private handleHundreds(val: number): string {
        if(val > 999) {
            const str = val.toString();
            val = Number(str.substring(str.length - 3, str.length));
        }

        const roundedHundred = super.roundDownToNearest(val, 100);

        if(roundedHundred == val) return `${this.hundreds[val]}`;

        const tensValue = this.handleTens(val);

        if(val < 10) return tensValue;

        if(roundedHundred === 100)
            return `${this.hundreds[roundedHundred]}-${tensValue}`;
    
        const firstDigit = super.getNthFromTheRightNumber(val, 1);
        const secondDigit = super.getNthFromTheRightNumber(val, 2);
        if(firstDigit === 1 && secondDigit == 0) {
            const hundreds = this.hundreds[100];
            return `${this.hundreds[roundedHundred]}-${hundreds ? `${hundreds}-et` : ''} ${tensValue}`;
        }

        if(val < 100) {
            return `${tensValue}`
        }

        return `${this.hundreds[roundedHundred]}-${this.hundreds[100]}-${tensValue}`;
    }

    /**
     * Gets words < 1000000 
     * @param val 
     * @returns 
     */
    private handleThousands(val: number): string {
        const roundedThousand = super.roundDownToNearest(val, 1000);
        // handle round 1000 values
        if(roundedThousand === val) return `${this.thousandWord}`;

        let str = val.toString();
        const thousandsNumberPart = str.substring(str.length-6, str.length-3);
        const thousandsNo = Number(thousandsNumberPart);
        const thousandsValue = this.handleHundreds(thousandsNo);
        const hundredsValue = this.handleHundreds(val);

        const singleDigit = super.getNthFromTheRightNumber(val, 1);

        if(thousandsNo === 1) {
            if(singleDigit === 1) {
                return `${this.thousandWord}-et ${hundredsValue}`
            }
            return `${this.thousandWord}-${hundredsValue}`
        }

        if(singleDigit === 1) {
            return `${thousandsValue}-${this.thousandWord}-et ${hundredsValue}`;
        }

        return `${thousandsValue}-${this.thousandWord}-${hundredsValue}`;
    }

    //#endregion
}


