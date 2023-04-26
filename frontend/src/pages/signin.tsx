import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center mx-auto mb-12">
      <SignIn />
    </div>
  );
}
