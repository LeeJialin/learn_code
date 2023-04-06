// 1、如果没有明确指定类型，那么ts会进行自动推导
let x = 1;
// x = true; // 报错，现在的x是number类型，不能不止boolean类型

// 2、类型断言 => 某些情况下，我清除知道某个遍历的类型，需要手动给定值的类型；
//      写法一：
// let str: any = "to be or not to be";
// let strLength: number = (<string>str).length;
// console.log(strLength);
//      写法二：
// let str: any = "to be or not to be";
// let strLength: number = (str as any).length;
// console.log(strLength);

// 3、非空断言 => 在上下文中当类型检查器无法断定类型时，可以使用缀表达式操作符 ! 进行断言操作对象是非 null 和非 undefined 的类型
// let user: string | null | undefined;
// console.log(user!.toUpperCase()); // 编译正确
// console.log(user.toUpperCase()); // 错误

let val!: number;
console.log(val);
