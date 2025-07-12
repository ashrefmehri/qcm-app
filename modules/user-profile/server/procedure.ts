import { db } from "@/db";
import { profile } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { profileSchema } from "../schemas";
import { eq } from "drizzle-orm";

export const profileRouter = createTRPCRouter({

   updateProfile: protectedProcedure
    .input(profileSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth.user.id;

      const [updated] = await db
        .update(profile)
        .set({
          ...input,
        })
        .where(eq(profile.userId, userId))
        .returning();

      return updated;
    }),


  getProfile: protectedProcedure
  .query(async ({ ctx }) => {
    const [userProfile] = await db
      .select()
      .from(profile)
      .where(eq(profile.userId, ctx.auth.user.id));
    
    return userProfile || null;;
  }),


  create: protectedProcedure
    .input(profileSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth.user.id;
      const name = ctx.auth.user.name

      const profileData = {
        userId,
        name,
        role: input.role || "student",
        school: input.school,
        section: input.section,
        isCompleted: false, // ✅ Mark as completed upon creation
        xp: 0,
      };

      const [createdProfile] = await db
        .insert(profile)
        .values(profileData)
        .returning();

      return createdProfile;
    }),
});
