import { useContext, useEffect, useState } from "react";
import { queryClient } from "../../react-query/queryClient";
import PostsList from "../PostsList/PostsList";
import { fetchLikedPosts, useFetchPosts } from "../Home/hooks/useFetchPosts";
import { POSTS_PER_PAGE } from "../../constants/constants";
import AuthContext from "../../services/AuthContexts";
import Pagination from "../common/Pagination/Pagination";
import Title from "../common/Title/Title";
import usePageStore from "../../stores/paginationStore";
import PersoButton from "../common/PersoButton/PersoButton";
import { useUnlikeAll } from "../Home/hooks/usePosts";
import PersoModal from "../common/PersoModal/PersoModal";
import NoPosts from "../common/NoPosts/NoPosts";

const MyPosts = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const authCtx = useContext(AuthContext);
  const currentUser = authCtx?.currentUser.uid;

  // Pagination state for liked posts
  const { actualLikedPostsPage, setLikedPostsPage } = usePageStore();
  // Fetch liked posts with a custom react query hook
  const { data, isLoading: isLoadingPosts } = useFetchPosts(
    actualLikedPostsPage,
    currentUser,
    "likedPosts"
  );
  // Mutation hook for unliking all posts at once
  const { mutate } = useUnlikeAll();

  // Calculate total pages
  const totalPages: number = Math.ceil((data.totalPosts ?? 0) / POSTS_PER_PAGE);

  /**
   * Prefetch the next page of posts
   * `actualLikedPostsPage` or `totalPages` changes
   */
  useEffect(() => {
    if (actualLikedPostsPage < totalPages) {
      const nextPage = actualLikedPostsPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["likedPosts", nextPage],
        queryFn: () => fetchLikedPosts(nextPage, authCtx.currentUser?.uid),
      });
    }
  }, [actualLikedPostsPage, totalPages, queryClient]);

  // unlike all posts in once
  function unlikeAllPostsHandler() {
    mutate(currentUser); // Call the mutate hook
  }

  if (!isLoadingPosts && data.posts.length === 0) {
    return <NoPosts />;
  }
  return (
    <div className="flex flex-col relative">
      <div className="flex justify-between mt-6 mb-8 group">
        <Title>Posts</Title>
        <PersoButton plain={true} onClickHandler={() => setIsModalOpen(true)}>
          unlike all
        </PersoButton>
      </div>
      <PostsList posts={data.posts} loading={isLoadingPosts} />
      <Pagination
        totalPages={totalPages}
        onChange={setLikedPostsPage}
        activePage={actualLikedPostsPage}
        inactive={isLoadingPosts}
      />
      <PersoModal
        title="Unlike all Posts at once"
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={unlikeAllPostsHandler}
      >
        <div>
          <p>Are you shure you want to unlike all the posts at once?</p>
          <p>This Step can not be undone!</p>
        </div>
      </PersoModal>
    </div>
  );
};

export default MyPosts;
