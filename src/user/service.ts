import prisma from "../db/prisma";
import type { User } from '@prisma/client'


function createUser({username, password}: User): Promise<User> {
    let newUser = prisma.user.create({
        data: {username, password}
    })

    return newUser;
}

const service = {
    createUser
}

export default service;