"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginTypes = exports.signupTypes = void 0;
const zod_1 = require("zod");
exports.signupTypes = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string(),
    name: zod_1.z.string()
});
exports.loginTypes = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
