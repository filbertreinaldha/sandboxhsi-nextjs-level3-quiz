import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-bggray [&>*>*]:px-4 [&>*>*]:sm:px-24 [&>*>*]:md:px-36 [&>*>*]:lg:px-52 [&>*>*]:xl:px-80">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
