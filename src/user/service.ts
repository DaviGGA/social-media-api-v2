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
        where: {username}
    })

    return user;
}




