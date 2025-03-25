"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _logo = _interopRequireDefault(require("./logo.svg"));
require("./App.css");
var _index = _interopRequireDefault(require("./components/Forms/index"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function App() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "App",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("header", {
      className: "App-header",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        src: _logo["default"],
        className: "App-logo",
        alt: "logo"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index["default"], {}), " ", /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
        className: "App-link",
        href: "https://reactjs.org",
        target: "_blank",
        rel: "noopener noreferrer",
        children: "Learn React"
      })]
    })
  });
}
var _default = exports["default"] = App;