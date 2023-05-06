import Image from "next/image";
import Link from "next/link";

const RelatedPost = (props) => {
  const { article, index } = props;
  const { title, summary, slug, thumbnail } = article;
  return (
    <div className="my-8" key={index}>
      <div className="grid grid-cols-2 bg-white rounded-lg shadow overflow-hidden">
        <div className="cols-start-1 p-8">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-2xl">{`${index < 9 ? "0" : ""}${
              index + 1
            }`}</h2>
            <Link href={`/${slug}`}>
              <h2 className="text-3xl font-semibold text-cabin leading-normal">
                {title}
              </h2>
            </Link>
            <p className="text-lightgray leading-loose">{summary}</p>
          </div>
        </div>
        <div className="cols-start-2">
          <Image
            src={thumbnail}
            alt={title}
            width={1000}
            height={667}
            className="object-cover h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RelatedPost;
