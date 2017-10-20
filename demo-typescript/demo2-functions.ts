//////////////////////函数////////////////////////
/**
 * 函数参数类型检查
 * @param arg1 字符串类型 
 * @param arg2 数字类型
 * @param arg3 任意类型
 * @param arg4 任意类型（可缺省）
 */
function f1(arg1: string, arg2: number, arg3: any, arg4?: any) {
  console.log(arg1, arg2);
}
function f2(obj: { name: string, age: number }) { }
/**
 * 函数返回值类型检查（无返回值时设定为void）
 * @param arg1 
 */
function f3(arg1: string): number {
  return +arg1;
}
function f4(arg1: string): void { }
/**
 * 函数的重载
 * @param arg1 
 * @param arg2 
 */
function f5(arg1: string): void;
function f5(arg1: number, arg2: string): void;
function f5(arg1: any, arg2?: string) {
  console.log(arg1, arg2);
}
