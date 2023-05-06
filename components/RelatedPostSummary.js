import Image from "next/image";

const RelatedPostSummary = (props) => {
  const { article } = props;
  return (
    <div className="bg-white space-y-6 pb-12">
      <h2 className="font-bold text-2xl">Related Post List</h2>
      <div className="grid grid-cols-[15%_85%] gap-x-4 md:gap-x-6">
        <div className="cols-start-1 rounded-lg overflow-hidden">
          <Image
            src={article.thumbnail}
            alt={article.title}
            width={600}
            height={400}
            className="object-cover object-right h-full"
          />
        </div>
        <div className="cols-start-2 flex flex-col gap-y-2">
          <h3 className="font-bold text-4xl text-gray leading-normal">
            {article.title}
          </h3>
          <p className="leading-relaxed font-semibold text-lg">
            {article.summary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelatedPostSummary;
