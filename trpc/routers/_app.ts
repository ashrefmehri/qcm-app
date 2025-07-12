import { profileRouter } from "@/modules/user-profile/server/procedure";
import { createTRPCRouter } from "../init";



export const appRouter = createTRPCRouter({
  profile: profileRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
