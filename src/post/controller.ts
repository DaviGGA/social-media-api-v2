import { Request, Response, NextFunction } from "express";
import { Post } from "@prisma/client";
import * as service from './service';


export async function createPost(req: Request, res: Response) {
    let {description} = req.body;

    let userId = req.user?.id as number;
    
    let postImage = req.file;
    let image = postImage?.filename;

    const post = await service.createPost({description, image, userId} as Post);
    res.status(201).send(post);
}

export async function userFeed(req: Request, res: Response) {
    // let userId = req.user?.id as number;

    const result = await service.getPostsFeed();

    const posts = result.map(post => {
        let profile = post.user.profile;
        let mappedPost = {
            description: post.description,
            image: post.image,
            profile
        }

        return mappedPost;
    })

    res.status(200).send(posts);
}