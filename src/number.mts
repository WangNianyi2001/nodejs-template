export interface RingElement<Impl> {
	Plus(n: Impl): Impl;
	Minus(n: Impl): Impl;
	Multiply(n: Impl): Impl;
};

export interface FieldElement<Impl> extends RingElement<Impl> {
	Divide(n: Impl): Impl;
};

export interface Number<Impl> extends FieldElement<Impl> {
	valueOf(): number;
};

export class RealNumber implements Number<RealNumber> {
	readonly #value: number;

	constructor(value: RealNumber | number) {
		if(typeof value === "number")
			this.#value = value;
		else
			this.#value = value.valueOf();
	}

	Plus(n: RealNumber): RealNumber { return new RealNumber(this.#value + n.valueOf()); }
	Minus(n: RealNumber): RealNumber { return new RealNumber(this.#value - n.valueOf()); }
	Multiply(n: RealNumber): RealNumber { return new RealNumber(this.#value * n.valueOf()); }
	Divide(n: RealNumber): RealNumber { return new RealNumber(this.#value / n.valueOf()); }
	valueOf(): number { return this.#value; }
}
