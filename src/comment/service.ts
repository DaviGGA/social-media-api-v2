import { Comment } from "@prisma/client";
import prisma from "../db/prisma";

export async function createComment({text, postId, userId}: Comment) {
    const comment = prisma.comment.create({
        data: {text, postId, userId}
    })

    return comment
}

export async function getCommentsByPostId(postId: number) {
    const comments = prisma.comment.findMany({
        where: {postId: postId},
        select: {
            id: true,
            text: true,
            user: {
                select: {
                    profile: true
                }
            }
        }
    })
    return comments;
}