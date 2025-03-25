"use strict";

var _react = require("@testing-library/react");
var _App = _interopRequireDefault(require("./App"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
test("check counter on click me button", function () {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App["default"], {})); // render the component
  var button = _react.screen.getByTestId("countbutton"); // get the button
  var counter = _react.screen.getByTestId("count"); // get the counter
  expect(button).toBeInTheDocument(); // check if button is in the document
  expect(counter).toBeInTheDocument(); // check if counter is in the document
  expect(counter).toHaveTextContent("0"); // check if counter is 0
  _react.fireEvent.click(button); // click the button
  expect(counter).toHaveTextContent("1"); // check if counter is 1
});
describe("Form", function () {
  it("should render the component", function () {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App["default"], {})); // render the component
    var form = _react.screen.getByTestId("form"); // get the form
    expect(form).toBeInTheDocument(); // check if form is in the document
  });
});