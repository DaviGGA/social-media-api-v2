import { Request, Response, NextFunction } from "express";
import type { User } from '@prisma/client'
import service from "./service";


 async function createUser(req: Request, res: Response): Promise<void> {
    let {
        username,
        password,
        confirmPassword
    } = req.body;

    if (password != confirmPassword) {
        
    }

 }

