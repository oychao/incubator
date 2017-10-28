//////////////////////泛型////////////////////////
/**
 * 泛型，和Java中的泛型用法类似
 */
function f1<T>(arg: T): T {
  return arg;
}
class Animal<T> {
  name: string;
  type: T;
  doNothing(arg: T): T {
    let result: T = arg;
    return result;
  }
}