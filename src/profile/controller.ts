import { Request, Response, NextFunction } from "express";
import { Follow, Profile } from "@prisma/client";
import * as service from './service';
import * as followService from '../follow/service';

export async function createProfile(req: Request, res: Response): Promise<void> {
    let {
        name,
        surname,   
    } = req.body;

    let profilePicture = req.file;
    let picture = profilePicture?.filename

    let userId = req.user?.id as number;
    
    const profile = await service.createProfile({name, surname, picture, userId} as Profile);

    res.status(201).send(profile);
}

export async function getProfileById(req: Request, res: Response): Promise<void>{
    let userId = req.user?.id as number;
    let id: number = parseInt(req.params.id);
    
    const profile: Profile | null = await service.getProfileById(id);
    
    res.status(200).send(profile);
}




