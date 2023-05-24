import Nav from "@/components/Nav";
import PostDetail from "@/components/PostDetail";
import RelatedSection from "@/components/RelatedSection";
import axios from "axios";
import { URL_API } from "@/constants/URL";
import Head from "next/head";

const Slug = ({ article }) => {
  return (
    <>
      <Head>
        <title>{article.title} - Sandbox HSI Level 3</title>
      </Head>
      <Nav hideButtons white />
      <PostDetail article={article} />
      <RelatedSection article={article} />
    </>
  );
};

export async function getStaticPaths() {
  const data = await axios
    .get(URL_API)
    .then((res) => res.data)
    .catch((e) => e.response);

  return {
    paths: data.data.map((d) => ({
      params: {
        slug: d.slug,
      },
    })),
    fallback: "blocking",
  };
}
export const getStaticProps = async ({ params }) => {
  const data = await axios
    .get(`${URL_API}/${params.slug}`)
    .then((res) => res.data)
    .catch((e) => e.response);

  if (data.status == "404")
    return {
      notFound: true,
    };

  return {
    props: {
      article: data.data,
    },
  };
};

export default Slug;
