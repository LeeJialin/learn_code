// string类型
let str: string = "菩提本无树";
// console.log(str);

// Boolean类型
let flag: boolean = false;
// console.log(flag ? "哈哈哈" : "呵呵呵");

// number类型
let num: number = 123;

// Enum类型 => 也叫可枚举类型，使用枚举可以清晰地表达意图或创建一组有区别的用例。，如周一到周日，方位上下左右等；
enum Color {
  RED,
  ORANGE = 2,
}
let red = Color.RED;
// console.log(red);  // 0
let orange = Color.ORANGE;
// console.log(orange);  // 2

// array 类型
//  方式一：
const arr: number[] = [1, 2, 3]; // 只能存放数字的数组
//  方式二：
const arr1: Array<number> = [1, 2, 3]; // 同上
// 如果一个数组中有其它类型呢？请看下面的元组类型，个人理解，元组也是数组，但可以将不同类型放在数组中；
// 当然，如果数组中存在多个不确定的数据类型，那就直接用any；

// 元组类型
const tuple: [number, string, boolean] = [1, "Basara", false];
const tuple1: any[] = [1, 2, {}, false, "123"];
console.log(tuple1);

// undefined 和 null
//    感觉用的意义，暂时不做说明

// any 类型
//  万物皆可any...,最高级的类型

// void 类型 => 意思就是无效的, 一般只用在函数上，告诉别人这个函数没有返回值。
function sayHello(): void {
  console.log("hello world");
}

// never 类型 => 永不存在的值
//    值会永不存在的两种情况:
//  1、如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值
//  2、函数中执行无限循环的代码（死循环），使得程序永远无法运行到函数返回值那一步，永不存在返回
// 异常
function error(msg: string): never {
  // 编译正确
  throw new Error(msg);
}
// 死循环
function loopForever(): never {
  // 编译正确
  while (true) {}
}

// Unknown 类型
//  比较尴尬，想不出会用在哪
