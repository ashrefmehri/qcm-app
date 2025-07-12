import { auth } from "@/lib/auth";
import { SignInForm } from "@/modules/auth/ui/sign-in-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignInPage = async () => {

  const session = await auth.api.getSession({
        headers: await headers(),
      });
    
      if (!!session) {
        redirect("/dashboard");
      }

  
  return <SignInForm />;
};

export default SignInPage;
