import { FieldElement, RingElement } from "./number.mjs";
export declare class Module<R extends RingElement<any>> implements Iterable<R> {
    #private;
    get dimension(): number;
    constructor(components: Iterable<R>);
    [Symbol.iterator](): Iterator<R>;
}
interface NumberConstructor<Impl> {
    new (value: Impl | number): Impl;
}
export declare class Vector<F extends FieldElement<any>> extends Module<F> {
    constructor(components: Iterable<F>);
    constructor(components: Iterable<number>, constructor: NumberConstructor<any>);
}
export {};
