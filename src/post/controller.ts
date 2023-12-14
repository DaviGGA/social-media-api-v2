import { Request, Response, NextFunction } from "express";
import { Post } from "@prisma/client";
import { Like } from "@prisma/client";
import * as service from './service';
import * as likeService from '../like/service';


export async function createPost(req: Request, res: Response) {
    let {description} = req.body;

    let userId = req.user?.id as number;
    
    let postImage = req.file;
    let image = postImage?.filename;

    const post = await service.createPost({description, image, userId} as Post);
    res.status(201).send(post);
}

export async function getPostsByUserId(req: Request, res: Response) {
    let userId = parseInt(req.params.userId);
    
    const posts: Post[] = await service.getPostsByUserId(userId);
    
    res.status(200).send(posts);
}

export async function userFeed(req: Request, res: Response) {
    let userId = req.user?.id as number;

    const result = await service.getPostsFeed();

    const posts = result.map((post) => {
        let profile = post.user.profile;
        let mappedPost = {
            id: post.id,
            description: post.description,
            image: post.image,
            likes: post.likes,
            userLiked: false,
            profile
        }

        return mappedPost;
    })

    for (let post of posts) {
        const like: Like | null = await likeService.findLikeByUserPostId({userId, postId: post.id} as Like)
        post.userLiked = like ? true : false
    }


    res.status(200).send(posts);
}

export async function getPostById(req: Request, res: Response): Promise<void> {
    let id = parseInt(req.params.id);

    const post = await service.getPostById(id);

    res.status(200).send(post);
}