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
        var _this = this;
        var num1 = "", num2 = "", opera = "", flag = true, test = true;
        this.btns.iterator(function (btn) {
            btn.addEventListener(event, function () {
                if (btn.textContent === "=" && test && _this.input.value !== " ") {
                    _this.input.value.iterator(function (val) {
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
                            if (flag)
                                opera = val;
                            flag = false;
                        }
                    });
                    switch (opera) {
                        case "+":
                            _this.input.value = __math__.add(parseFloat(num1), parseFloat(num2));
                            break;
                        case "-":
                            _this.input.value = __math__.subtract(parseFloat(num1), parseFloat(num2));
                            break;
                        case "x":
                            _this.input.value = __math__.multiply(parseFloat(num1), parseFloat(num2));
                            break;
                        case "/":
                            _this.input.value = __math__.division(parseFloat(num1), parseFloat(num2));
                            break;
                        case "^":
                            _this.input.value = __math__.Potency(parseFloat(num1), parseFloat(num2));
                            break;
                        case "%":
                            _this.input.value = __math__.Rest(parseFloat(num1), parseFloat(num2));
                            break;
                        default:
                            console.log("error de caracter");
                            break;
                    }
                    flag = true;
                    num1 = "";
                    num2 = "";
                }
                else if (btn.textContent !== "=") {
                    _this.input.value += btn.textContent;
                    test = _this.restric.test(_this.input.value);
                }
            });
        });
    }
};
calcu.event("click");
console.log(calcu.input);
