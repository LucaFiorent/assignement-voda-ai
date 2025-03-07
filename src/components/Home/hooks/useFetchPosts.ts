import { likedByUserT } from "./../../../types/types";
import {
  addDoc,
  collection,
  DocumentData,
  documentId,
  getDocs,
  limit,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import db from "../../../firebase/firabase.config";
import { FetchPostT, PostsFBT } from "../../../types/types";
import { useQuery } from "@tanstack/react-query";
import { POSTS_PER_PAGE } from "../../../constants/constants";
import { useEffect } from "react";
import { queryClient } from "../../../react-query/queryClient";

/**
 * Function to fetch the list of posts that the user has liked
 *
 * @param userId - The user's unique identifier
 * @returns An array of liked post IDs
 */
async function fetchLikedPostsList(userId: string) {
  const likesRef = collection(db, "likes");
  const likesQuery = query(likesRef, where("userId", "==", userId));
  const likesSnapshot = await getDocs(likesQuery);

  const likedPostIds = likesSnapshot.docs.map((doc) => doc.data().postId);

  return likedPostIds;
}

let lastDocumentForPosts: null | QueryDocumentSnapshot<DocumentData> = null;
let lastDocumentForLikedPosts: null | QueryDocumentSnapshot<DocumentData> =
  null;

/**
 * Fetch a page of posts from Firestore and check if the user has liked any of them
 *
 * @param pageNumber - The page number to fetch
 * @param userId - The user ID to check the liked posts
 * @returns The posts for the given page and the total count of posts
 */
export async function fetchPosts(pageNumber: number, userId: string) {
  try {
    // fetch all posts for the current page
    let postQuery;
    if (pageNumber === 1) {
      postQuery = query(collection(db, "posts"), limit(POSTS_PER_PAGE));
    } else {
      postQuery = query(
        collection(db, "posts"),
        limit(POSTS_PER_PAGE),
        startAfter(lastDocumentForPosts)
      );
    }

    const querySnapshot = await getDocs(postQuery);
    const posts: PostsFBT[] = [];

    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      posts.push({ id: doc.id, ...doc.data() });
    });

    // get list of posts that user has liked
    const likedPostIds = await fetchLikedPostsList(userId);
    // mark each post as liked by user
    const postsWithLikeStatus = await posts.map((post) => ({
      ...post,
      likedByUser: likedPostIds.includes(post.id),
    }));

    // update the pagination state
    lastDocumentForPosts = querySnapshot.docs[querySnapshot.docs.length - 1];

    // calc total pages
    const totalCountOfPosts = await getTotalDocumentCount("posts");
    // format data
    const formattedData = {
      totalPosts: totalCountOfPosts,
      posts: postsWithLikeStatus,
    };

    return formattedData;
  } catch (error) {
    console.error("Error fetching post per page", pageNumber, ":", error);
    return [];
  }
}

/**
 * Fetch liked posts for the user
 *
 * @param pageNumber - The page number to fetch
 * @param userId - The user ID to check the liked posts
 * @returns The liked posts for the given page and the total count of liked posts
 */
export async function fetchLikedPosts(pageNumber: number, userId: string) {
  try {
    const likedPostIds = await fetchLikedPostsList(userId);

    if (likedPostIds.length === 0) {
      return { totalPages: 0, posts: [] };
    }

    // Fetch liked posts
    let postQuery;
    if (pageNumber === 1 && likedPostIds.length !== 0) {
      postQuery = await query(
        collection(db, "posts"),
        where(documentId(), "in", likedPostIds),
        limit(POSTS_PER_PAGE)
      );
    } else {
      postQuery = await query(
        collection(db, "posts"),
        where(documentId(), "in", likedPostIds),
        limit(POSTS_PER_PAGE),
        startAfter(lastDocumentForLikedPosts)
      );
    }

    const querySnapshot = await getDocs(postQuery);

    const posts: { id: string; likedByUser: boolean }[] =
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        likedByUser: likedPostIds.includes(doc.id),
        ...doc.data(),
      }));

    // update the pagination state
    lastDocumentForLikedPosts =
      querySnapshot.docs[querySnapshot.docs.length - 1];

    // format data
    const formattedData = {
      totalPosts: likedPostIds.length,
      posts: posts,
    };

    return formattedData;
  } catch (error) {
    console.error("Error fetching post per page", pageNumber, ":", error);
    return [];
  }
}

/**
 * Custom hook to fetch either all posts or liked posts depending on the fetchOption
 *
 * @param pageNumber - The page number to fetch
 * @param userId - The user ID to check the liked posts
 * @param fetchOption - The option to fetch either "allPosts" or "likedPosts"
 * @returns The data, loading state, success state, and any error information
 */
export function useFetchPosts(
  pageNumber: number,
  userId: string,
  fetchOption: "allPosts" | "likedPosts"
) {
  const fallback: FetchPostT = { totalPosts: 0, posts: [] };

  const {
    data = fallback,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: [fetchOption === "allPosts" ? "posts" : "likedPosts", pageNumber],
    queryFn: () =>
      fetchOption === "allPosts"
        ? fetchPosts(pageNumber, userId)
        : fetchLikedPosts(pageNumber, userId),
    enabled: !!pageNumber,
  });

  useEffect(() => {
    // Listen for real-time updates in the "likes" collection
    const unsubscribe = onSnapshot(collection(db, "likes"), () => {
      // Invalidate both queries when likes change
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["likedPosts"] });
    });
    return () => unsubscribe();
  }, [queryClient]);

  return { data, isLoading, isSuccess, isError, error };
}

/**
 * Function to get the total count of documents in a given Firestore collection
 *
 * @param doc - The collection name
 * @returns The total count of documents in the specified collection
 */
export async function getTotalDocumentCount(doc: string) {
  try {
    const querySnapshot = await getDocs(collection(db, doc));
    const totalPages = querySnapshot.size;

    return totalPages;
  } catch (error) {
    console.error("error getting document count:", error);
    return 0;
  }
}
