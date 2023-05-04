import Image from "next/image";
import Nav from "../components/Nav";
import PostList from "../components/PostList";
import { Open_Sans } from "next/font/google";
import axios from "axios";
import useSWR, { SWRConfig } from "swr";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-opensans",
});

export default function Home({ articles }) {
  return (
    <>
      <Nav />
      <PostList articles={articles} />
    </>
  );
}

export async function getServerSideProps() {
  const articles = await axios
    .get("https://hsi-sandbox.vercel.app/api/articles")
    .then((res) => res.data);

  return {
    props: {
      articles,
    },
  };
}
