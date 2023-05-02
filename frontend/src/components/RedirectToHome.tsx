import { useRouter } from "next/router";

export default function RedirectToHome() {
  const router = useRouter();

  router.push("/");

  return null;
}
