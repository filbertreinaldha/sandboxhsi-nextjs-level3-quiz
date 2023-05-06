import LoadMore from "@/components/LoadMore";
import Nav from "@/components/Nav";
import RelatedPost from "@/components/RelatedPost";
import RelatedPostSummary from "@/components/RelatedPostSummary";
import axios from "axios";
import { useState } from "react";
import { URL_API } from "@/components/URL";

const fetcher = async (params = null) => {
  return await axios
    .get(URL_API, { params })
    .then((res) => res.data)
    .catch((e) => e.response);
};

const Relates = (props) => {
  const { article, relates } = props;
  const [meta, setMeta] = useState(relates.meta);
  const [data, setData] = useState(relates.data);
  const [isLoading, setLoading] = useState(false);

  const getRelates = async (params) => {
    setLoading(true);
    const newRelates = await fetcher(params);
    setMeta(newRelates.meta);
    setData((prev) => prev.concat(newRelates.data));
    setLoading(false);
  };

  return (
    <>
      <Nav hideButtons white />
      <RelatedPostSummary article={article} />
      <div className="flex flex-col items-center pb-8">
        {data.map((article, idx) => (
          <RelatedPost article={article} index={idx} />
        ))}

        <LoadMore
          fetchMore={() =>
            getRelates({
              page: meta.pagination.page + 1,
              categoryId: meta.categoryId,
              excludedArticleId: meta.excludedArticleId,
            })
          }
          noMore={meta.pagination.page == meta.pagination.totalPages}
          isLoading={isLoading}
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

  if (article.status == "404") {
    return {
      notFound: true,
    };
  }

  const relates = await fetcher({
    categoryId: article.data.category.id,
    excludedArticleId: article.data.id,
  });

  return {
    props: {
      article: article.data,
      relates: relates,
    },
  };
};

export default Relates;
