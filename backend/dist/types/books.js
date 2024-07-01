"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBookTypes = void 0;
const zod_1 = __importDefault(require("zod"));
exports.addBookTypes = zod_1.default.object({
    name: zod_1.default.string(),
    authorName: zod_1.default.string()
});
