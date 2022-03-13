export abstract class BaseFrenchToWords {

    protected roundDownToNearest(num: number, base: number = 10) {
        return Math.floor(num / base) * base;
    }

    protected isWholeNumber(val: number) {
        return val % 1 === 0;
    }
}