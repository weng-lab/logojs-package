"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.p = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var p = exports.p = function p(_ref) {
    var fill = _ref.fill;
    return _react2.default.createElement(
        "g",
        null,
        _react2.default.createElement("path", { fill: fill, d: "M 20 100 L 0 100 L 0 0 L 20 0 L 20 20 C 10 -10 90 -10 100 30 L 100 40 C 90 90 10 90 20 60 L 20 60 L 20 100" }),
        _react2.default.createElement("path", { fill: "#ffffff", d: "M 79 40 C 80 5 20 5 20 35 C 20 70 80 70 79 35" })
    );
};