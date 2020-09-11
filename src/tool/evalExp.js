
// 执行一段表达式，返回值

export default function (evalExp) {

  // eval中的代码执行时的作用域为当前作用域
  // new Function中的代码执行时的作用域为全局作用域
  return new Function("return " + evalExp)();
};