export interface RingElement<Impl> {
    Plus(n: Impl): Impl;
    Minus(n: Impl): Impl;
    Multiply(n: Impl): Impl;
}
export interface FieldElement<Impl> extends RingElement<Impl> {
    Divide(n: Impl): Impl;
}
export interface Number<Impl> extends FieldElement<Impl> {
    valueOf(): number;
}
export declare class RealNumber implements Number<RealNumber> {
    #private;
    constructor(value: RealNumber | number);
    Plus(n: RealNumber): RealNumber;
    Minus(n: RealNumber): RealNumber;
    Multiply(n: RealNumber): RealNumber;
    Divide(n: RealNumber): RealNumber;
    valueOf(): number;
}
