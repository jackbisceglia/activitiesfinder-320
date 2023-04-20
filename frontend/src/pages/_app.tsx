import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <div className={`${font.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="w-full max-w-screen-lg px-8 mx-auto text-neutral-900">
          <Component {...pageProps} />
        </main>
      </div>
    </ClerkProvider>
  );
}
