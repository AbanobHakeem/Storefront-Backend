"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyAuthToken = function (req, res, next) {
    try {
        var token = req.headers.authorization;
        if (!token)
            res.send("You are not auth to take this action");
        var decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
    }
};
exports.verifyAuthToken = verifyAuthToken;
