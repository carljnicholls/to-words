export abstract class BaseFrenchToWords {

    protected roundDownToNearest(num: number, base: number = 10) {
        return Math.floor(num / base) * base;
    }

    protected isWholeNumber(val: number) {
        return val % 1 === 0;
    }

    protected getNthFromTheRightNumber(val: number, n: number) {
        const str = val.toString();
        return Number(str[str.length - n]);
    }

    protected checkParamIsValid(value: number) {
        if (!this.isWholeNumber(value))
            throw Error('Decimals are not handled');
    }
}