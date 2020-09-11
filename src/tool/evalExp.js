export default function (evalExp) {
  return new Function("return " + evalExp)();
};