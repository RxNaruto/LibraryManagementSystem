"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLoginTypes = exports.adminSignupTypes = void 0;
const zod_1 = require("zod");
exports.adminSignupTypes = zod_1.z.object({
    adminId: zod_1.z.number(),
    password: zod_1.z.string(),
    name: zod_1.z.string()
});
exports.adminLoginTypes = zod_1.z.object({
    adminId: zod_1.z.number(),
    password: zod_1.z.string(),
});
