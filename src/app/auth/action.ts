"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface Form {
  username: string;
  password: string;
}
export async function login({ username, password }: Form) {
  const auth_username = process.env.ADMIN_USERNAME;
  const auth_password = process.env.ADMIN_PASSWORD;
  if (username === auth_username && password === auth_password) {
    const key = process.env.JWT_SECRET as string;
    const token = jwt.sign({ username }, key, {
      expiresIn: "4h",
    });
    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      path: "/",
    };
    (await cookies()).set("admin-token", token, cookieOptions);
    return true;
  }
  return false;
}
