import { User } from "firebase/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useUserStoreT } from "../types/storeTypes";

/**
 * Zustand store for managing user authentication state
 *
 * @user Stores the authenticated user data
 * @setUser Sets the user state
 * @clearUser Clears the user state (logs out the user)
 *
 */

const useUserStore = create<useUserStoreT>()(
  // store data in local storage
  persist(
    (set) => ({
      user: null,
      setUser: (userData: User) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Utility function to set user data in the store
 *
 * @param userData - The user object containing authentication details
 */
export const setUserForStore = (userData: User) => {
  useUserStore.getState().setUser(userData);
};

export default useUserStore;
