import { Request, Response, NextFunction } from "express";
import type { Profile, User } from '@prisma/client'
import * as service from './service'
import {compare, hash} from 'bcrypt';
import 'dotenv/config'
import jwt from "jsonwebtoken";
import { BadRequestError, NotFoundError } from "../errors/api-error";

type UserProfile = {
    id: number,
    username: string,
    password: string,
    profile?: Profile
}


export async function createUser(req: Request, res: Response): Promise<void> {
    let {
        username,
        password,
        confirmPassword
    } = req.body;

    if (password != confirmPassword) {
        throw new BadRequestError("As senhas não coincidem!");
    }

    let hasUser = await service.findUserByUsername(username);
    
    if (hasUser) {
        throw new BadRequestError("Já existe um usuário com esse nome!");
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

export async function login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    const user: UserProfile | null = await service.findUserByUsername(username);

    if (!user) {
        throw new NotFoundError("Usuário ou senha inválido.")
    }

    const verifyPassword: boolean = await compare(password, user.password);
    if (!verifyPassword) {
        throw new BadRequestError("Usuário ou senha inválido.")
    }

    const token = jwt.sign(
        {
            id: user.id, 
            username: user.username,
        }, 
        process.env.JWT_SECRET_KEY ?? '',
        {expiresIn: '1d'}
    )

    let {password: _, ...userLogin} = user;

    res.status(200).json({
        user: userLogin,
        token: token
    })

}

export async function getAuthenticatedUser(req: Request, res: Response): Promise<void> {
    let user = req.user;
    res.status(200).send(user);
}




