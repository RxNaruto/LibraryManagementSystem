"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const userAuth = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(404).json({
            message: "You are not authorized"
        });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET2);
        next();
    }
    catch (error) {
        return res.status(404).json({
            message: "User not verified"
        });
    }
};
exports.userAuth = userAuth;
