import Nav from "../components/Nav";
import PostList from "../components/PostList";
import { Open_Sans } from "next/font/google";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { URL_API } from "@/components/URL";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-opensans",
});

const fetcher = async (params = null) => {
  return await axios.get(URL_API, { params }).then((res) => res.data);
};

export default function Home({ initialArticles, params }) {
  const [meta, setMeta] = useState(initialArticles.meta);
  const [data, setData] = useState(initialArticles.data);
  const [sort, setSort] = useState(params.sort || "new");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const getArticles = async (page, sort = "new", append = true) => {
    setLoading(true);
    const newArticles = await fetcher({ page: page, sort: sort });
    setMeta(newArticles.meta);

    if (append) setData((prevArticle) => prevArticle.concat(newArticles.data));
    else setData(newArticles.data);
    setLoading(false);
  };

  return (
    <>
      <Nav
        sort={sort}
        changeSort={(sort) => {
          setSort(sort);
          router.push("?sort=" + sort, undefined, { shallow: true });
          getArticles(1, sort, false);
        }}
      />
      <PostList
        articles={data}
        fetchMore={() => getArticles(meta.pagination.page + 1, sort)}
        noMore={meta.pagination.page == meta.pagination.totalPages}
        isLoading={isLoading}
      />
    </>
  );
}

export async function getServerSideProps(props) {
  const params = props.query || {};
  const initialArticles = await fetcher(params);

  return {
    props: {
      initialArticles,
      params,
    },
  };
}
