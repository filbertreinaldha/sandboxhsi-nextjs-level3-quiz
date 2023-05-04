import useSWR from "swr";
import axios from "axios";

const PostList = (props) => {
  const { articles } = props;
  return (
    <div>
      <div>PostList</div>
      <div>
        {articles.data.map((a) => (
          <p>{a.summary}</p>
        ))}
      </div>
    </div>
  );
};

export default PostList;
