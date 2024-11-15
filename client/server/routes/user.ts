import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import bcrypt from "bcryptjs";
import { LoginSchema, registerSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const userRouter = router({
  register: publicProcedure.input(registerSchema).mutation(async (opts) => {
    const { email, password, first_name, last_name } = opts.input;

    const AlreadyExist = await getUserByEmail(email);
    if (AlreadyExist) {
      throw new TRPCError({
        message: "email already in used!",
        code: "CONFLICT",
      });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name: first_name + " " + last_name,
        email,
        password: hashPassword,
      },
    });

    return { success: "Successfully created" };
  }),
  login: publicProcedure.input(LoginSchema).mutation(async (opts) => {
    const { email, password } = opts.input;
    console.log(email, password);
    

    const user = await getUserByEmail(email);

    if (!user || !user.email || !user.password) {
      throw new TRPCError({
        message: "user does not exist!",
        code: "UNAUTHORIZED",
      });
      return;
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      return { success: "LoggedIn" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin": 
            throw new TRPCError({ message: "Invalid credentials!", code: "UNAUTHORIZED" });
          default:
            throw new TRPCError({ message: "something went wrong", code: "TIMEOUT" });
        }
      }
      else throw error;
    }
  }),
});
