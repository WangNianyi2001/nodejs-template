import { RealVector } from '../build/index.mjs';

const va = new RealVector([1, 2, 3]);
const vb = new RealVector([4, 5, 6]);
console.log(va.Plus(vb).ToArray().map(num => num.valueOf()));
console.log(va.Minus(vb).ToArray().map(num => num.valueOf()));
console.log(va.Dot(vb).valueOf());
console.log(va.Scale(2).ToArray().map(num => num.valueOf()));
