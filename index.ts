type math = {
  add: Function;
  subtract: Function;
  multiply: Function;
  Potency: Function;
  division: Function;
  Rest: Function;
  max: Function;
  min: Function;
  trunc: Function;
  PY: number;
};

type Tags = {
  btns: NodeList;
  input: Node;
  restric: RegExp;
  event: Function;
};

type Utils = {
  iteraStr: Function;
  iteraNodeList: Function;
  myPop: Function;
  convertArr: Function;
  convertStr: Function;
};

let utils1: Utils = {
  iteraStr: function (
    str: string,
    func: (str: string, index: number) => void
  ): void {
    for (let i: number = 0; i < str.length; i++) func(str[i], i);
  },
  iteraNodeList: function (
    nodeLs: NodeList,
    func: (node: Node, index: number) => void
  ): void {
    for (let i: number = 0; i < nodeLs.length; i++) func(nodeLs[i], i);
  },
  myPop: function (arr: Array<any>): Array<any> {
    let newArr: Array<any> = [];
    for (let i: number = 0; i < arr.length - 1; i++) newArr.push(arr[i]);
    return newArr;
  },
  convertArr: function (str: String): Array<any> {
    let arr: Array<any> = [];
    for (let i: number = 0; i < str.length; i++) arr.push(str[i]);
    return arr;
  },
  convertStr: function (arr: Array<any>): string {
    let str: string = " ";
    for (let i: number = 0; i < arr.length; i++) str += arr[i];
    return str;
  },
};

let math1: math = {
  add: function (...args: [number, number]) {
    return args[0] + args[1];
  },
  subtract: function (...args: [number, number]) {
    return args[0] - args[1];
  },
  multiply: function (...args: [number, number]) {
    return args[0] * args[1];
  },
  Potency: function (...args: [number, number]) {
    return Math.pow(args[1], args[0]);
  },
  division: function (...args: [number, number]) {
    return args[0] / args[1];
  },
  max: function (...args: [number, number]) {
    return args[0] > args[1] ? args[0] : args[1];
  },
  min: function (...args: [number, number]) {
    return args[0] < args[1] ? args[0] : args[1];
  },
  trunc: function (...args: [number, number, number]) {
    return this.max(args[0], this.min(args[1], args[2]));
  },
  Rest: function (...args: [number, number]) {
    return args[0] % args[1];
  },
  PY: Math.PI,
};

let tags1: Tags = {
  btns: document.querySelectorAll("button"),
  input: document.querySelector("input"),
  restric: /([0-9]{1,}(\.[0-9]{1,}){0,1}[\x\+\-\/\^\%]{1,1}[0-9]{1,}(\.[0-9]{1,}){0,1})$/g,
  event: function (event: string) {
    let num1: string = "",
      num2: string = "",
      opera: string = "",
      flag = true,
      test = true;
    utils1.iteraNodeList(this.btns, (btn: Node) => {
      btn.addEventListener(event, () => {
        test = this.restric.test(this.input.value);
        if (btn.textContent === "=" && test && this.input.value !== " ") {
          utils1.iteraStr(this.input.value, (val: string) => {
            if (
              val !== "+" &&
              val !== "-" &&
              val !== "x" &&
              val !== "/" &&
              val !== "^" &&
              val !== "%" &&
              flag
            )
              num1 += val;
            else {
              if (!flag) num2 += val;
              else if (flag) opera = val;
              flag = false;
            }
          });
          switch (opera) {
            case "+":
              this.input.value = math1.add(parseFloat(num1), parseFloat(num2));
              break;
            case "-":
              this.input.value = math1.subtract(
                parseFloat(num1),
                parseFloat(num2)
              );
              break;
            case "x":
              this.input.value = math1.multiply(
                parseFloat(num1),
                parseFloat(num2)
              );
              break;
            case "/":
              this.input.value = math1.division(
                parseFloat(num1),
                parseFloat(num2)
              );
              break;
            case "^":
              this.input.value = math1.Potency(
                parseFloat(num2),
                parseFloat(num1)
              );
              break;
            case "%":
              this.input.value = math1.Rest(parseFloat(num1), parseFloat(num2));
              break;
            default:
              console.log("error de caracter");
              break;
          }
          flag = true;
          num1 = " ";
          num2 = " ";
        } else if (
          btn.textContent !== "=" &&
          btn.textContent !== "AC" &&
          btn.textContent !== "DE"
        )
          this.input.value +=
            btn.textContent !== "PI" ? btn.textContent : math1.PY;
        else if (btn.textContent === "AC") this.input.value = " ";
        else if (btn.textContent === "DE")
          this.input.value = utils1.convertStr(
            utils1.myPop(utils1.convertArr(this.input.value))
          );
      });
    });
  },
};

tags1.event("click");
