import { create } from "zustand";
import { usePagesStoreT } from "../types/storeTypes";

/**
 * Create a Zustand store for managing pagination states
 *
 * @actualPostPage Track current page number for posts
 * @actualLikedPostsPage Track current page number for liked posts
 * @setPostsPage update the current page number for all posts
 * @setPostsPage update the current page number for all posts
 * @setLikedPostsPage reset the current page number for all posts
 * @clearLikedPostsPage reset the current page number for liked posts
 *
 */
const usePageStore = create<usePagesStoreT>()((set) => ({
  actualPostsPage: 1,
  actualLikedPostsPage: 1,
  setPostsPage: (pageNumber: number) => set({ actualPostsPage: pageNumber }),
  setLikedPostsPage: (pageNumber: number) =>
    set({ actualLikedPostsPage: pageNumber }),
  clearPostsPage: () => set({ actualPostsPage: 1 }),
  clearLikedPostsPage: () => set({ actualLikedPostsPage: 1 }),
}));

export default usePageStore;
