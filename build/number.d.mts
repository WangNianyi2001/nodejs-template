export interface RingElement<Impl extends RingElement<any>> {
    Plus(number: Impl): Impl;
    Minus(number: Impl): Impl;
    Multiply(number: Impl): Impl;
}
export interface RingConstructor<Impl extends RingElement<any>> {
    Zero(): Impl;
    One(): Impl;
}
export interface Number<Impl extends Number<any>> extends RingElement<Impl> {
    Divide(number: Impl): Impl;
}
export interface NumberConstructor<Impl extends Number<any>> extends RingConstructor<Impl> {
    new (value: Impl | number): Impl;
}
export declare class RealNumber implements Number<RealNumber> {
    #private;
    static Zero(): RealNumber;
    static One(): RealNumber;
    constructor(value: RealNumber | number);
    valueOf(): number;
    Plus(number: RealNumber): RealNumber;
    Minus(number: RealNumber): RealNumber;
    Multiply(number: RealNumber): RealNumber;
    Divide(number: RealNumber): RealNumber;
}
