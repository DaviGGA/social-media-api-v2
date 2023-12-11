import { Post } from "@prisma/client";
import prisma from "../db/prisma";

export async function createPost({description, image, userId}: Post) {
    const post = prisma.post.create({
        data: {description, image, userId}
    })

    return post;
}

// export async function getPostsByUserId(userId: number) {
//     const posts = prisma.post.findMany({
//         where: {userId}
//     })

//     return posts;
// }

export async function getPostsFeed() {
    const posts = prisma.post.findMany({
       select: {
        id: true,
        description: true,
        image: true,
        likes: true,
        user: {         
            select: {
                password: false,
                username: false,
                profile: true,
            }
        }
       }

    })

    return posts;
}