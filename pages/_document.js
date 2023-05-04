import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-bggray [&>*>*]:px-4 [&>*>*]:md:px-28 [&>*>*]:lg:px-64">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
