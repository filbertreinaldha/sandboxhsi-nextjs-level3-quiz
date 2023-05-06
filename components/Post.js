import Image from "next/image";
import Link from "next/link";

const Post = (props) => {
  const { article, mini = false, className = "" } = props;
  const { id, author, category, thumbnail, slug, title, summary } = article;

  return (
    <div
      key={id}
      className={`mb-4 sm:mb-8 lg:mb-16 flex flex-col gap-y-4 ${className}`}
    >
      <Image
        src={thumbnail}
        alt={title}
        width={1000}
        height={667}
        className="w-full h-auto object-cover rounded-lg aspect-[3/2]"
      />
      <div className="uppercase">
        <span className="text-lightgray">By</span>{" "}
        {[author.firstName, author.middleName, author.lastName].join(" ")}{" "}
        <span className="text-lightgray">in</span> {category.name}
      </div>
      <Link href={`/${slug}`}>
        <h1
          className={`${
            mini ? "text-3xl" : "text-5xl"
          } font-semibold text-cabin leading-tight`}
        >
          {title}
        </h1>
      </Link>
      <h1
        className={`${mini ? "block" : "hidden"} mb-4 leading-8 text-lightgray`}
      >
        {summary}
      </h1>
    </div>
  );
};

export default Post;
