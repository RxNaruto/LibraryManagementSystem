"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const books_1 = require("../types/books");
const booksRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
booksRouter.post("/addbook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success } = books_1.addBookTypes.safeParse(body);
    if (!success) {
        return res.status(403).json({
            message: "Incorrect inputs"
        });
    }
    try {
        const newBook = yield prisma.books.create({
            data: {
                name: body.name,
                authorName: body.authorName
            }
        });
        res.status(200).json({
            message: "Book added",
            id: newBook.id
        });
    }
    catch (error) {
        res.status(500).json({
            message: "internal server error"
        });
    }
}));
booksRouter.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const book = yield prisma.books.update({
            where: {
                id: Number(id)
            },
            data: {
                available: false
            }
        });
        if (book) {
            res.status(200).json({
                message: "Book deleted successfully"
            });
        }
        else {
            res.status(400).json({
                message: "error"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Internal server error"
        });
    }
}));
booksRouter.put("/restore/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const book = yield prisma.books.update({
            where: {
                id: Number(id)
            },
            data: {
                available: true
            }
        });
        if (book) {
            res.status(200).json({
                message: "Book added successfully"
            });
        }
        else {
            res.status(400).json({
                message: "error"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Internal server error"
        });
    }
}));
exports.default = booksRouter;
