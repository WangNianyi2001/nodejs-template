;
;
;
export class RealNumber {
    #value;
    constructor(value) {
        if (typeof value === "number")
            this.#value = value;
        else
            this.#value = value.valueOf();
    }
    Plus(n) { return new RealNumber(this.#value + n.valueOf()); }
    Minus(n) { return new RealNumber(this.#value - n.valueOf()); }
    Multiply(n) { return new RealNumber(this.#value * n.valueOf()); }
    Divide(n) { return new RealNumber(this.#value / n.valueOf()); }
    valueOf() { return this.#value; }
}
