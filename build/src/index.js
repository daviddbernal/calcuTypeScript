"use strict";
window.addEventListener("load", () => {
    Load();
});
const math1 = {
    add: function (...args) {
        return args[0] + args[1];
    },
    subtract: function (...args) {
        return args[0] - args[1];
    },
    multiply: function (...args) {
        return args[0] * args[1];
    },
    Potency: function (...args) {
        return Math.pow(args[0], args[1]);
    },
    division: function (...args) {
        return args[0] / args[1];
    },
    Rest: function (...args) {
        return args[0] % args[1];
    },
    root: function (...args) {
        return Math.pow(args[1], 1 / args[0]);
    },
    PY: Math.PI,
};
const Utils = (function () {
    // function private
    // var str = "3+42+33-3"; space(str,'-')  out "3+42+33 - 3";
    const Space = (Str, item) => {
        var newArr = "";
        for (var itera = 0; itera < Str.length; itera++) {
            if (Str[itera] === item) {
                newArr += itera === 0 ? Str[itera] : " " + Str[itera] + " ";
            }
            else
                newArr += Str[itera];
        }
        return newArr;
    };
    // function private
    // it returs a number in type string
    // ej num1 "23" num2 "3" sign "+"  out "26"
    const resultAux = (num1, num2, sign) => {
        var res = "";
        switch (sign) {
            case "+":
                res += math1.add(parseFloat(num1), parseFloat(num2));
                break;
            case "-":
                res += math1.subtract(parseFloat(num1), parseFloat(num2));
                break;
            case "/":
                res += math1.division(parseFloat(num1), parseFloat(num2));
                break;
            case "x":
                res += math1.multiply(parseFloat(num1), parseFloat(num2));
                break;
            case "%":
                res += math1.Rest(parseFloat(num1), parseFloat(num2));
                break;
            case "^":
                res += math1.Potency(parseFloat(num1), parseFloat(num2));
                break;
            case "√":
                res += math1.root(parseFloat(num1), parseFloat(num2));
                break;
            default:
                console.log("el signo no coincide");
                break;
        }
        return res;
    };
    return {
        // space("3+3-23x33/3+1",['-','+','/','x']) out "3 + 3 - 23 x 33 / 3 + 1"
        space: (Str, items) => {
            for (var i = 0; i < items.length; i++)
                Str = Space(Str, items[i]);
            return Str;
        },
        // to make it work var Str = "3 + 3 - 23 x 33 / 3 + 1";
        // Result(Str);
        // out "6 - 23 x 33 / 3 + 1"
        // out "-17 x 33 / 3 + 1"
        // out "-561 / 3 + 1"
        // out "-187 + 1"
        // out "-186"
        Result: (Str) => {
            // Str = "3 + 3 - 23 x 33 / 3 + 1"
            //out ["3","+","3","-","23","x","33","/","3","+","1"]
            var arr = Str.split(" ");
            while (arr.length > 1) {
                var num1 = arr.shift(), sign = arr.shift(), num2 = arr.shift(), res = resultAux(num1, num2, sign);
                arr.unshift(res);
            }
            return arr[0];
        },
        // ej var Nodelist = [document.createElement("div"),document.createElement("span")];
        // iteraNode(Nodelist,(_Node_,index) => console.log(_Node_,'',index));
        iteraNode: (nodeL, func) => {
            for (var i = 0; i < nodeL.length; i++)
                func(nodeL[i], i);
        },
        // var str = "hello, world";
        // popStr(str) out "hello, worl";
        popStr: (str) => {
            var newStr = "";
            for (var itera = 0; itera < str.length - 1; itera++)
                newStr += str[itera];
            return newStr;
        },
        disableBtn: (nodeL, des, available) => {
            var index = 0;
            nodeL.forEach((node) => {
                if (index > des)
                    node.disabled = available;
                else
                    node.disabled = !available;
                index++;
            });
        },
    };
})();
const Load = () => {
    const tags1 = {
        btns: document.querySelectorAll("button.available"),
        input: document.querySelector("input"),
        controllers: document.querySelectorAll(".control"),
    };
    const btnClick = (btn) => {
        if (btn.textContent !== "=" &&
            btn.textContent !== "DE" &&
            btn.textContent !== "AC")
            tags1.input.value +=
                btn.textContent === "PI" ? math1.PY : btn.textContent;
        else if (btn.textContent === "=")
            tags1.input.value = Utils.Result(Utils.space(tags1.input.value, ["+", "-", "x", "/", "^", "%", "√"]));
        else if (btn.textContent === "DE")
            tags1.input.value = Utils.popStr(tags1.input.value);
        else if (btn.textContent === "AC")
            tags1.input.value = "";
    };
    Utils.iteraNode(tags1.btns, (btn) => {
        Utils.disableBtn(tags1.btns, -1, false);
        btn.addEventListener("click", () => {
            btnClick(btn);
        });
    });
};
