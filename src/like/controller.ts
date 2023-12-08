import { Request, Response, NextFunction } from "express";
import { Like } from "@prisma/client";
import * as service from './service';


export async function likePost(req: Request, res: Response) {
    let { postId } = req.body;
    
    let userId = req.user?.id as number;

    const like: Like | null = await service.findLikeByUserPostId({userId, postId} as Like);

    if (like) {
        await service.deleteLike(like.id);
        res.status(200).send({liked: false})
        return
    }

    const newLike = await service.createLike({userId, postId} as Like);

    res.status(201).send({newLike, liked: true});

}