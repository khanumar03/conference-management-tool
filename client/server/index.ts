import { userRouter } from "./routes/user";
import { publicProcedure, router } from "./trpc";


export const appRouter = router({
    hello: publicProcedure.query(async () => {
        return "hello world"
    }),
    user: userRouter
})

export type AppRouter = typeof appRouter