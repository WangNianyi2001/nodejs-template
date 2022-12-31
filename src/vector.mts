import { RingElement, Number, NumberConstructor, RealNumber, RingConstructor } from "./number.mjs";

interface Indexable<Component> extends Iterable<Component> {
	readonly dimension: number;
	At(index: number): Component | null;
	ToArray(): Component[];
}

export class Module<R extends RingElement<any>, C extends RingConstructor<R> = RingConstructor<R>> implements Indexable<R> {
	readonly #type: C;
	readonly #components: R[];

	get type(): C {
		return this.#type;
	}
	get dimension(): number {
		return this.#components.length;
	}

	constructor(components: Iterable<R>, type: C) {
		this.#type = type;
		this.#components = Array.from(components);
	}

	[Symbol.iterator](): Iterator<R> {
		return this.#components.values();
	}
	At(index: number): R | null {
		return index in this.#components ? this.#components[index] : null;
	}
	ToArray(): R[] {
		return Array.from(this.#components);
	}

	Map(fn: (r: R, i: number) => R): Module<R>;
	Map<R_ extends RingElement<any>>(fn: (r: R, i: number) => R_, type: RingConstructor<R_>): Module<R_>;
	Map<R_ extends RingElement<any> = R>(
		fn: ((r: R, i: number) => R_) | ((r: R, i: number) => R),
		type?: RingConstructor<R_>
	): Module<R> | Module<R_> {
		if(type === undefined)
			return new Module<R>(this.#components.map(fn as (r: R, i: number) => R), this.type);
		else
			return new Module<R_>(this.#components.map(fn as (r: R, i: number) => R_), type as RingConstructor<R_>);
	}
	Fold<Res>(fn: (res: Res, r: R, i: number) => Res, init: Res): Res {
		return this.#components.reduce(fn, init);
	}

	Plus(module: Module<R>): Module<R> {
		return this.Map((r, i) => r.Plus(module.At(i)));
	}
	Minus(module: Module<R>): Module<R> {
		return this.Map((r, i) => r.Minus(module.At(i)));
	}
	Scale(scalar: R): Module<R> {
		return this.Map(r => r.Multiply(scalar));
	}
	Dot(module: Module<R>): R {
		return this.Map((r, i) => r.Multiply(module.At(i))).Fold((res: R, r) => res.Plus(r), this.type.Zero());
	}
}

export class Vector<F extends Number<any>, C extends NumberConstructor<F> = NumberConstructor<F>> extends Module<F, C> {
	constructor(components: Iterable<F | number>, type: C) {
		const arr: (F | number)[] = components instanceof Array ? components : Array.from<F | number>(components);
		for(let i = 0; i < arr.length; ++i) {
			const value = arr[i];
			if(typeof value === 'number') {
				arr[i] = new type(value);
			}
			else if(!(value instanceof type))
				throw new TypeError(`Components passed to vector constructor are not all of type ${type.name}`);
		}
		super(arr as F[], type);
	}

	override Scale(scalar: F | number): Module<F> {
		if(typeof scalar === 'number')
			scalar = new this.type(scalar);
		return this.Map(r => r.Multiply(scalar));
	}
}

export class RealVector extends Vector<RealNumber, NumberConstructor<RealNumber>> {
	constructor(components: Iterable<RealNumber | number>) {
		super(components, RealNumber);
	}
}
