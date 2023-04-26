import "@/styles/globals.css";

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import { Plus_Jakarta_Sans, Tourney } from "next/font/google";

import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import React from "react";
import { useRouter } from "next/router";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

const RedirectToLandingPage = () => {
  const router = useRouter();

  router.replace("/landing");

  return null;
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const publicPages = ["landing", "signin", "signup"];

  const publicPagePaths = publicPages.map((p) => `/${p}`);

  const Page = () => (
    <div className={`${font.className} min-h-screen flex flex-col`}>
      <Navbar />
      <main className="flex flex-1 w-full max-w-screen-lg min-h-full px-8 mx-auto text-neutral-900">
        <Component {...pageProps} />
      </main>
    </div>
  );

  return (
    <ClerkProvider {...pageProps}>
      {publicPagePaths.includes(router.pathname) ? (
        <Page />
      ) : (
        <>
          <SignedIn>
            <Page />
          </SignedIn>
          <SignedOut>
            <RedirectToLandingPage />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}
