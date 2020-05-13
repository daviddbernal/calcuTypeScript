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

String.prototype.iterator = function (...args: [Function]) {
  for (let i = 0; i < this.length; i++) args[0](this[i], i);
  return 1;
};

NodeList.prototype.iterator = function (...args: [Function]) {
  for (let i = 0; i < this.length; i++) args[0](this[i], i);
  return 1;
};

let __math__: math = {
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

let calcu: Tags = {
  btns: document.querySelectorAll("button"),
  input: document.querySelector("input"),
  restric: /([0-9]+[\x\-\/\%\^\+]{1}[0-9]+)/g,
  event: function (event: string) {
    let num1: string = "",
      num2: string = "",
      opera: string = "",
      flag = true,
      test = true;
    this.btns.iterator((btn) => {
      btn.addEventListener(event, () => {
        if (btn.textContent === "=" && test && this.input.value !== " ") {
          this.input.value.iterator((val) => {
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
              if (flag) opera = val;
              flag = false;
            }
          });
          switch (opera) {
            case "+":
              this.input.value = __math__.add(
                parseFloat(num1),
                parseFloat(num2)
              );
              break;
            case "-":
              this.input.value = __math__.subtract(
                parseFloat(num1),
                parseFloat(num2)
              );
              break;
            case "x":
              this.input.value = __math__.multiply(
                parseFloat(num1),
                parseFloat(num2)
              );
              break;
            case "/":
              this.input.value = __math__.division(
                parseFloat(num1),
                parseFloat(num2)
              );
              break;
            case "^":
              this.input.value = __math__.Potency(
                parseFloat(num1),
                parseFloat(num2)
              );
              break;
            case "%":
              this.input.value = __math__.Rest(
                parseFloat(num1),
                parseFloat(num2)
              );
              break;
            default:
              console.log("error de caracter");
              break;
          }
          flag = true;
          num1 = "";
          num2 = "";
        } else if (btn.textContent !== "=") {
          this.input.value += btn.textContent;
          test = this.restric.test(this.input.value);
        }
      });
    });
  },
};

calcu.event("click");

console.log(calcu.input);
