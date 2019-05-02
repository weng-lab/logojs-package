"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.u = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _path = "M 0 0 L 0 60 C 0 111 100 111 100 60\n         L 100 0 L 75 0 L 75 60\n         C 80 90 20 90 25 60 L 25 0 L 0 0";

var u = exports.u = function u(_ref) {
  var fill = _ref.fill;
  return _react2.default.createElement(
    "g",
    null,
    _react2.default.createElement("path", { fill: fill, d: _path }),
    _react2.default.createElement("rect", { fill: fill, x: "75", y: "0", height: "100", width: "25" })
  );
};