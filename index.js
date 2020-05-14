var utils1 = {
    iteraStr: function (str, func) {
        for (var i = 0; i < str.length; i++)
            func(str[i], i);
    },
    iteraNodeList: function (nodeLs, func) {
        for (var i = 0; i < nodeLs.length; i++)
            func(nodeLs[i], i);
    },
    myPop: function (arr) {
        var newArr = [];
        for (var i = 0; i < arr.length - 1; i++)
            newArr.push(arr[i]);
        return newArr;
    },
    convertArr: function (str) {
        var arr = [];
        for (var i = 0; i < str.length; i++)
            arr.push(str[i]);
        return arr;
    },
    convertStr: function (arr) {
        var str = " ";
        for (var i = 0; i < arr.length; i++)
            str += arr[i];
        return str;
    }
};
var math1 = {
    add: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args[0] + args[1];
    },
    subtract: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args[0] - args[1];
    },
    multiply: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args[0] * args[1];
    },
    Potency: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Math.pow(args[1], args[0]);
    },
    division: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args[0] / args[1];
    },
    max: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args[0] > args[1] ? args[0] : args[1];
    },
    min: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args[0] < args[1] ? args[0] : args[1];
    },
    trunc: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.max(args[0], this.min(args[1], args[2]));
    },
    Rest: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args[0] % args[1];
    },
    PY: Math.PI
};
var tags1 = {
    btns: document.querySelectorAll("button"),
    input: document.querySelector("input"),
    restric: /([0-9]{1,}(\.[0-9]{1,}){0,1}[\x\+\-\/\^\%]{1,1}[0-9]{1,}(\.[0-9]{1,}){0,1})$/g,
    event: function (event) {
        var _this = this;
        var num1 = "", num2 = "", opera = "", flag = true, test = true;
        utils1.iteraNodeList(this.btns, function (btn) {
            btn.addEventListener(event, function () {
                test = _this.restric.test(_this.input.value);
                if (btn.textContent === "=" && test && _this.input.value !== " ") {
                    utils1.iteraStr(_this.input.value, function (val) {
                        if (val !== "+" &&
                            val !== "-" &&
                            val !== "x" &&
                            val !== "/" &&
                            val !== "^" &&
                            val !== "%" &&
                            flag)
                            num1 += val;
                        else {
                            if (!flag)
                                num2 += val;
                            else if (flag)
                                opera = val;
                            flag = false;
                        }
                    });
                    switch (opera) {
                        case "+":
                            _this.input.value = math1.add(parseFloat(num1), parseFloat(num2));
                            break;
                        case "-":
                            _this.input.value = math1.subtract(parseFloat(num1), parseFloat(num2));
                            break;
                        case "x":
                            _this.input.value = math1.multiply(parseFloat(num1), parseFloat(num2));
                            break;
                        case "/":
                            _this.input.value = math1.division(parseFloat(num1), parseFloat(num2));
                            break;
                        case "^":
                            _this.input.value = math1.Potency(parseFloat(num2), parseFloat(num1));
                            break;
                        case "%":
                            _this.input.value = math1.Rest(parseFloat(num1), parseFloat(num2));
                            break;
                        default:
                            console.log("error de caracter");
                            break;
                    }
                    flag = true;
                    num1 = " ";
                    num2 = " ";
                }
                else if (btn.textContent !== "=" &&
                    btn.textContent !== "AC" &&
                    btn.textContent !== "DE")
                    _this.input.value +=
                        btn.textContent !== "PI" ? btn.textContent : math1.PY;
                else if (btn.textContent === "AC")
                    _this.input.value = " ";
                else if (btn.textContent === "DE")
                    _this.input.value = utils1.convertStr(utils1.myPop(utils1.convertArr(_this.input.value)));
            });
        });
    }
};
tags1.event("click");
