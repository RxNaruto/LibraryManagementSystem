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
const recordsRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
recordsRouter.post("/addrecord", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 7);
    try {
        const newRecord = yield prisma.records.create({
            data: {
                userId: body.userId,
                bookId: body.bookId,
                startDate: currentDate,
                endDate: endDate
            }
        });
        if (newRecord) {
            res.status(200).json({
                message: "Book added",
                id: newRecord.id
            });
        }
        else {
            res.status(404).json({
                message: "service not available"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "internal server error"
        });
    }
}));
recordsRouter.get("/log/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    try {
        const log = yield prisma.records.findFirst({
            where: {
                bookId: Number(bookId)
            },
            select: {
                user: {
                    select: {
                        name: true
                    }
                },
                book: {
                    select: {
                        name: true
                    }
                },
                startDate: true,
                endDate: true
            }
        });
        if (log) {
            res.status(200).json({
                record: log
            });
        }
        else {
            res.status(400).json({
                message: "no log found"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server error"
        });
    }
}));
exports.default = recordsRouter;
