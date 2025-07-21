/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/IdDataControl.js":
/*!*************************************!*\
  !*** ./js/modules/IdDataControl.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activCheckBox: () => (/* binding */ activCheckBox),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getIdFrom: () => (/* binding */ getIdFrom)
/* harmony export */ });
/* harmony import */ var _myModule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./myModule.js */ "./js/modules/myModule.js");

var inputElements = document.querySelectorAll(".form-point");
var idFrom;
function activCheckBox() {
  var option1Checked = document.querySelector('input[name="option1"]').checked;
  var option2Checked = document.querySelector('input[name="option2"]').checked;
  if (option1Checked) {
    idFrom = inputElements[0].value;
    // console.log(`Проверка чекбоксов 1: ${idFrom}`);
  } else if (option2Checked) {
    var cookieId = document.cookie.split("; ").find(function (row) {
      return row.startsWith("id=");
    });
    if (cookieId) {
      idFrom = cookieId.split("=")[1];
      console.log("\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0447\u0435\u043A\u0431\u043E\u043A\u0441\u043E\u0432 2: ".concat(idFrom));
    } else {
      console.log("id в cookie не найден.");
    }
  } else {
    console.log("Чекбоксы не выделены. Отметьте нужное действие!");
  }
  if (idFrom) {
    _myModule_js__WEBPACK_IMPORTED_MODULE_0__["default"].setID(idFrom);
  }
}

// Экспортируем переменную через функцию, чтобы её значение было актуальным
function getIdFrom() {
  return idFrom;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  activCheckBox: activCheckBox,
  getIdFrom: getIdFrom
});

/***/ }),

/***/ "./js/modules/buttonsClickHandlerPauseResume.js":
/*!******************************************************!*\
  !*** ./js/modules/buttonsClickHandlerPauseResume.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   currentButton2: () => (/* binding */ currentButton2),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _myModule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./myModule.js */ "./js/modules/myModule.js");

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});
var currentButton2;
var buttonsClickHandlerPauseResume = {
  handleClick2: function handleClick2(event) {
    var target = event.target;
    currentButton2 = target.id;
    switch (target.className) {
      case "pause":
        console.log("Pause button clicked");
        window.speechSynthesis.pause();
        _myModule_js__WEBPACK_IMPORTED_MODULE_0__["default"].pause();
        break;
      case "resume":
        console.log("Resume button clicked");
        window.speechSynthesis.resume();
        _myModule_js__WEBPACK_IMPORTED_MODULE_0__["default"].resume();
        break;
      default:
        console.log("Unhandled class: ".concat(target.className));
    }
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buttonsClickHandlerPauseResume);

/***/ }),

/***/ "./js/modules/buttonsClickHandlerPlay.js":
/*!***********************************************!*\
  !*** ./js/modules/buttonsClickHandlerPlay.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getCurrentButton1: () => (/* binding */ getCurrentButton1)
/* harmony export */ });
/* harmony import */ var _IdDataControl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IdDataControl.js */ "./js/modules/IdDataControl.js");
/* harmony import */ var _myModule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./myModule.js */ "./js/modules/myModule.js");
/* harmony import */ var _countNwords_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./countNwords.js */ "./js/modules/countNwords.js");



document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});
window.speechSynthesis.cancel();
var currentButton1;
var buttonsClickHandlerPlay = {
  handleClick1: function handleClick1(event) {
    var target = event.target;
    currentButton1 = target.id;
    switch (target.className) {
      case "play":
        console.log("Play button clicked");
        (0,_IdDataControl_js__WEBPACK_IMPORTED_MODULE_0__.activCheckBox)();
        _countNwords_js__WEBPACK_IMPORTED_MODULE_2__["default"].nWord();
        _myModule_js__WEBPACK_IMPORTED_MODULE_1__["default"].words();
        // console.log(currentButton1);
        break;
      default:
        console.log("Unhandled class: ".concat(target.className));
    }
  }
};
var getCurrentButton1 = function getCurrentButton1() {
  return currentButton1;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buttonsClickHandlerPlay);

/***/ }),

/***/ "./js/modules/controlCheckBox.js":
/*!***************************************!*\
  !*** ./js/modules/controlCheckBox.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});
var controlCheckBox = function controlCheckBox() {
  // Обработка изменения состояния чекбоксов
  document.querySelectorAll(".checkbox").forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      var _this = this;
      if (this.checked) {
        // Если текущий чекбокс выбран, отключаем остальные чекбоксы
        document.querySelectorAll(".checkbox").forEach(function (box) {
          if (box !== _this) {
            box.disabled = true;
          }
        });
      } else {
        // Если текущий чекбокс не выбран, включаем все чекбоксы
        document.querySelectorAll(".checkbox").forEach(function (box) {
          box.disabled = false;
        });
      }
    });
  });

  // Проверка состояния чекбоксов при загрузке страницы
  window.addEventListener("load", function () {
    var firstCheckbox = document.querySelector('.checkbox[name="option1"]');
    if (firstCheckbox && firstCheckbox.checked) {
      // Если первый чекбокс выбран, отключаем остальные чекбоксы
      document.querySelectorAll(".checkbox").forEach(function (box) {
        if (box !== firstCheckbox) {
          box.disabled = true;
        }
      });
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (controlCheckBox);

/***/ }),

/***/ "./js/modules/countNwords.js":
/*!***********************************!*\
  !*** ./js/modules/countNwords.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _myModule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./myModule.js */ "./js/modules/myModule.js");

var countNwords = {
  nWord: function nWord() {
    var countNWordVolue = document.querySelector(".form-pointN").value;
    var optionCheckedNWord = document.querySelector('input[name="option3"]').checked;
    if (!optionCheckedNWord && !countNWordVolue) {
      alert("Отметьте пожалуйста чекбокс, и поставьте нужное колличество слов!");
    }

    // console.log(`Проверка чек бокс 3 ${countNWordVolue}`);
    _myModule_js__WEBPACK_IMPORTED_MODULE_0__["default"].useCountNWord(countNWordVolue);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countNwords);

/***/ }),

/***/ "./js/modules/countdownTimer.js":
/*!**************************************!*\
  !*** ./js/modules/countdownTimer.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var countdown = function countdown(seconds, initialSeconds) {
  var countdownElement = document.getElementById("countdown");
  var circle = document.querySelector(".progress-ring__circle");
  var endDot = document.querySelector(".progress-ring__dot"); // Новый элемент для точки
  var radius = circle.r.baseVal.value;
  var circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = "".concat(circumference, " ").concat(circumference);
  circle.style.strokeDashoffset = circumference;
  var formatTime = function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return "".concat(String(minutes).padStart(2, "0"), ":").concat(String(remainingSeconds).padStart(2, "0"));
  };
  var setProgress = function setProgress(percent) {
    var offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
    var angle = 360 * percent / 100 * (Math.PI / 180); // Угол в радианах
    var x = 60 + radius * Math.cos(angle - Math.PI / 2); // Вычисляем x-координату точки
    var y = 60 + radius * Math.sin(angle - Math.PI / 2); // Вычисляем y-координату точки
    endDot.setAttribute("cx", x);
    endDot.setAttribute("cy", y);
  };
  var timer = setInterval(function () {
    countdownElement.textContent = formatTime(seconds);
    var progress = seconds / initialSeconds * 100;
    setProgress(progress);
    if (seconds <= 0) {
      clearInterval(timer);
      countdownElement.textContent = "Время истекло!";
    }
    seconds--;
  }, 1000);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countdown);

/***/ }),

/***/ "./js/modules/getUtterance.js":
/*!************************************!*\
  !*** ./js/modules/getUtterance.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   voices: () => (/* binding */ voices)
/* harmony export */ });
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});
var voiceList = document.getElementById("voiceSelect");
var selectedVoiceName;
var synth = window.speechSynthesis;
function voices() {
  voiceList.innerHTML = ""; // Очищаем текущие элементы в списке

  var availableVoices = synth.getVoices();
  var defaultVoice = getDefaultVoice(availableVoices);
  availableVoices.forEach(function (voice) {
    var selected = voice === defaultVoice ? "selected" : "";
    var option = "<option value=\"".concat(voice.name, "\" ").concat(selected, ">").concat(voice.name, " (").concat(voice.lang, ")</option>");
    voiceList.insertAdjacentHTML("beforeend", option);
  });
}
function getDefaultVoice(voices) {
  return voices.find(function (voice) {
    return voice.lang === "(en-US)" || voice.lang === "(en-GB)";
  });
}
var voicePlay = {
  getUtterance: function getUtterance(text) {
    var rate = document.getElementById("speed").value;
    var pitch = document.getElementById("pitch").value;
    var availableVoices = synth.getVoices();
    var selectedVoiceName = voiceList.value;
    if (availableVoices.length > 0) {
      var selectedVoice = availableVoices.find(function (voice) {
        return voice.name === selectedVoiceName;
      });
      var U = new SpeechSynthesisUtterance(text);
      U.voice = selectedVoice;
      U.lang = selectedVoice.lang;
      U.volume = 1;
      U.rate = rate;
      U.pitch = pitch;
      return U;
    } else {
      return null;
    }
  }
};

// обработка событий выбора голоса
voiceList.addEventListener("change", function () {
  selectedVoiceName = voiceList.value;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (voicePlay);

/***/ }),

/***/ "./js/modules/myModule.js":
/*!********************************!*\
  !*** ./js/modules/myModule.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _processLines_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./processLines.js */ "./js/modules/processLines.js");
/* harmony import */ var _countdownTimer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./countdownTimer.js */ "./js/modules/countdownTimer.js");
/* harmony import */ var _seleDictionary_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./seleDictionary.js */ "./js/modules/seleDictionary.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var isPaused = false;
var currentID = null;
var count_n_Word = null;
var myModule = {
  useCountNWord: function useCountNWord(n_Word) {
    count_n_Word = n_Word;
  },
  setID: function setID(newID) {
    currentID = newID;
  },
  words: function () {
    var _words = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var requestAdd, sec, filePath, foundObjects, readNextString, response, stream, reader, decoder, result, done, _yield$reader$read, value, streamDone, jsonData, processedCount;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            requestAdd = (0,_seleDictionary_js__WEBPACK_IMPORTED_MODULE_2__.getRequestAdd)();
            console.log("Проверяем содержимое пути", requestAdd);
            sec = Number(document.querySelector("#gap").value) * 1000; // 1. Указываем путь к файлу
            filePath = requestAdd;
            foundObjects = [];
            _context2.prev = 5;
            // 7.Функция для чтения следующей строки с задержкой
            readNextString = /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                var searchString, startIndex, startBracketIndex, endBracketIndex, dataChunk, foundObject, initialSeconds;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      if (!(count_n_Word !== null && processedCount >= count_n_Word)) {
                        _context.next = 3;
                        break;
                      }
                      console.log("\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043E ".concat(processedCount, " \u0441\u0442\u0440\u043E\u043A. \u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u0435."));
                      return _context.abrupt("return");
                    case 3:
                      searchString = "\"id\": \"".concat(currentID, "\"");
                      startIndex = result.indexOf(searchString);
                      if (!(startIndex !== -1)) {
                        _context.next = 32;
                        break;
                      }
                      startBracketIndex = result.lastIndexOf("{", startIndex);
                      endBracketIndex = result.indexOf("}", startIndex) + 1;
                      if (!(startBracketIndex !== -1 && endBracketIndex !== -1)) {
                        _context.next = 29;
                        break;
                      }
                      dataChunk = result.substring(startBracketIndex, endBracketIndex);
                      foundObject = JSON.parse(dataChunk);
                      foundObjects.push(foundObject);
                      currentID++;
                      processedCount++;
                      _context.next = 16;
                      return new Promise(function (resolve) {
                        return setTimeout(resolve, sec);
                      });
                    case 16:
                      if (!isPaused) {
                        _context.next = 21;
                        break;
                      }
                      _context.next = 19;
                      return new Promise(function (resolve) {
                        return setTimeout(resolve, 100);
                      });
                    case 19:
                      _context.next = 16;
                      break;
                    case 21:
                      initialSeconds = sec / 1000;
                      (0,_countdownTimer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(initialSeconds, initialSeconds);
                      window.speechSynthesis.cancel();
                      (0,_processLines_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dataChunk);
                      _context.next = 27;
                      return readNextString();
                    case 27:
                      _context.next = 30;
                      break;
                    case 29:
                      console.log("Начало или конец строки не найдены.");
                    case 30:
                      _context.next = 33;
                      break;
                    case 32:
                      console.log("ID \"".concat(currentID, "\" \u041F\u0440\u0430\u0446\u0435\u0441\u0441 \u0437\u0430\u043A\u043E\u043D\u0447\u0435\u043D.\u0421\u043F\u0430\u0441\u0438\u0431\u043E!"));
                    case 33:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              return function readNextString() {
                return _ref.apply(this, arguments);
              };
            }();
            _context2.next = 9;
            return fetch(filePath);
          case 9:
            response = _context2.sent;
            if (response.ok) {
              _context2.next = 12;
              break;
            }
            throw new Error("Ошибка при загрузке файла");
          case 12:
            // 5. Создаем объект ReadableStreamDefaultReader для чтения потока
            stream = response.body;
            reader = stream.getReader(); // 6. Распарсиваем поток
            decoder = new TextDecoder();
            result = "";
            done = false;
          case 17:
            if (done) {
              _context2.next = 27;
              break;
            }
            _context2.next = 20;
            return reader.read();
          case 20:
            _yield$reader$read = _context2.sent;
            value = _yield$reader$read.value;
            streamDone = _yield$reader$read.done;
            if (value) {
              result += decoder.decode(value, {
                stream: !streamDone
              });
            }
            done = streamDone;
            _context2.next = 17;
            break;
          case 27:
            jsonData = JSON.parse(result);
            console.log("Данные распарсены", jsonData);
            processedCount = 0;
            _context2.next = 32;
            return readNextString();
          case 32:
            _context2.next = 37;
            break;
          case 34:
            _context2.prev = 34;
            _context2.t0 = _context2["catch"](5);
            console.error("Ошибка:", _context2.t0);
          case 37:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[5, 34]]);
    }));
    function words() {
      return _words.apply(this, arguments);
    }
    return words;
  }(),
  pause: function pause() {
    isPaused = true;
  },
  resume: function resume() {
    if (isPaused) {
      isPaused = false;
      myModule.readNextString();
    } else {
      console.log("Speech synthesis is not paused, cannot resume");
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);

/***/ }),

/***/ "./js/modules/processLines.js":
/*!************************************!*\
  !*** ./js/modules/processLines.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _buttonsClickHandlerPlay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttonsClickHandlerPlay.js */ "./js/modules/buttonsClickHandlerPlay.js");
/* harmony import */ var _buttonsClickHandlerPauseResume_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttonsClickHandlerPauseResume.js */ "./js/modules/buttonsClickHandlerPauseResume.js");
/* harmony import */ var _getUtterance_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getUtterance.js */ "./js/modules/getUtterance.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var text, vaarId, vaar1, vaar2;
function processLines(_x) {
  return _processLines.apply(this, arguments);
}
function _processLines() {
  _processLines = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(dataChunk) {
    var currentButton1, parsedData, id, name, title, utterance;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          currentButton1 = (0,_buttonsClickHandlerPlay_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentButton1)(); // console.log(`11111 ${currentButton1} ${currentButton2}`);
          parsedData = JSON.parse(dataChunk);
          id = parsedData.id, name = parsedData.name, title = parsedData.title;
          if (currentButton1 === "but1" || currentButton1 === "but1" && _buttonsClickHandlerPauseResume_js__WEBPACK_IMPORTED_MODULE_1__.currentButton2 === "resumeButton") {
            text = "".concat(name);
            console.log("".concat(id, " - ").concat(text));
            addItemToList(vaarId = id, vaar1 = name, vaar2 = title);
          }
          if (currentButton1 === "but2" || currentButton1 === "but2" && _buttonsClickHandlerPauseResume_js__WEBPACK_IMPORTED_MODULE_1__.currentButton2 === "resumeButton") {
            text = "".concat(title);
            console.log("".concat(id, " - ").concat(text));
            addItemToList(vaarId = id, vaar1 = title, vaar2 = name);
          }
          document.getElementById("text1").value = "".concat(id, " - ").concat(name);
          document.getElementById("text2").value = "".concat(id, " - ").concat(title);
          document.cookie = "id=".concat(id, "; path=/");

          // Вызов voicePlay.getUtterance для воспроизведения текста
          utterance = _getUtterance_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUtterance(text);
          window.speechSynthesis.speak(utterance);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _processLines.apply(this, arguments);
}
function addItemToList(vaarId, vaar1, vaar2) {
  var text3 = document.getElementById("text3");
  if (text3) {
    var listItem = document.createElement("li");
    listItem.textContent = "".concat(vaarId, " - ").concat(vaar1, " - ").concat(vaar2);
    text3.appendChild(listItem);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (processLines);

/***/ }),

/***/ "./js/modules/seleDictionary.js":
/*!**************************************!*\
  !*** ./js/modules/seleDictionary.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRequestAdd: () => (/* binding */ getRequestAdd)
/* harmony export */ });
var seleDictionary = document.getElementById("select2");
var requestAdd;
if (seleDictionary.value === "English dictionary") {
  requestAdd = "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbEn.json";
}
seleDictionary.addEventListener("change", function () {
  if (seleDictionary.value === "Deutsch Wörterbuch") {
    requestAdd = "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbDeu.json";
  }
  if (seleDictionary.value === "Griechικό λεξικό") {
    requestAdd = "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbGr.json";
  }
  if (seleDictionary.value === "Polskie słownictwo") {
    requestAdd = "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbPl.json";
  }
});
function getRequestAdd() {
  return requestAdd;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./js/script.mjs ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_controlCheckBox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/controlCheckBox.js */ "./js/modules/controlCheckBox.js");
/* harmony import */ var _modules_buttonsClickHandlerPlay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/buttonsClickHandlerPlay.js */ "./js/modules/buttonsClickHandlerPlay.js");
/* harmony import */ var _modules_buttonsClickHandlerPauseResume_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/buttonsClickHandlerPauseResume.js */ "./js/modules/buttonsClickHandlerPauseResume.js");
/* harmony import */ var _modules_getUtterance_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/getUtterance.js */ "./js/modules/getUtterance.js");





//запуск с обновлением списка доступных голосов
window.speechSynthesis.onvoiceschanged = _modules_getUtterance_js__WEBPACK_IMPORTED_MODULE_3__.voices;
var but1 = document.getElementById("but1");
var but2 = document.getElementById("but2");
var but3 = document.getElementById("but3");
var but5 = document.getElementById("but5");
var resumeButton = document.getElementById("resumeButton");
but1.addEventListener("click", function (event) {
  _modules_buttonsClickHandlerPlay_js__WEBPACK_IMPORTED_MODULE_1__["default"].handleClick1(event);
});
but2.addEventListener("click", function (event) {
  _modules_buttonsClickHandlerPlay_js__WEBPACK_IMPORTED_MODULE_1__["default"].handleClick1(event);
});
but5.addEventListener("click", function (event) {
  _modules_buttonsClickHandlerPauseResume_js__WEBPACK_IMPORTED_MODULE_2__["default"].handleClick2(event);
});
resumeButton.addEventListener("click", function (event) {
  _modules_buttonsClickHandlerPauseResume_js__WEBPACK_IMPORTED_MODULE_2__["default"].handleClick2(event);
});
but3.addEventListener("click", function () {
  setTimeout(function () {
    location.reload();
  }, 1000);
});
(0,_modules_controlCheckBox_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map