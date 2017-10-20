//////////////////////接口////////////////////////
/**
 * 接口的定义（一种自定类型）
 */
interface IPerson {
  name: string,
  age: number,
  sayHi: () => string;
}
const p: IPerson = {
  name: 'Ouyang',
  age: 26,
  sayHi(): string {
    return 'Hi';
  }
};
function f6(arg1: IPerson): void {
  arg1.sayHi();
}
f6(p);
/**
 * 接口的继承
 */
interface I1 {
  v1: string
}
interface I2 {
  v2: string
}
interface I3 extends I1, I2 {
  v3: string
}
const o1: I3 = {
  v1: 'Hello',
  v2: 'World',
  v3: '!'
};
