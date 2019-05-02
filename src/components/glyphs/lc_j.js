"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.j = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var j = exports.j = function j(_ref) {
  var fill = _ref.fill;
  return _react2.default.createElement(
    "g",
    null,
    _react2.default.createElement("path", { fill: fill, d: "M 0 60 C 0 115 100 115 100 60 L 100 20 L 80 20 L 80 60 C 80 90 20 90 25 60" }),
    _react2.default.createElement("rect", { x: "80", width: "20", height: "15", fill: fill })
  );
};