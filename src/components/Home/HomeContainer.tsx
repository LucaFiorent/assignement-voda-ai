import { FormEvent, useContext, useEffect, useState } from "react";
import { POSTS_PER_PAGE } from "../../constants/constants";
import { fetchPosts, useFetchPosts } from "./hooks/useFetchPosts";
import Pagination from "../common/Pagination/Pagination";
import PostsList from "../PostsList/PostsList";
import Title from "../common/Title/Title";
import PersoButton from "../common/PersoButton/PersoButton";
import { PlusCircle } from "lucide-react";
import { queryClient } from "../../react-query/queryClient";
import AuthContext from "../../services/AuthContexts";
import usePageStore from "../../stores/paginationStore";
import AddPostModal from "../common/AddPostModal/AddPostModal";
import { useAddPost } from "./hooks/usePosts";
import { PostContentT, PostsFBT } from "../../types/types";
import NoPosts from "../common/NoPosts/NoPosts";

const HomeContainer = () => {
  const authCtx = useContext(AuthContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addPostFormData, setAddPostFormData] = useState<PostContentT>({
    title: "",
    body: "",
  });
  // get pagination state from store
  const { actualPostsPage, setPostsPage } = usePageStore();
  // get posts using a custom React query hook
  const { data, isLoading: isLoadingPosts } = useFetchPosts(
    actualPostsPage,
    authCtx.currentUser?.uid,
    "allPosts"
  );
  // react query costum hook to add a new post
  const { mutate } = useAddPost();
  const posts = data?.posts;
  // calc total number of pages for pagination
  const totalPages: number = Math.ceil(
    (data?.totalPosts ?? 0) / POSTS_PER_PAGE
  );

  /**
   * Prefetch the next page of posts
   * Runs whenever `actualPostsPage` or `totalPages` changes
   */
  useEffect(() => {
    if (actualPostsPage < totalPages) {
      const nextPage = actualPostsPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["posts", nextPage],
        queryFn: () => fetchPosts(nextPage, authCtx.currentUser?.uid),
      });
    }
  }, [actualPostsPage, totalPages, queryClient]);

  // Handles input changes in the "Add Post" form
  function handleChangeInputs(event: FormEvent<HTMLInputElement>) {
    setAddPostFormData({
      ...addPostFormData,
      [event.target.name]: event.target.value,
    });
  }

  // Handles form submission for adding a new post
  function handleAddNewPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formattedPostData: PostsFBT = {
      userId: authCtx.currentUser?.uid,
      ...addPostFormData,
    };
    // Trigger mutation to add a new post
    mutate(formattedPostData);
    setShowModal(false);
    setAddPostFormData({ title: "", body: "" });
  }

  if (!isLoadingPosts && data.posts.length === 0) {
    return <NoPosts />;
  }
  return (
    <main className="flex h-[85h] justify-center w-auto mx-auto relative">
      <div className="flex flex-col">
        <div className="flex justify-between mt-6 mb-8 group">
          <Title>Posts</Title>
          <PersoButton
            extraStyles="hover:scale-108 hover:text-purple-500 duration-200 ease-in-out"
            onClickHandler={() => setShowModal(true)}
            plain={true}
            isLoading={isLoadingPosts}
          >
            <PlusCircle size={22} /> Add Post
          </PersoButton>
        </div>
        <PostsList posts={posts} loading={isLoadingPosts} />
        <Pagination
          totalPages={totalPages}
          onChange={setPostsPage}
          activePage={actualPostsPage}
          inactive={isLoadingPosts}
        />
      </div>
      <AddPostModal
        inputsValue={addPostFormData}
        handleAddPost={handleAddNewPost}
        handleChangeInputs={handleChangeInputs}
        closeModal={() => setShowModal(false)}
        isOpen={showModal}
      />
    </main>
  );
};

export default HomeContainer;
