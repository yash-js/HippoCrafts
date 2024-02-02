import { PayloadRequest } from "payload/types";
import { ExpressContext } from "../server";
import { TRPCError, initTRPC } from "@trpc/server";
import { User } from "@/payload-types";

const t = initTRPC.context<ExpressContext>().create()
const middlerware = t.middleware
const isAuth = middlerware(async ({ ctx, next }) => {
    const req = ctx.req as PayloadRequest

    const { user } = req as { user: User | null }

    if (!user || !user.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })

    }
    return next({
        ctx: {
            user
        }
    })


})

export const router = t.router

export const publicProcedure = t.procedure

export const privateProcedure = t.procedure.use(isAuth)