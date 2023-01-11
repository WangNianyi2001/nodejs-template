export interface RingElement<Impl extends RingElement<any>> {
	Plus(number: Impl): Impl;
	Minus(number: Impl): Impl;
	Multiply(number: Impl): Impl;
};

export interface RingConstructor<Impl extends RingElement<any>> {
	Zero(): Impl;
	One(): Impl;
}

export interface Number<Impl extends Number<any>> extends RingElement<Impl> {
	Divide(number: Impl): Impl;
};

export interface NumberConstructor<Impl extends Number<any>> extends RingConstructor<Impl> {
	new(value: Impl | number): Impl;
}

export class RealNumber implements Number<RealNumber> {
	static Zero(): RealNumber {
		return new RealNumber(0);
	}
	static One(): RealNumber {
		return new RealNumber(1);
	}

	readonly #value: number;

	constructor(value: RealNumber | number) {
		if(typeof value === "number")
			this.#value = value;
		else
			this.#value = value.#value;
	}

	valueOf(): number {
		return this.#value;
	}

	Plus(number: RealNumber): RealNumber {
		return new RealNumber(this.#value + number.valueOf());
	}
	Minus(number: RealNumber): RealNumber {
		return new RealNumber(this.#value - number.valueOf());
	}
	Multiply(number: RealNumber): RealNumber {
		return new RealNumber(this.#value * number.valueOf());
	}
	Divide(number: RealNumber): RealNumber {
		return new RealNumber(this.#value / number.valueOf());
	}
}
