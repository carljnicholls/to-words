import { IArgsParser } from "../../interfaces/i-args-parser";
import { BaseArgsParser } from "./base-args-parser";

export class CsvArgsParser extends BaseArgsParser implements IArgsParser {
    
    /**
     * Removes program args and then returns all further args 
     * flattened into one array
     * @param args 
     * @returns 
     */
    parse(args: string[]): number[] {
        const methodName = `CsvArgsParser.parse()`;

        try {
            const cleanedArgs = super.removeProgramArgs(args);

            if(cleanedArgs.length === 0) throw Error(`${methodName} No Args Provided.`);

            const flattenedArgs = cleanedArgs.join(); 

            return flattenedArgs.split(',')
                .map((val, index, arr) => {
                    const res = Number(val.trim());

                    if(isNaN(res)) throw Error(`${methodName} Arg '${val}' is Not a Number`);

                    return res; 
                });

        } catch (error) {
            console.error(`${methodName} ${(error as Error).message}`, error);
            throw error;
        }
    }

}