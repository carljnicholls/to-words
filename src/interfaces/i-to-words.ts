export interface IToWords {
    /**
     * Returns the word representation of the given number
     * @param value Number to be converted
     */
    convert(value: number): string;
    
    /**
     * Returns a string for each full word 
     * representation of the given number
     * @param values
     */
    convertAll(values: number[]): string[];
}