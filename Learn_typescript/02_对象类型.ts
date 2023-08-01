// 对象类型 => 函数、{}、数组、类

// 类
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number = 20) {
    this.name = name;
    this.age = age;
  }
  sayHi(): void {
    console.log("hello world", this.name);
  }
}
const xiaoMing = new Person("小明");
// xiaoMing.sayHi();

// 函数
function add(x: number, y: number): number {
  // ts有自动类型推导，例如当前函数传入的两个值都是number，可以自动推导出函数返回值是number
  return x + y;
}

// 函数定义接口 => 关键字 interface
// interface ADD {
//   (x: number, y: number): number;
// }

// 可选参数
function add1(x: number, y?: number): number {
  return y ? x + y : x;
}

// 默认参数
function add2(x: number = 1, y: number = 2) {
  return x + y;
}
console.log(add2());

// 剩余参数
function add3(...numbers: [string, number, boolean]) {
  return numbers[1];
}
