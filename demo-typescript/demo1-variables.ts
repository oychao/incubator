//////////////////////变量////////////////////////
/**
 * 基本类型检查
 */
let v1: string = 'hello type';
let v2: number = 123;
let v3: boolean = false;
const v4: undefined = undefined;
const v5: null = null;
/**
 * 数组类型检查
 */
let v6: number[] = [1, 2, 3];
let v7: string[] = ['1', '2', '3'];
/**
 * Union类型检查
 */
let v8: number | string;
v8 = 123;
v8 = '123';
/**
 * T自定义ype类型
 */
type t = 'Draw!' | 'X Wins!' | 'O Wins!';
let v9: t = 'Draw!';
