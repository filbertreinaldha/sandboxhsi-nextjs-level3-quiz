import Image from "next/image";

const PostDetail = (props) => {
  const { article } = props;
  const { author, category, thumbnail, slug, title, summary, content } =
    article;

  return (
    <>
      <div className="bg-white space-y-6 pb-8">
        <h1 className="text-4xl leading-normal text-gray font-bold">{title}</h1>
        <p className="font-semibold leading-8">{summary}</p>
        <div className="uppercase">
          <span className="text-lightgray">By</span>{" "}
          {[author.firstName, author.middleName, author.lastName].join(" ")}{" "}
          <span className="text-lightgray">in</span> {category.name}
        </div>
      </div>
      <div className="mt-8 mb-20">
        <Image
          src={thumbnail}
          alt={title}
          width={1000}
          height={667}
          className="w-full h-auto object-cover rounded-lg aspect-[3/2]"
        />
        <p className="my-8 leading-8 text-gray">{content}</p>
      </div>
    </>
  );
};

export default PostDetail;
