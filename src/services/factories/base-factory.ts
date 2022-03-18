export abstract class BaseFactory {
    abstract get(selector: string | number): NonNullable<unknown>; 
}