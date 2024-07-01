"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const books_1 = __importDefault(require("./routes/books"));
const records_1 = __importDefault(require("./routes/records"));
const admin_1 = __importDefault(require("./routes/admin"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/books", books_1.default);
app.use("/api/v1/rec", records_1.default);
app.use("/api/v1/admin", admin_1.default);
app.listen(3000);
