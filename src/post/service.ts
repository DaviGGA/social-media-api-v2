import { Post } from "@prisma/client";
import prisma from "../db/prisma";

export async function createPost({description, image, userId}: Post) {
    const post = prisma.post.create({
        data: {description, image, userId}
    })

    return post;
}

export async function getPostsFeed() {
    const posts = prisma.post.findMany({
       select: {
        description: true,
        image: true,
        user: {         
            select: {
                password: false,
                username: false,
                profile: true
            }
        }
       }

    })

    return posts;
}