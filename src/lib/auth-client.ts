import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://assignment-07-tarek-ph-b14.vercel.app",
});

export const { signIn, signUp, signOut, useSession, updateUser, changePassword, requestPasswordReset, resetPassword } = authClient;
