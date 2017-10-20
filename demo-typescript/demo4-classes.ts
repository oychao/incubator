//////////////////////类////////////////////////
/**
 * 可以在class中定义成员属性的类型
 * 构造方法不能有返回类型检查
 */
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
interface Calculatable {
  add: (a: number, b: number) => number;
}
interface Thinkable {
  think: () => void;
}
class Student extends Person implements Calculatable, Thinkable {
  constructor(name: string, age: number) {
    super(name, age);
  }
  add(a: number, b: number) { return a + b; }
  think() { console.log('I exist'); }
}
