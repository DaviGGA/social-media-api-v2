import { Post } from "@prisma/client";
import prisma from "../db/prisma";

export async function createPost({description, image, userId}: Post) {
    const post = prisma.post.create({
        data: {description, image, userId}
    })

    return post;
}

export async function getPostsByUserId(userId: number) {
    const posts = prisma.post.findMany({
        where: {userId},
        orderBy: {
            createdAt: 'desc'
           }
    })

    return posts;
}

export async function getPostById(id: number) {
    const post = prisma.post.findUnique({
        where: {id:id},
        include: {
            user: {
                select: {
                    profile: true,
                }
            },
        }
    })

    return post
}

export async function getPostsFeed(userId: number) {
    const posts = prisma.post.findMany({
       select: {
        id: true,
        description: true,
        image: true,
        likes: true,
        user: {         
            select: {
                id: true,
                profile: true,
            }
        },
       },
       where: {
        OR: [
            {
                user: {
                    follows: {
                        some: {
                            followingId: userId
                        }
                    }
                },
            },
            {
                user: {
                    id: userId
                }
            }
        ]

       },
       orderBy: {
        createdAt: 'desc'
       }
    })

    return posts;
}