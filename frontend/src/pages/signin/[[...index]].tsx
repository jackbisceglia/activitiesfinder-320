import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
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
            formButtonPrimary: "bg-gradient-to-tr from-violet-500 to-sky-500",
            footerAction__signIn:
              "bg-gradient-to-tr from-violet-500 to-sky-500 bg-clip-text",
          },
        }}
      />
    </div>
  );
}
