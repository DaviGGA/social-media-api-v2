import { Request, Response, NextFunction } from "express";
import { Follow } from "@prisma/client";
import * as service from './service';
import { BadRequestError } from "../errors/api-error";

export async function follow(req: Request, res: Response) {
    let { followingId, followedId } = req.body;

    if (followedId == followingId) {
        throw new BadRequestError("Não é possível seguir a si mesmo.")
    }

    const follow: Follow | null = await service.findFollow({followedId,followingId} as Follow)

    if (follow) {
        await service.deleteFollow(follow.id);
        res.status(200).send({following: false})
        return
    }

    const newFollow = await service.createFollow({followedId,followingId} as Follow)

    res.status(201).send({newFollow, following: true})
}

export async function getUserFollowersCount(req: Request, res: Response) {
    let followedId = parseInt(req.params.id);

    const followCount = await service.getUserFollowersCount(followedId);

    res.status(200).send({count: followCount})
}

export async function checkFollow(req: Request, res: Response) {
    let {followingId, followedId} = req.body;

    const follow: Follow | null = await service.findFollow({followedId,followingId} as Follow);

    const following: boolean = follow ? true : false;

    res.status(200).send({following});
}
