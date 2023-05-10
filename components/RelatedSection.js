import Post from "./Post";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import { URL_API } from "@/components/URL";

const fetcher = async ({ url, params }) => {
  return await axios
    .get(url, {
      params: {
        categoryId: params.categoryId,
        excludedArticleId: params.exclude,
        perPage: 1,
      },
    })
    .then((res) => res.data);
};

const RelatedSection = ({ article }) => {
  const { data, isLoading } = useSWR(
    {
      url: URL_API,
      params: {
        categoryId: article.category.id,
        exclude: article.id,
      },
    },
    fetcher
  );
  const meta = data?.meta;
  const related = data?.data;

  if (data && !isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-4xl font-semibold text-cabin">
            You might also like...
          </h2>
          {meta?.pagination.totalPages > 1 ? (
            <Link href={`${article.slug}/relates`}>
              <button className="text-lightgray">More</button>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div
          className={`grid gap-x-8 ${
            related[1]
              ? "grid-cols-2"
              : "grid-cols-[minmax(0,1fr)_50%_minmax(0,1fr)]"
          }`}
        >
          {related[0] && (
            <Post
              mini
              article={related[0]}
              className={`${related[1] ? "col-start-1" : "col-start-2"}`}
            />
          )}
          {related[1] && (
            <Post mini article={related[1]} className="col-start-2" />
          )}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default RelatedSection;
