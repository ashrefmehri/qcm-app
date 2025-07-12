import { auth } from "@/lib/auth";
import { CompleteProfile } from "@/modules/user-profile/complete-profile";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const DashboardPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
      });
    
      if (!session) {
        redirect("/sign-in");
      }


  const queryClient = getQueryClient();

  const userProfile = await queryClient.fetchQuery(
    trpc.profile.getProfile.queryOptions()
  );

  

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading ...</div>}>
          <ErrorBoundary fallback={<div>Error ...</div>}>
            {userProfile.isCompleted === false ? (
              <CompleteProfile />
            ) : (
              <div className="">Dashbooarrd</div>
            )}
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default DashboardPage;
