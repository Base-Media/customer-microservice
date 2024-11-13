"use strict";

var _express = _interopRequireDefault(require("express"));
var _database = _interopRequireDefault(require("./config/database.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** @format */

var app = (0, _express["default"])();
var port = 3000;
app.get('/', function (req, res) {
  res.send('Hello, world!');
});
(0, _database["default"])();
app.listen(port, function () {
  console.log("Server is running on http://localhost:".concat(port));
});