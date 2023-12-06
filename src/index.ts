import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler";
import 'express-async-errors';
import authenticate from "./middlewares/authenticate";
import userRouter from "./user/router";
import profileRouter from "./profile/router";

const PORT = 3002;

const app: express.Application = express();

app.use(cors())
app.use(express.json());
app.use('/profile-picture', express.static('profile-pictures'));

app.use('/user', userRouter);
app.use('/profile', profileRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server online on port ${PORT}`)
})
