import Post from "./Post";
import Link from "next/link";

const RelatedSection = (props) => {
  const { slug, articles } = props;

  if (articles.length > 0) {
    return (
      <div className="space-y-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-4xl font-semibold text-cabin">
            You might also like...
          </h2>
          <Link href={`${slug}/relates`}>
            <button className="text-lightgray">More</button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-8">
          {articles[0] && (
            <Post mini article={articles[0]} className="cols-start-1" />
          )}
          {articles[1] && (
            <Post mini article={articles[1]} className="cols-start-2" />
          )}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default RelatedSection;
