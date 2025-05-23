"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./form.css");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var SimpleForm = function SimpleForm() {
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    count = _useState2[0],
    setCount = _useState2[1];
  var clickOnMe = function clickOnMe() {
    setCount(count + 1);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      "data-testid": "countbutton",
      onClick: clickOnMe,
      children: "Click me"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      "data-testid": "count",
      children: count
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
      "data-testid": "form",
      className: "form",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "formGroup",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "Lastname",
          className: "label",
          children: "Enter your Last name: "
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "text",
          name: "Lastname",
          id: "Lastname",
          required: true,
          "class": "input"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "formGroup",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "name",
          className: "label",
          children: "Enter your First name: "
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "text",
          name: "Firstname",
          id: "name",
          required: true,
          "class": "input"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "formGroup",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "email",
          className: "label",
          children: "Enter your email: "
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "email",
          name: "email",
          id: "email",
          required: true,
          "class": "input"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "formGroup",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "date",
          className: "label",
          children: "Enter your date of birth: "
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "date",
          name: "date",
          id: "date",
          required: true,
          "class": "input"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "formGroup",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "city",
          className: "label",
          children: "Enter your City: "
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "city",
          name: "city",
          id: "city",
          required: true,
          "class": "input"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "formGroup",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "postalCode",
          className: "label",
          children: "Enter your postal code: "
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "city",
          name: "postalCode",
          id: "postalCode",
          required: true,
          "class": "input"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "formGroup",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "submit",
          value: "Save",
          "class": "button"
        })
      })]
    })]
  });
};
var _default = exports["default"] = SimpleForm;