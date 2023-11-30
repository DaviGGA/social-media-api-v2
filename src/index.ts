import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import 'express-async-errors';
import userRouter from "./user/router";

const PORT = 3002;

const app: express.Application = express();
app.use(express.json());

app.use('/user', userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server online on port ${PORT}`)
})
