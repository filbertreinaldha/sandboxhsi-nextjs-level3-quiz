import Post from "./Post";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import { URL_API } from "@/constants/URL";

const fetcher = async (params) => {
  // const { url, ...fetchParams } = params;
  const result = await axios.get(URL_API, params).then((res) => res.data);
  console.log(result);
  return result;
};

const RelatedSection = ({ article }) => {
  const { data, isValidating } = useSWR(
    {
      // url: URL_API,
      params: {
        categoryId: article.category.id,
        excludedArticleId: article.id,
        perPage: 2,
      },
    },
    fetcher
  );
  const meta = data?.meta;
  const related = data?.data;

  if (!isValidating && related.length > 0) {
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
