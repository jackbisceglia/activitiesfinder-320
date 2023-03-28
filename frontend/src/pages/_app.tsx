import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { Plus_Jakarta_Sans } from "next/font/google";

const Jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${Jakarta.className}`}>
      <Navbar />
      <main className="max-w-screen-lg mx-auto">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
