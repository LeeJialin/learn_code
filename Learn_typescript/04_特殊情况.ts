// 联合类型 => 联合类型用|分隔，表示取值可以为多种类型中的一种
// let status:string|number
// status='to be or not to be'
// status=1

// 交叉类型 => 交叉类型就是跟联合类型相反，用&操作符表示，交叉类型就是两个类型必须存在
interface IpersonA {
  name: string;
  age: number;
}
interface IpersonB {
  name: string;
  gender: string;
}

let person: IpersonA & IpersonB = {
  name: "师爷", // 如果注释这行则会报错
  age: 18,
  gender: "男",
};
