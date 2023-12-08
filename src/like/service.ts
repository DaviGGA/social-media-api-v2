import { Like } from "@prisma/client";
import prisma from "../db/prisma";

export async function createLike({userId, postId}: Like) {
    const like = prisma.like.create({
        data: {userId, postId}
    })

    return like
}

export async function findLikeByUserId(userId: number) {
    const like = prisma.like.findFirst({
        where: {userId}
    })

    return like;
}

export async function findLikeByUserPostId({userId, postId}: Like) {
    const like = prisma.like.findFirst({
        where: {userId, postId}
    })

    return like
}

export async function deleteLike(id: number) {
    const like = prisma.like.delete({
        where: {id}
    })

    return like;
}

