import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/api-error";
import jwt from "jsonwebtoken";
import type { User } from '@prisma/client';
import * as userService from '../user/service';



type JWTPayload = {
    id: number,
    username: string
}

async function authenticate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;


    if (!authorization) {
        throw new UnauthorizedError("Token não existe")
    }

    const token = authorization.split(' ')[1];

    if (token == "null") {
        throw new UnauthorizedError("Token não existe")
    }


    let id: number;

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET_KEY ?? '') as JWTPayload;
        id = result.id
    } catch (error) {
        const errorString: string = String(error);
        const errorName: string =  errorString.split(':')[0]
        
        switch (errorName) {
            case "TokenExpiredError":
                throw new UnauthorizedError("Token expirou")
            default:
                throw new Error()    
        }
    
    }

    
    const user: User | null = await userService.findUserById(id);

    if (!user) {
        throw new UnauthorizedError("Token inválido")
    }

    const {password: _, ...loggedUser} = user
    req.user = loggedUser;

    next();
}

export default authenticate;