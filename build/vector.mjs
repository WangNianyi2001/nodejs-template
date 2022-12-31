import { RealNumber } from "./number.mjs";
export class Module {
    #type;
    #components;
    get type() {
        return this.#type;
    }
    get dimension() {
        return this.#components.length;
    }
    constructor(components, type) {
        this.#type = type;
        this.#components = Array.from(components);
    }
    [Symbol.iterator]() {
        return this.#components.values();
    }
    At(index) {
        return index in this.#components ? this.#components[index] : null;
    }
    ToArray() {
        return Array.from(this.#components);
    }
    Map(fn, type) {
        if (type === undefined)
            return new Module(this.#components.map(fn), this.type);
        else
            return new Module(this.#components.map(fn), type);
    }
    Fold(fn, init) {
        return this.#components.reduce(fn, init);
    }
    Plus(module) {
        return this.Map((r, i) => r.Plus(module.At(i)));
    }
    Minus(module) {
        return this.Map((r, i) => r.Minus(module.At(i)));
    }
    Scale(scalar) {
        return this.Map(r => r.Multiply(scalar));
    }
    Dot(module) {
        return this.Map((r, i) => r.Multiply(module.At(i))).Fold((res, r) => res.Plus(r), this.type.Zero());
    }
}
export class Vector extends Module {
    constructor(components, type) {
        const arr = components instanceof Array ? components : Array.from(components);
        for (let i = 0; i < arr.length; ++i) {
            const value = arr[i];
            if (typeof value === 'number') {
                arr[i] = new type(value);
            }
            else if (!(value instanceof type))
                throw new TypeError(`Components passed to vector constructor are not all of type ${type.name}`);
        }
        super(arr, type);
    }
    Scale(scalar) {
        if (typeof scalar === 'number')
            scalar = new this.type(scalar);
        return this.Map(r => r.Multiply(scalar));
    }
}
export class RealVector extends Vector {
    constructor(components) {
        super(components, RealNumber);
    }
}
