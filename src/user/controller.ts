import { Request, Response, NextFunction } from "express";
import type { User } from '@prisma/client'
import * as service from './service'
import {hash} from 'bcrypt';
import { BadRequestError } from "../errors/api-error";


 export async function createUser(req: Request, res: Response): Promise<void> {
    let {
        username,
        password,
        confirmPassword
    } = req.body;

    if (password != confirmPassword) {
        throw new BadRequestError("As senhas não coincidem!");
    }

    const hashedPassword: string = await hash(password,10);

    const newUser: User = await service.createUser({
        username,
        password: hashedPassword
    } as User)

    res.status(201).send({
        message: "User created succesfuly!",
        user: {id: newUser.id, username: newUser.username}
    })
 }

