import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import booksRouter from "./routes/books";
import recordsRouter from "./routes/records";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/books",booksRouter);
app.use("/api/v1/rec",recordsRouter);

app.listen(3000);