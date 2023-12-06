import { Profile } from "@prisma/client";
import prisma from "../db/prisma";

export async function createProfile({name, surname, picture ,userId}: Profile): Promise<Profile> {
    const profile = prisma.profile.create({
        data: {name,surname, picture, userId}
    })

    return profile;
}