import Post from "./Post";
import LoadMore from "./LoadMore";

const PostList = (props) => {
  const { articles, fetchMore, noMore, isLoading } = props;
  return (
    <div className="flex flex-col py-8 items-center">
      <div className="px-8">
        {articles.map((article) => (
          <Post key={article.id} article={article} />
        ))}
      </div>
      <LoadMore fetchMore={fetchMore} noMore={noMore} isLoading={isLoading} />
    </div>
  );
};

export default PostList;
