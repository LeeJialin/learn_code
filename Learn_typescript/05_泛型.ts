// function foo<T>(arg: T): T {
//   return arg;
// }

// console.log(foo("hello world"));

// interface Iidentity<V, M> {
//   value: V;
//   message: M;
// }

// function identity<T, U>(value: T, message: U): Iidentity<T, U> {
//   let identity: Iidentity<T, U> = {
//     value,
//     message,
//   };
//   return identity;
// }

// let result1 = identity(<number>1);

// let result2 = identity("hahha");

// let result3 = identity("hahha", 123);

// let result4 = identity([1, 2, 3, "4"], "hahah");

// 泛型类
// interface IGenericInterface<U> {
//   value: U;
//   getIdentity: () => U;
// }

// class IdentityClass<T> implements IGenericInterface<T> {
//   value: T;
//   constructor(value: T) {
//     this.value = value;
//   }
//   getIdentity(): T {
//     return this.value;
//   }
// }

// const myCalss = new IdentityClass("zs");
// let result5 = myCalss.getIdentity();

// console.log(result5);

// 泛型约束
// interface Length {
//   length: number;
// }

// function identity<T extends Length>(arg: T): T {
//   console.log(arg.length);
//   return arg;
// }

// identity("");

// 泛型条件类型 ??

// 工具类
// 1、Partial<T> 的作用就是将某个类型里的属性全部变为可选项 ?。
// interface Todo {
//   title: string;
//   description: string;
// }
// function updata(todo: Todo, fieldsToUpdate: Partial<Todo>) {
//   return { ...todo, ...fieldsToUpdate };
// }
// const todo1 = {
//   title: "organize desk",
//   description: "clear clutter",
// };

// const result = updata(todo1, { title: "zs" });
// console.log(result);

// // 2、Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。
// interface PageInfo {
//   title: string;
//   info?: string;
// }
// type Page = "home" | "about" | "contact";
// const result1: Record<Page, PageInfo> = {
//   about: { title: "about", info: "hahah" },
//   contact: { title: "contact" },
//   home: { title: "home" },
// };

// 3、 Pick<T, K extends keyof T> 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。
// interface Todo {
//   title: string;
//   description: string;
//   completed: boolean;
// }

// type TodoPreview = Pick<Todo, "title" | "completed">;

// const todo: TodoPreview = {
//   title: "Clean room",
//   completed: false,
// };

// 泛型约束
// interface LengthWise {
//   length: number;
// }

// function getLength<T extends LengthWise>(arg: T): T {
//   console.log("arg.length=========>", arg.length);
//   return arg;
// }
// getLength("hahhaha");
// getLength([1, 2, 3, 4]);
// getLength({ length: 5 });

// 泛型类型别名
// type Cart<T> = { list: T[] } | T[];
// let C1: Cart<"" | number> = [1, 2];
// let C2: Cart<""> = ["", ""];
// let C3: Cart<string> = { list: ["1"] };

// 工具类 - readonly
interface Person {
  name: string;
  age: number;
  gender?: "male" | "female";
  sayHi: () => string;
}
let p1: Readonly<Person> = {
  name: "zs",
  age: 17,
  sayHi: function () {
    console.log("=========>", "hello world");
    return "123";
  },
};
console.log("p1=========>", p1.sayHi());
