export interface IArgsParser {

    /**
     * Deserializes the given param into a collection of number
     * @param args 
     * @throws when element of args is not a number
     */
    parse(args: string[]): number[];

}