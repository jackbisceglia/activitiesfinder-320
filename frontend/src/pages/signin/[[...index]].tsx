import { SignIn, SignedIn, SignedOut, useSignIn } from "@clerk/nextjs";

import RedirectToHome from "@/components/RedirectToHome";
import { useRouter } from "next/router";

export default function SignInPage() {
  //
  return (
    <>
      {/* <SignedIn>
        <RedirectToHome />
      </SignedIn>
      <SignedOut> */}
      <div className="flex flex-col items-center justify-center gap-8 mx-auto mb-12">
        <div className="flex items-center justify-center mx-auto mb-12">
          <SignIn
            path="/signin"
            routing="path"
            signUpUrl="/signup"
            appearance={{
              variables: {
                colorPrimary: "#1f1f1f",
              },
              elements: {
                formButtonPrimary:
                  "bg-gradient-to-tr from-violet-500 to-sky-500",
                footerAction__signIn:
                  "bg-gradient-to-tr from-violet-500 to-sky-500 bg-clip-text",
              },
            }}
          />
        </div>
      </div>
      {/* </SignedOut> */}
    </>
  );
}
