"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SbdSplitter = void 0;
var tokenizer = _interopRequireWildcard(require("sbd"));
var _text_splitter = require("langchain/text_splitter");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var SbdSplitter = exports.SbdSplitter = /*#__PURE__*/function (_RecursiveCharacterTe) {
  function SbdSplitter(options) {
    var _this;
    _classCallCheck(this, SbdSplitter);
    _this = _callSuper(this, SbdSplitter, [_objectSpread({
      chunkSize: 1000,
      // Absolute max chunk size
      keepSeparator: true,
      delimiters: ['.', '?', '!']
    }, options)]);
    _this.sbd_marker = options.sbd_marker || '&#&#&#';
    _this.softMaxChunkSize = options.softMaxChunkSize || 800;
    _this.delimiters = [_this.sbd_marker, ' ', ''];
    _this.sbd_options = _objectSpread({
      newline_boundaries: false,
      html_boundaries: false,
      sanitize: false,
      allowed_tags: false,
      preserve_whitespace: true,
      abbreviations: undefined
    }, options.sbd_options);
    return _this;
  }

  /**
     * Splits the input text into sentences using the tokenizer and then processes the text to split it further.
     * @param text - The input text to be split.
     * @param options - Additional options for splitting.
     * @returns An array of split text chunks.
     */
  _inherits(SbdSplitter, _RecursiveCharacterTe);
  return _createClass(SbdSplitter, [{
    key: "splitText",
    value: (function () {
      var _splitText = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(text) {
        var options,
          regex,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              // Tokenize the text into sentences
              text = tokenizer.sentences(text, _objectSpread(_objectSpread({}, this.sbd_options), options)).join(this.sbd_marker);
              regex = new RegExp(this.sbd_marker, 'g'); // Split the text further using the defined separators
              _context.next = 5;
              return this._customSplitText(text, this.separators);
            case 5:
              return _context.abrupt("return", _context.sent.map(function (c) {
                return c.replace(regex, '');
              }));
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function splitText(_x) {
        return _splitText.apply(this, arguments);
      }
      return splitText;
    }()
    /**
       * Merges the split text chunks into larger chunks while respecting the chunkSize and softMaxChunkSize limits.
       * @param splits - The array of split text chunks.
       * @param separator - The separator to use when joining chunks.
       * @param max - The maximum chunk size.
       * @returns An array of merged text chunks.
       */
    )
  }, {
    key: "mergeSplits",
    value: (function () {
      var _mergeSplits = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(splits, separator, max) {
        var docs, currentDoc, total, _iterator, _step, d, _len, _doc, doc;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              max = max || this.softMaxChunkSize;
              docs = [];
              currentDoc = [];
              total = 0;
              _iterator = _createForOfIteratorHelper(splits);
              _context2.prev = 5;
              _iterator.s();
            case 7:
              if ((_step = _iterator.n()).done) {
                _context2.next = 17;
                break;
              }
              d = _step.value;
              _context2.next = 11;
              return this.lengthFunction(d);
            case 11:
              _len = _context2.sent;
              if (total > max || total + _len > this.chunkSize) {
                if (currentDoc.length > 0) {
                  // @ts-expect-error - joinDocs is a private function
                  _doc = this.joinDocs(currentDoc, separator);
                  if (_doc !== null) {
                    docs.push(_doc);
                    currentDoc = [];
                    total = 0;
                  }
                }
              }
              currentDoc.push(d);
              total += _len;
            case 15:
              _context2.next = 7;
              break;
            case 17:
              _context2.next = 22;
              break;
            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](5);
              _iterator.e(_context2.t0);
            case 22:
              _context2.prev = 22;
              _iterator.f();
              return _context2.finish(22);
            case 25:
              // @ts-expect-error - joinDocs is a private function
              doc = this.joinDocs(currentDoc, separator);
              if (doc !== null) {
                docs.push(doc);
              }
              return _context2.abrupt("return", docs);
            case 28:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[5, 19, 22, 25]]);
      }));
      function mergeSplits(_x2, _x3, _x4) {
        return _mergeSplits.apply(this, arguments);
      }
      return mergeSplits;
    }()
    /**
       * Recursively splits the text based on the provided separators and merges the splits into chunks.
       * @param text - The input text to be split.
       * @param separators - The array of separators to use for splitting.
       * @returns An array of final text chunks.
       */
    )
  }, {
    key: "_customSplitText",
    value: (function () {
      var _customSplitText2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(text, separators) {
        var finalChunks, separator, newSeparators, i, s, postSBDseparators, goodSplits, _separator, splits, original, max, _iterator2, _step2, _s, length, _mergedText, otherInfo, mergedText;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              finalChunks = [];
              separator = separators[separators.length - 1];
              i = 0;
            case 3:
              if (!(i < separators.length)) {
                _context3.next = 15;
                break;
              }
              s = separators[i];
              if (!(s === '')) {
                _context3.next = 8;
                break;
              }
              separator = s;
              return _context3.abrupt("break", 15);
            case 8:
              if (!text.includes(s)) {
                _context3.next = 12;
                break;
              }
              separator = s;
              newSeparators = separators.slice(i + 1);
              return _context3.abrupt("break", 15);
            case 12:
              i += 1;
              _context3.next = 3;
              break;
            case 15:
              postSBDseparators = separators.slice(separators.indexOf(this.sbd_marker) + 1);
              goodSplits = [];
              _separator = this.keepSeparator ? '' : separator;
              splits = this.splitOnSeparator(text, separator);
              if (separator === this.sbd_marker) {
                original = this.keepSeparator;
                this.keepSeparator = false;
                splits = this.splitOnSeparator(text, separator);
                this.keepSeparator = original;
              }
              max = postSBDseparators.includes(separator) ? this.chunkSize : this.softMaxChunkSize;
              _iterator2 = _createForOfIteratorHelper(splits);
              _context3.prev = 22;
              _iterator2.s();
            case 24:
              if ((_step2 = _iterator2.n()).done) {
                _context3.next = 49;
                break;
              }
              _s = _step2.value;
              _context3.next = 28;
              return this.lengthFunction(_s);
            case 28:
              length = _context3.sent;
              if (!(length < max)) {
                _context3.next = 33;
                break;
              }
              goodSplits.push(_s);
              _context3.next = 47;
              break;
            case 33:
              if (!goodSplits.length) {
                _context3.next = 39;
                break;
              }
              _context3.next = 36;
              return this.mergeSplits(goodSplits, _separator);
            case 36:
              _mergedText = _context3.sent;
              finalChunks.push.apply(finalChunks, _toConsumableArray(_mergedText));
              goodSplits = [];
            case 39:
              if (newSeparators) {
                _context3.next = 43;
                break;
              }
              finalChunks.push(_s);
              _context3.next = 47;
              break;
            case 43:
              _context3.next = 45;
              return this._customSplitText(_s, newSeparators);
            case 45:
              otherInfo = _context3.sent;
              finalChunks.push.apply(finalChunks, _toConsumableArray(otherInfo));
            case 47:
              _context3.next = 24;
              break;
            case 49:
              _context3.next = 54;
              break;
            case 51:
              _context3.prev = 51;
              _context3.t0 = _context3["catch"](22);
              _iterator2.e(_context3.t0);
            case 54:
              _context3.prev = 54;
              _iterator2.f();
              return _context3.finish(54);
            case 57:
              if (!goodSplits.length) {
                _context3.next = 62;
                break;
              }
              _context3.next = 60;
              return this.mergeSplits(goodSplits, _separator, max);
            case 60:
              mergedText = _context3.sent;
              finalChunks.push.apply(finalChunks, _toConsumableArray(mergedText));
            case 62:
              return _context3.abrupt("return", finalChunks);
            case 63:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[22, 51, 54, 57]]);
      }));
      function _customSplitText(_x5, _x6) {
        return _customSplitText2.apply(this, arguments);
      }
      return _customSplitText;
    }())
  }]);
}(_text_splitter.RecursiveCharacterTextSplitter);