"use server"
import prisma from "../../libs/prisma";
export async function createRegion (formData: FormData) {
    const region = formData.get("region") as string
    const isStateExit = await prisma.region.findFirst({
        where: {
            name: region
        }
    })
    // Check if state already exist in the database
    if (isStateExit) {
        return false
    }
    // if 
    await prisma.region.create({
        data : { name : region}
    })
    return true;
}