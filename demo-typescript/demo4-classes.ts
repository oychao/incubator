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
class Student extends Person implements Calculatable {
  add(a: number, b: number) { return a + b; }
}
