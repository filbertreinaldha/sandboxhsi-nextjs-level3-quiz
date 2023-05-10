import Nav from "../components/Nav";
import PostList from "../components/PostList";
import { Open_Sans } from "next/font/google";
import axios from "axios";
import { useRouter } from "next/router";
import { URL_API } from "@/components/URL";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import Head from "next/head";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-opensans",
});

const fetcher = async ({ url, params = null }) => {
  return await axios.get(url, { params }).then((res) => res.data);
};

export default function Home({ initialArticles }) {
  const router = useRouter();
  const sort = router.query?.sort || "new";
  const { data, size, setSize, isValidating } = useSWRInfinite((index) => {
    return { url: URL_API, params: { page: index + 1, sort: sort } };
  }, fetcher);
  const meta = data?.at(size - 1)?.meta || initialArticles.meta;
  const articles = data?.map((d) => d.data).flat() || initialArticles.data;

  return (
    <>
      <Head>
        <title>Home - Sandbox HSI Level 3</title>
      </Head>
      <Nav
        sort={sort}
        changeSort={(sort) => {
          router.push("?sort=" + sort, undefined, { shallow: true });
          setSize(1);
        }}
      />
      {data && (
        <PostList
          articles={articles}
          fetchMore={() => {
            if (size < meta?.pagination.totalPages) setSize(size + 1);
          }}
          noMore={meta?.pagination.page == meta?.pagination.totalPages}
          isLoading={isValidating}
        />
      )}
    </>
  );
}

export async function getServerSideProps(props) {
  const params = props.query || {};
  const initialArticles = await fetcher({ url: URL_API, params: params });

  return {
    props: {
      initialArticles,
    },
  };
}
