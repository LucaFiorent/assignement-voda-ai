import { User } from "firebase/auth";

interface id {
  id: string;
}

export type AuthContextProps = {
  currentUser: User | null;
  isLogin: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export interface UserT {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  createdAt: number;
  lastLoginAt?: number;
}

export interface userIdT {
  userId: string;
}

export interface PostContentT {
  title: string;
  body: string;
}

export interface likedByUserT {
  likedByUser: boolean;
}

export type PostsT = userIdT & PostContentT & likedByUserT & id;
export type PostsFBT = userIdT & PostContentT;

export interface FetchPostT {
  totalPosts: number;
  posts: PostsT[];
}
