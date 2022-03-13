import { IResultSerializer } from "../../interfaces/i-result-serializer";

export class ConsoleSerializer implements IResultSerializer {
    
    
    /**
     * Prints to console
     * @param output 
     */
    write(output: string | string[]): void {
        if(typeof output == "string")
            this.writeLine(output);
        else 
            this.writeLine(output.join(`, `));
    }

    private writeLine(line: string): void {
        console.log(line);
    }

}