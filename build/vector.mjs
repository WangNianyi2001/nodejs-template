export class Module {
    #components;
    get dimension() { return this.#components.length; }
    constructor(components) {
        this.#components = Array.from(components);
    }
    [Symbol.iterator]() { return this.#components.values(); }
}
export class Vector extends Module {
    constructor(components, constructor) {
        if (constructor === undefined)
            super(components);
        else
            super(Array.from(components).map(n => new constructor(n)));
    }
}
