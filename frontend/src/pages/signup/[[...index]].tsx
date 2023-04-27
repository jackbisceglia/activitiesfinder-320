import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center mx-auto mb-12">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#1f1f1f",
          },
          elements: {
            formButtonPrimary: "bg-gradient-to-tr from-violet-500 to-sky-500",
            footerAction__signUp:
              "bg-gradient-to-tr from-violet-500 to-sky-500 bg-clip-text",
          },
        }}
        path="/signup"
        signInUrl="/signin"
        routing="path"
      />
    </div>
  );
}
