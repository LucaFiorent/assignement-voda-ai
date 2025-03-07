import { userIdT } from "./../../../types/types";
import { useMutation } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import db from "../../../firebase/firabase.config";
import { formattedPostDataT } from "../../../types/types";
import { triggerToast } from "../../../stores/toastStore";
import { queryClient } from "../../../react-query/queryClient";

/**
 * Toggles the like status of a post
 *
 * @param postId - The ID of the post to like/unlike
 * @param userId - The ID of the user performing the like/unlike action
 * @returns An object containing the updated like status (`liked: true/false`) or an error message
 */
export async function likePost(postId: string, userId: string) {
  try {
    const likesRef = collection(db, "likes");

    // Query the likes collection to check if the user has already liked the post
    const likeQuery = query(
      likesRef,
      where("userId", "==", userId),
      where("postId", "==", postId)
    );
    const likeSnapshot = await getDocs(likeQuery);

    // If the user has liked the post, remove the like
    if (!likeSnapshot.empty) {
      const likeDoc = likeSnapshot.docs[0];
      await deleteDoc(likeDoc.ref);
      return { liked: false };
    } else {
      // If the user has not liked the post, add the like
      await addDoc(likesRef, { userId, postId });
      return { liked: true };
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return { error: error.message };
  }
}

/**
 * Unlikes all posts
 *
 * @param userId - The ID of the user whose likes are to be removed
 * @returns A promise that resolves once all likes are removed
 */
async function unlikeAllPosts(userId: string) {
  try {
    const likesRef = collection(db, "likes");
    const likeQuery = query(likesRef, where("userId", "==", userId));
    const likesSnapshot = await getDocs(likeQuery);

    // For each like document, delete it from Firestore
    const deletePosts = likesSnapshot.docs.forEach((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePosts);
    console.log("all likes removed");
    return;
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Custom hook to handle liking a post
 *
 * @returns A mutate function to like a post with postId and currentUserId as arguments
 */
export function useLikePost() {
  const { mutate } = useMutation({
    mutationKey: ["posts"],
    mutationFn: ({
      postId,
      currentUserId,
    }: {
      postId: string;
      currentUserId: string;
    }) => likePost(postId, currentUserId),
    onSuccess: () => {
      // invalidate query "posts"
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return { mutate };
}

/**
 * Custom hook to handle unliking all posts
 *
 * @returns A mutate function to unlike all posts for a given user, and a loading state
 */
export function useUnlikeAll() {
  const { mutate, isLoading } = useMutation({
    mutationKey: ["likedPosts"],
    mutationFn: (currentUserId: string) => unlikeAllPosts(currentUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return { mutate, isLoading };
}

/**
 * Adds a new post to the "posts" collection in Firestore
 *
 * @param postData - The post data to add, formatted according to `formattedPostDataT`
 * @returns A promise that resolves with the added post data
 */
async function addPost(postData: formattedPostDataT) {
  console.log(postData);

  try {
    const postsRef = collection(db, "posts");
    // Add the new post to the "posts" collection
    await addDoc(postsRef, postData);

    return postData;
  } catch (error) {
    console.log("Error:", error.message);
    throw new Error(error.message);
  }
}

/**
 * Custom hook to handle adding a new post
 *
 * @returns A mutate function to add a post with postData as the argument
 */
export function useAddPost() {
  const { mutate } = useMutation({
    mutationFn: (postData: formattedPostDataT) => addPost(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      triggerToast("Post added successfully", "success");
    },
  });

  return { mutate };
}
