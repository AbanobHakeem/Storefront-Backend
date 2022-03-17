"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var User_1 = require("./models/User");
var app = (0, express_1.default)();
var port = 3000;
app.get('/api/create', function (req, res) {
    var userstore = new User_1.UserStore;
    var user = { fullname: "abanob", email: "Abanoba@mirage.com" };
    userstore.create(user);
});
app.get('/api/list', function (req, res) {
    res.send('Hello, world!');
});
app.get('**', function (req, res) {
    res.send("this is notfounded 404 At ".concat(req.originalUrl));
});
app.listen(port, function () {
    console.log("server started at localhost:".concat(port));
});
