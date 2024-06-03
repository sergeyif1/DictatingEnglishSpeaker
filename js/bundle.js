/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/IdDataHandler.js":
/*!*************************************!*\
  !*** ./js/modules/IdDataHandler.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _myModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./myModule */ "./js/modules/myModule.js");

var IdDataHandler = {
  existingUseID: function existingUseID(currentButton) {
    var useID = inputElement.value;
    var sec = Number(pintSec.value) * 1000;
    _myModule__WEBPACK_IMPORTED_MODULE_0__["default"].words(useID, sec, currentButton);
  }
};
var inputElement = document.querySelector(".form-point");
var pintSec = document.querySelector("#gap");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IdDataHandler);

/***/ }),

/***/ "./js/modules/buttonsClickHandler.js":
/*!*******************************************!*\
  !*** ./js/modules/buttonsClickHandler.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   currentButton: () => (/* binding */ currentButton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _IdDataHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IdDataHandler.js */ "./js/modules/IdDataHandler.js");

var currentButton;
var buttonsClickHandler = {
  handleClick: function handleClick(event) {
    var target = event.target;
    currentButton = target.id;
    // console.log(event.target, target.id);

    if (target && target.classList.contains(PLAY)) {
      switch (target.className) {
        case PLAY:
          speechSynthesis.cancel();
          _IdDataHandler_js__WEBPACK_IMPORTED_MODULE_0__["default"].existingUseID(target, currentButton);
          break;
      }
    }
  }
};
var PLAY = "play";

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buttonsClickHandler);

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
var voiceList = document.querySelector("#voiceSelect");
var synth = speechSynthesis;
function voices() {
  voiceList.innerHTML = "";
  var availableVoices = synth.getVoices();
  var defaultVoice = getDefaultVoice(availableVoices);
  availableVoices.forEach(function (voice) {
    var selected = voice === defaultVoice ? "selected" : "";
    var option = "<option value=\"".concat(voice.name, "\" ").concat(selected, ">").concat(voice.name, " (").concat(voice.lang, ")</option>");
    voiceList.insertAdjacentHTML("beforeend", option);
  });
}
synth.onvoiceschanged = voices;
function getDefaultVoice(voices) {
  return voices.find(function (voice) {
    return voice.lang === "en-US" || voice.lang === "en-GB";
  });
}
var voicePlay = {
  getUtterance: function getUtterance(text) {
    // console.log(text);
    var availableVoices = speechSynthesis.getVoices();
    var selectedVoiceName = voiceList.value;
    if (availableVoices.length > 0) {
      var selectedVoice = availableVoices.find(function (voice) {
        return voice.name === selectedVoiceName;
      });
      //3.Создаем экземпляр SpeechSynthesisUtterance ("utterance" можно перевести как "выражение текста словами")
      var U = new SpeechSynthesisUtterance(text);
      // Передаем голос и другие настройки экземпляру
      U.voice = selectedVoice;
      U.lang = selectedVoice.lang;
      U.volume = 1;
      return U;
    } else {
      console.error("No available voices found.");
      return null;
    }
  }
};
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
/* harmony import */ var _processLines__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./processLines */ "./js/modules/processLines.js");
/* harmony import */ var _countdownTimer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./countdownTimer */ "./js/modules/countdownTimer.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var myModule = {
  words: function () {
    var _words = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(startID, sec) {
      var currentID, filePath, foundObjects, readNextString, response, stream, reader, decoder, result, done, _yield$reader$read, value, streamDone, jsonData;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            currentID = startID; // Инициализируем текущий ID
            // 1. Указываем путь к файлу
            filePath = "../db.json";
            foundObjects = []; // Массив для хранения найденных объектов
            _context2.prev = 3;
            // Функция для чтения следующей строки с задержкой
            readNextString = /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                var searchString, startIndex, startBracketIndex, endBracketIndex, dataChunk, foundObject, initialSeconds;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      // Начинаем читать поток с указанного ID
                      searchString = "\"id\": \"".concat(currentID, "\"");
                      startIndex = result.indexOf(searchString);
                      if (!(startIndex !== -1)) {
                        _context.next = 22;
                        break;
                      }
                      startBracketIndex = result.lastIndexOf("{", startIndex);
                      endBracketIndex = result.indexOf("}", startIndex) + 1;
                      if (!(startBracketIndex !== -1 && endBracketIndex !== -1)) {
                        _context.next = 19;
                        break;
                      }
                      dataChunk = result.substring(startBracketIndex, endBracketIndex); // console.log("Прочитанная строка:", dataChunk);
                      // Добавляем объект в массив найденных объектов
                      foundObject = JSON.parse(dataChunk);
                      foundObjects.push(foundObject);

                      // Увеличиваем текущий ID на 1
                      currentID++;

                      // Добавляем задержку в секундах перед выполнением следующего задания
                      _context.next = 12;
                      return new Promise(function (resolve) {
                        return setTimeout(resolve, sec);
                      });
                    case 12:
                      // Читаем следующую строку после задержки
                      // console.log(
                      //   "Следующая прочитанная строка после задержки:",
                      //   dataChunk
                      // );
                      initialSeconds = sec / 1000;
                      (0,_countdownTimer__WEBPACK_IMPORTED_MODULE_1__["default"])(initialSeconds, initialSeconds);
                      (0,_processLines__WEBPACK_IMPORTED_MODULE_0__["default"])(dataChunk);

                      // Рекурсивный вызов функции для чтения следующей строки
                      _context.next = 17;
                      return readNextString();
                    case 17:
                      _context.next = 20;
                      break;
                    case 19:
                      console.log("Начало или конец строки не найдены.");
                    case 20:
                      _context.next = 23;
                      break;
                    case 22:
                      console.log("ID \"".concat(currentID, "\" \u041F\u0440\u0430\u0446\u0435\u0441\u0441 \u0437\u0430\u043A\u043E\u043D\u0447\u0435\u043D.\u0421\u043F\u0430\u0441\u0438\u0431\u043E!"));
                    case 23:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              return function readNextString() {
                return _ref.apply(this, arguments);
              };
            }(); // Вызываем функцию чтения строки
            _context2.next = 7;
            return fetch(filePath);
          case 7:
            response = _context2.sent;
            console.log("Файл загружен");

            // 3. Обрабатываем ошибку соединения
            if (response.ok) {
              _context2.next = 11;
              break;
            }
            throw new Error("Ошибка при загрузке файла");
          case 11:
            // 4. Получаем поток данных из тела ответа
            stream = response.body;
            console.log("Поток данных получен", stream);

            // 5. Создаем объект ReadableStreamDefaultReader для чтения потока
            reader = stream.getReader();
            console.log("Читатель потока создан", reader);

            // 6. Распарсиваем поток
            decoder = new TextDecoder();
            result = "";
            done = false;
          case 18:
            if (done) {
              _context2.next = 28;
              break;
            }
            _context2.next = 21;
            return reader.read();
          case 21:
            _yield$reader$read = _context2.sent;
            value = _yield$reader$read.value;
            streamDone = _yield$reader$read.done;
            if (value) {
              result += decoder.decode(value, {
                stream: !streamDone
              });
            }
            done = streamDone;
            _context2.next = 18;
            break;
          case 28:
            jsonData = JSON.parse(result);
            console.log("Данные распарсены", jsonData);
            _context2.next = 32;
            return readNextString();
          case 32:
            _context2.next = 37;
            break;
          case 34:
            _context2.prev = 34;
            _context2.t0 = _context2["catch"](3);
            console.error("Ошибка:", _context2.t0);
          case 37:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[3, 34]]);
    }));
    function words(_x, _x2) {
      return _words.apply(this, arguments);
    }
    return words;
  }()
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);

//---------------------------------------------------
// import processLines from "./processLines";

// const myModule = {
//   words: async function (useID, sec) {
//     const filePath = "../db.json";

//     try {
//       const response = await fetch(filePath);
//       if (!response.ok) {
//         throw new Error("Ошибка при загрузке файла");
//       }

//       const data = await response.json();
//       //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//       // Ищем объект в массиве "dictionary" по значению "id"
//       const foundIndex = data.dictionary.findIndex(
//         (dataWord) => dataWord.id === useID
//       );

//       if (foundIndex !== -1) {
//         // Создаем поток для оставшейся части массива "dictionary" от найденного индекса
//         const remainingData = data.dictionary.slice(foundIndex);

//         // Очищаем предыдущий объект
//         let previousObject = null;

//         // Читаем объекты из потока и выводим их в консоль с задержкой
//         for (const dataWord of remainingData) {
//           // Очищаем предыдущий объект
//           if (previousObject !== null) {
//             console.clear();
//           }
//           // Выводим текущий объект в консоль  и запускаем и запускаем processLines()
//           processLines(dataWord);
//           console.log(dataWord);

//           // Задержка в 2 секунды
//           await new Promise((resolve) => setTimeout(resolve, sec));
//           previousObject = dataWord;
//         }
//       } else {
//         console.log("Объект с указанным id не найден");
//       }
//       //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//     } catch (error) {
//       console.error(error);
//     }
//   },
// };

// export default myModule;

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
/* harmony import */ var _getUtterance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getUtterance */ "./js/modules/getUtterance.js");
/* harmony import */ var _buttonsClickHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttonsClickHandler */ "./js/modules/buttonsClickHandler.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


function processLines(_x) {
  return _processLines.apply(this, arguments);
}
function _processLines() {
  _processLines = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(dataChunk) {
    var parsedData, id, name, title, text, Utl;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // Парсим JSON-строку в объект
          parsedData = JSON.parse(dataChunk);
          id = parsedData.id, name = parsedData.name, title = parsedData.title; // console.log("processLines:", id, name, title);
          if (_buttonsClickHandler__WEBPACK_IMPORTED_MODULE_1__.currentButton === "but1") {
            text = "".concat(name);
            console.log("".concat(id, " - ").concat(text));
          } else if (_buttonsClickHandler__WEBPACK_IMPORTED_MODULE_1__.currentButton === "but2") {
            text = "".concat(title);
            console.log("".concat(id, " - ").concat(text));
          }
          Utl = _getUtterance__WEBPACK_IMPORTED_MODULE_0__["default"].getUtterance(text);
          speechSynthesis.speak(Utl); // speechSynthesis - он самостоятельный запускается с любого места

          document.getElementById("text1").value = "".concat(id, " - ").concat(name);
          document.getElementById("text2").value = "".concat(id, " - ").concat(title);
          document.cookie = "id=".concat(id, "; path=/");
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _processLines.apply(this, arguments);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (processLines);

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
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_buttonsClickHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/buttonsClickHandler */ "./js/modules/buttonsClickHandler.js");
/* harmony import */ var _modules_getUtterance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/getUtterance */ "./js/modules/getUtterance.js");


document.addEventListener("keydown", function (KeyboardEvent) {
  // console.log(KeyboardEvent.key);
  if (KeyboardEvent.key === "Enter") {
    KeyboardEvent.preventDefault();
  }
});
but1.addEventListener("click", function (event) {
  _modules_buttonsClickHandler__WEBPACK_IMPORTED_MODULE_0__["default"].handleClick(event);
});
but2.addEventListener("click", function (event) {
  _modules_buttonsClickHandler__WEBPACK_IMPORTED_MODULE_0__["default"].handleClick(event);
});
(0,_modules_getUtterance__WEBPACK_IMPORTED_MODULE_1__.voices)();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map