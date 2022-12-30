import { FieldElement, RingElement } from "./number.mjs";

export class Module<R extends RingElement<any>> implements Iterable<R> {
	readonly #components: R[];

	get dimension(): number { return this.#components.length; }

	constructor(components: Iterable<R>) {
		this.#components = Array.from(components);
	}

	[Symbol.iterator](): Iterator<R> { return this.#components.values(); }
}

interface NumberConstructor<Impl> {
	new(value: Impl | number): Impl;
}

export class Vector<F extends FieldElement<any>> extends Module<F> {
	constructor(components: Iterable<F>);
	constructor(components: Iterable<number>, constructor: NumberConstructor<any>);
	constructor(components: Iterable<F> | Iterable<number>, constructor?: NumberConstructor<any>) {
		if(constructor === undefined)
			super(components as Iterable<F>);
		else
			super(Array.from(components as Iterable<number>).map(n => new constructor(n)));
	}
}
