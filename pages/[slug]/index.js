import Nav from "@/components/Nav";
import PostDetail from "@/components/PostDetail";
import RelatedSection from "@/components/RelatedSection";
import axios from "axios";
import useSWR from "swr";
import { URL_API } from "@/components/URL";
import Head from "next/head";

const fetcher = async (params) => {
  const related = await axios
    .get(URL_API, {
      params: {
        categoryId: params.categoryId,
        excludedArticleId: params.exclude,
        perPage: 2,
      },
    })
    .then((res) => res.data);

  return related.data;
};

const Slug = (props) => {
  const { article } = props;
  const { data, isLoading } = useSWR(
    {
      categoryId: article.data.category.id,
      exclude: article.data.id,
    },
    fetcher
  );

  return (
    <>
      <Head>
        <title>{article.data.title} - Sandbox HSI Level 3</title>
      </Head>
      <Nav hideButtons white />
      <PostDetail article={article.data} />
      {data && !isLoading && (
        <RelatedSection slug={article.data.slug} articles={data} />
      )}
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: "how-to-use-google-adwords-for-your-business-beginners-guide",
        },
      },
      {
        params: {
          slug: "website-downtime-applicable-tips-on-how-to-prevent-it",
        },
      },
      {
        params: {
          slug: "how-to-fix-error-404-not-found-on-your-wordpress-site",
        },
      },
      {
        params: {
          slug: "how-to-migrate-from-wix-to-wordpress-complete-guide",
        },
      },
    ],
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
      article: data,
    },
  };
};

export default Slug;
