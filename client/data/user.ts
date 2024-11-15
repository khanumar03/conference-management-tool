import { db } from "@/lib/db"


export const getUserByEmail = async (email: string) => {
    return await db.user.findFirst({where: { email }})
}

export const getUserById = async (id: string) => {
    return await db.user.findFirst({where: { id }})
}