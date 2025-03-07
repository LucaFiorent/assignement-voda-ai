import { FC, useContext } from "react";
import { PostsListP } from "../../types/componentPropsT";
import Post from "../common/Post/Post";
import LoadingPost from "../common/LoadingComponents/LoadingPosts";
import { useLikePost } from "../Home/hooks/usePosts";
import AuthContext from "../../services/AuthContexts";
import { queryClient } from "../../react-query/queryClient";

const PostsList: FC<PostsListP> = ({ posts, loading }) => {
  const authCtx = useContext(AuthContext);

  // the mutate function to handle liking posts
  const { mutate } = useLikePost();

  // Handler function for liking a post
  async function likePostHandler(postId: string) {
    try {
      // Check if the user is authenticated by verifying the presence of a user ID
      if (!authCtx.currentUser?.uid) {
        throw new Error("user not authenticated");
      }

      // toggle the like on the post
      await mutate({
        postId: postId,
        currentUserId: authCtx.currentUser.uid,
      });

      // Invalidate the "posts" and "likedPosts" queries to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["likedPosts"] });
    } catch (error) {
      console.error("Login Failed", error);
    }
  }

  return (
    <div
      className={`grid grid-cols-1 ${
        loading ? "lg:grid-cols-2" : "md:grid-cols-2"
      } gap-5`}
    >
      {loading
        ? Array.from({ length: 10 }, (_, index) => index + 1).map((i) => (
            <div key={i} className="w-full">
              <LoadingPost />
            </div>
          ))
        : posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              likePost={() => likePostHandler(post.id)}
            />
          ))}
    </div>
  );
};

export default PostsList;
