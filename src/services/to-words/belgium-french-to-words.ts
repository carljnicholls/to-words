import { IToWords } from "../../interfaces/i-to-words";
import { BaseFrenchToWords } from "./base-french-to-words";

export class BelgiumFrenchToWords extends BaseFrenchToWords implements IToWords {
    
    convert(value: number): string {
        throw new Error("Method not implemented.");
    }
    convertAll(values: number[]): string[] {
        throw new Error("Method not implemented.");
    }
}