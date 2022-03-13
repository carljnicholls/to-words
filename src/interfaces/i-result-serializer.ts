export interface IResultSerializer {
    /**
     * Serializes the output variable
     * @param output 
     */
    write(output: string): void; 

    /**
     * Serializes the output variable
     */
    write(outputs: string[]): void;
}