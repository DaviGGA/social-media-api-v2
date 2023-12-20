import { Follow } from "@prisma/client";
import prisma from "../db/prisma";

export async function createFollow({followingId, followedId}: Follow) {
    const follow = prisma.follow.create({
        data: {
            followedId,
            followingId
        }
    })

    return follow
}

export async function findFollow({followingId, followedId}: Follow) {
    const follow = prisma.follow.findFirst({
        where:{
            followedId,
            followingId
        }
    })

    return follow;
}

export async function deleteFollow(id: number) {
    const follow = prisma.follow.delete({
        where: {
            id
        }
    })

    return follow
}

export async function getUserFollowersCount(userId: number) {
    const follows = prisma.follow.count({
        where: {
            followedId: userId,
        }
    })

    return follows;
}