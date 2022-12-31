import { RingElement, Number, NumberConstructor, RealNumber, RingConstructor } from "./number.mjs";
interface Indexable<Component> extends Iterable<Component> {
    readonly dimension: number;
    At(index: number): Component | null;
    ToArray(): Component[];
}
export declare class Module<R extends RingElement<any>, C extends RingConstructor<R> = RingConstructor<R>> implements Indexable<R> {
    #private;
    get type(): C;
    get dimension(): number;
    constructor(components: Iterable<R>, type: C);
    [Symbol.iterator](): Iterator<R>;
    At(index: number): R | null;
    ToArray(): R[];
    Map(fn: (r: R, i: number) => R): Module<R>;
    Map<R_ extends RingElement<any>>(fn: (r: R, i: number) => R_, type: RingConstructor<R_>): Module<R_>;
    Fold<Res>(fn: (res: Res, r: R, i: number) => Res, init: Res): Res;
    Plus(module: Module<R>): Module<R>;
    Minus(module: Module<R>): Module<R>;
    Scale(scalar: R): Module<R>;
    Dot(module: Module<R>): R;
}
export declare class Vector<F extends Number<any>, C extends NumberConstructor<F> = NumberConstructor<F>> extends Module<F, C> {
    constructor(components: Iterable<F | number>, type: C);
    Scale(scalar: F | number): Module<F>;
}
export declare class RealVector extends Vector<RealNumber, NumberConstructor<RealNumber>> {
    constructor(components: Iterable<RealNumber | number>);
}
export {};
