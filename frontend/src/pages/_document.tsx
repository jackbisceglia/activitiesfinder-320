import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="w-full min-h-screen p-0 m-0 bg-gradient-to-r from-gray-100 to-gray-300 ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
