;
;
export class RealNumber {
    static Zero() {
        return new RealNumber(0);
    }
    static One() {
        return new RealNumber(1);
    }
    #value;
    constructor(value) {
        if (typeof value === "number")
            this.#value = value;
        else
            this.#value = value.#value;
    }
    valueOf() {
        return this.#value;
    }
    Plus(number) {
        return new RealNumber(this.#value + number.valueOf());
    }
    Minus(number) {
        return new RealNumber(this.#value - number.valueOf());
    }
    Multiply(number) {
        return new RealNumber(this.#value * number.valueOf());
    }
    Divide(number) {
        return new RealNumber(this.#value / number.valueOf());
    }
}
