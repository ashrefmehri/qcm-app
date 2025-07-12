import { auth } from "@/lib/auth";
import { SignUpForm } from "@/modules/auth/ui/sign-up-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignUpPage = async () => {

   const session = await auth.api.getSession({
          headers: await headers(),
        });
      
        if (!!session) {
          redirect("/dashboard");
        }


  return <SignUpForm />;
};

export default SignUpPage;
