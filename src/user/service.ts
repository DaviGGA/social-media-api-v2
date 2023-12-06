import prisma from "../db/prisma";
import type { User } from '@prisma/client'


export async function createUser({username, password}: User): Promise<User> {
    let newUser = prisma.user.create({
        data: {username, password}
    })

    return newUser;
}

export async function findUserByUsername(username: string): Promise<User | null> {
    let user = prisma.user.findUnique({
        where: {username},
        include: {
            profile: true
        }
    })

    return user;
}

export async function findUserById(id: number): Promise<User | null> {
    let user = prisma.user.findUnique({
        where: {id},
        include: {
            profile: true
        }
    })

    return user;
}




