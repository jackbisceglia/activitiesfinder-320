import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center mx-auto mb-12">
      <SignUp />
    </div>
  );
}
