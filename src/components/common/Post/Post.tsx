import { Heart } from "lucide-react";
import { FC } from "react";
import { PostP } from "../../../types/componentPropsT";

const Post: FC<PostP> = ({ post, likePost }) => {
  return (
    <div
      className={`flex flex-col gap-3 p-4 cursor-default ${
        post.likedByUser ? "bg-violet-950" : "bg-slate-800"
      }  rounded-2xl hover:scale-102 duration-200 ease-in-out`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="bg-slate-400 w-10 h-10 rounded-full animate-pulse" />
          <p className="font-semibold">username {post.userId}</p>
        </div>
        <button
          className={`flex gap-2 cursor-pointer ${
            post.likedByUser ? "text-rose-500" : "text-white"
          } hover:text-rose-500 hover:scale-120 duration-300 ease-in-out hover:font-semibold p-2 relative`}
          onClick={likePost}
        >
          <Heart size={24} />
          <Heart size={24} className="hover:animate-ping absolute" />
        </button>
      </div>
      <div className="flex flex-col gap-3  rounded-2xl">
        <h3
          className={`font-semibold text-lg p-4 ${
            post.likedByUser ? "bg-purple-800" : "bg-slate-900"
          } rounded-2xl`}
        >
          {post.title}
        </h3>
        <p
          className={`p-4 ${
            post.likedByUser ? "bg-purple-800" : "bg-slate-900"
          } text-md rounded-2xl`}
        >
          {post.body}
        </p>
      </div>
    </div>
  );
};

export default Post;
