import { SignedIn, SignedOut, useSignIn } from "@clerk/nextjs";

import Head from "next/head";
import Link from "next/link";
import RedirectToHome from "@/components/RedirectToHome";
import { useRouter } from "next/router";

const metadata = {
  title: "Activities Finder: Welcome",
  description: "Welcome to Activies Finder. Start your search now!",
};

export default function LandingPage() {
  const { isLoaded, signIn } = useSignIn();
  const router = useRouter();

  const signInAsDev = async () => {
    const email = process.env.NEXT_PUBLIC_DEV_EMAIL;
    const pass = process.env.NEXT_PUBLIC_DEV_PASS;

    if (!signIn || !email || !pass) return;

    const response = await signIn
      .create({
        identifier: email,
        password: pass,
      })
      .then((result) => {
        if (result.status === "complete") {
          console.log(result);
          router.reload();
          // setActive({ session: result.createdSessionId });
        } else {
          console.log(result);
        }
      })
      .catch((err) => console.error("error", err.errors[0].longMessage));
  };

  console.log(process.env.NEXT_PUBLIC_TESTING === "ShowDevTools");
  console.log(process.env.NEXT_PUBLIC_TESTING);

  return (
    <>
      <SignedIn>
        <RedirectToHome />
      </SignedIn>
      <SignedOut>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </Head>

        <div className="flex flex-col items-center justify-center flex-1 w-full gap-4 pb-20 mx-auto text-center">
          {process.env.NEXT_PUBLIC_TESTING === "ShowDevTools" && (
            <button
              onClick={signInAsDev}
              className="px-6 py-2 text-xs font-medium text-white uppercase rounded-md bg-gradient-to-tr from-indigo-500 to-sky-500"
            >
              Dev Sign In
            </button>
          )}
          <h1 className="py-2 text-6xl font-extrabold text-transparent transition-all duration-700 hover:scale-[101%] hover:tracking-wide bg-gradient-to-tr from-violet-500 to-sky-600 bg-clip-text">
            <span className="bg-gradient-to-tr from-neutral-900 to-neutral-600 bg-clip-text">
              Activities
            </span>
            Finder
          </h1>
          <p className="max-w-2xl text-lg font-light text-neutral-700">
            The best way to discover activities in and around the UMass area.
            Search events, filter by preferences, and save to your wishlist to
            attend later!
          </p>
          <div className="flex gap-6 py-2">
            <Link
              href="/signin"
              className="px-8 py-2 transition-all duration-200 border rounded-md border-neutral-900/75 hover:bg-gray-400/30 text-neutral-900"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 transition-all duration-500 border rounded-md hover:text-white bg-gradient-to-tr from-violet-500 to-sky-500 text-neutral-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
