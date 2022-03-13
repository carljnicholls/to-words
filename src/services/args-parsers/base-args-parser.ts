export class BaseArgsParser {

    /**
     * Removes `node` and `rootDir` from args 
     * @param args 
     * @returns 
     */
    protected removeProgramArgs(args: string[]): string[] {
        return args.slice(2);
    }
}