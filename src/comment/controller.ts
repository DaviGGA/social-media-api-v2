import { Request, Response, NextFunction } from "express";
import { Comment } from "@prisma/client";
import * as service from './service';

export async function createComment(req: Request, res: Response) {
    let { text, postId } = req.body;
    let userId = req.user?.id as number;
    
    const comment = await service.createComment({text, postId, userId} as Comment);
    res.status(201).send(comment);
}

export async function getPostComments(req: Request, res: Response) {
    let {postId} = req.body;

    const comments = await service.getCommentsByPostId(postId);

    res.status(200).send(comments);
}