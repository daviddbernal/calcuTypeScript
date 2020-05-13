String.prototype.iterator = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var i = 0; i < this.length; i++)
        args[0](this[i], i);
    return 1;
};
NodeList.prototype.iterator = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var i = 0; i < this.length; i++)
        args[0](this[i], i);
    return 1;
};
String.prototype.convertArr = function () {
    var arr = [];
    this.iterator(function (_this) {
        arr.push(_this);
    });
    return arr;
};
Array.prototype.myPop = function () {
    var arr = [];
    for (var i = 0; i < this.length - 1; i++)
        arr.push(this[i]);
    return arr;
};
Array.prototype.convertStr = function () {
    var str = "";
    for (var i = 0; i < this.length; i++)
        str += this[i];
    return str;
};
var __math__ = {
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
var calcu = {
    btns: document.querySelectorAll("button"),
    input: document.querySelector("input"),
    restric: /([0-9]+[\x\-\/\%\^\+]{1}[0-9]+)/g,
    event: function (event) {
        var _this_1 = this;
        var num1 = "", num2 = "", opera = "", flag = true, test = true;
        this.btns.iterator(function (btn) {
            btn.addEventListener(event, function () {
                if (btn.textContent === "=" && test && _this_1.input.value !== " ") {
                    _this_1.input.value.iterator(function (val) {
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
                            _this_1.input.value = __math__.add(parseFloat(num1), parseFloat(num2));
                            break;
                        case "-":
                            _this_1.input.value = __math__.subtract(parseFloat(num1), parseFloat(num2));
                            break;
                        case "x":
                            _this_1.input.value = __math__.multiply(parseFloat(num1), parseFloat(num2));
                            break;
                        case "/":
                            _this_1.input.value = __math__.division(parseFloat(num1), parseFloat(num2));
                            break;
                        case "^":
                            _this_1.input.value = __math__.Potency(parseFloat(num2), parseFloat(num1));
                            break;
                        case "%":
                            _this_1.input.value = __math__.Rest(parseFloat(num1), parseFloat(num2));
                            break;
                        default:
                            console.log("error de caracter");
                            break;
                    }
                    flag = true;
                    num1 = "";
                    num2 = "";
                }
                else if (btn.textContent !== "=" &&
                    btn.textContent !== "AC" &&
                    btn.textContent !== "DE") {
                    _this_1.input.value +=
                        btn.textContent !== "PI" ? btn.textContent : __math__.PY;
                    test = _this_1.restric.test(_this_1.input.value);
                }
                else if (btn.textContent === "AC") {
                    _this_1.input.value = " ";
                }
                else if (btn.textContent === "DE") {
                    _this_1.input.value = _this_1.input.value.convertArr().myPop().convertStr();
                }
            });
        });
    }
};
calcu.event("click");
