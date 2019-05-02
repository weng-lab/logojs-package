"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var i = exports.i = function i(_ref) {
  var fill = _ref.fill;
  return _react2.default.createElement(
    "g",
    null,
    _react2.default.createElement("rect", { x: "40", y: "20", width: "20", height: "80", fill: fill }),
    _react2.default.createElement("rect", { x: "40", y: "0", width: "20", height: "15", fill: fill })
  );
};