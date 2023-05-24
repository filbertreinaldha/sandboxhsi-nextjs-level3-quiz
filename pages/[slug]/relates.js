import LoadMore from "@/components/LoadMore";
import Nav from "@/components/Nav";
import RelatedPost from "@/components/RelatedPost";
import RelatedPostSummary from "@/components/RelatedPostSummary";
import axios from "axios";
import { URL_API } from "@/constants/URL";
import Head from "next/head";
import useSWRInfinite from "swr/infinite";

const fetcher = async (params) => {
  const { url, ...fetchParams } = params;
  return await axios
    .get(url, { params: fetchParams })
    .then((res) => res.data)
    .catch((e) => e.response);
};

const Relates = (props) => {
  const { article, relatesParam, initRelates } = props;
  const { data, size, setSize, isValidating } = useSWRInfinite((index) => {
    return {
      page: index + 1,
      ...relatesParam,
    };
  }, fetcher);
  const meta = data?.at(size - 1)?.meta || initRelates.meta;
  const relates = data?.map((d) => d.data).flat() || initRelates.data;

  return (
    <>
      <Head>
        <title>Related Pages - Sandbox HSI Level 3</title>
      </Head>
      <Nav hideButtons white />
      <RelatedPostSummary article={article.data} />
      <div className="flex flex-col items-center pb-8">
        {relates.map((article, idx) => (
          <RelatedPost article={article} index={idx} key={article.id} />
        ))}

        <LoadMore
          fetchMore={() => {
            if (size < meta?.pagination.totalPages) setSize(size + 1);
          }}
          noMore={meta?.pagination.page == meta?.pagination.totalPages}
          isLoading={isValidating}
        />
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const article = await axios
    .get(`${URL_API}/${params.slug}`)
    .then((res) => res.data)
    .catch((e) => e.response);

  if (article?.status == "404") {
    return {
      notFound: true,
    };
  }

  const relatesParam = {
    url: URL_API,
    categoryId: article.data.category.id,
    excludedArticleId: article.data.id,
  };

  const relates = await fetcher(relatesParam);

  return {
    props: {
      article,
      relatesParam,
      initRelates: relates,
    },
  };
};

export default Relates;
