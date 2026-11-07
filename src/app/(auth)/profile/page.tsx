"use client";

import Image from "next/image";
import { useSession, signOut, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button, FieldError, Input, TextField } from "@heroui/react";
import { useState } from "react";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState("");

  // Get current user
  const user = session?.user;

  // Use session name initially, then edited name
  const currentName = name ?? user?.name ?? "";

  // Update user name
  const handleUpdateName = async () => {
    const trimmedName = currentName.trim();

    if (!trimmedName) {
      setMessage("নাম খালি রাখা যাবে না।");
      return;
    }

    if (trimmedName === user?.name) {
      setMessage("আপনার নামের কোনো পরিবর্তন হয়নি।");
      return;
    }

    try {
      setIsUpdating(true);
      setMessage("");

      const { error } = await updateUser({
        name: trimmedName,
      });

      if (error) {
        setMessage(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      // Reset local override to use updated session name
      setName(null);

      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
    } catch (error) {
      console.error("Profile update failed:", error);
      setMessage("নাম আপডেট করার সময় সমস্যা হয়েছে।");
    } finally {
      setIsUpdating(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      await signOut();

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      setIsSigningOut(false);
    }
  };

  // Loading state
  if (isPending) {
    return (
      <p className="text-center py-10 text-gray-500">Loading profile...</p>
    );
  }

  // Unauthenticated state
  if (!user) {
    return (
      <div className="flex flex-col items-center gap-3 py-10">
        <p className="text-gray-600">Please sign in first.</p>

        <Button
          onClick={() => router.push("/sign-in")}
          className="bg-green-700 text-white rounded-md px-5 py-2"
        >
          সাইন ইন
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center mt-10 px-4 gap-5">
      {/* Profile Header */}
      <div className="w-full">
        <p className="text-2xl font-bold">আমার প্রোফাইল</p>

        <p className="text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* User Information Card */}
      <div className="w-full flex flex-row items-center justify-between bg-white border border-gray-400/15 rounded-xl p-4">
        <div className="flex-1 flex flex-row items-center gap-3">
          {/* Profile Image */}
          <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-emerald-100 flex items-center justify-center">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <span className="text-2xl text-emerald-700 font-bold">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </span>
            )}
          </div>

          {/* User Name & Email */}
          <div className="flex flex-col justify-center min-w-0 gap-1">
            <p className="text-md font-medium text-gray-900">{user.name}</p>

            <p className="text-sm font-light text-gray-500 truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Sign Out */}
        <div className="flex flex-row items-center justify-end">
          <Button
            onClick={handleSignOut}
            isDisabled={isSigningOut}
            className="text-red-600 text-sm bg-white border rounded-md border-red-500/40 px-5 py-4"
          >
            {isSigningOut ? "সাইন আউট হচ্ছে..." : "↩ সাইন আউট"}
          </Button>
        </div>
      </div>

      {/* Profile Update Card */}
      <div className="w-full flex flex-col bg-white border border-gray-400/15 rounded-xl p-4">
        <div>
          <p className="text-xl font-semibold">তথ্য</p>
        </div>

        <div className="flex flex-col justify-between mt-2 p-5">
          {/* Name Input */}
          <div>
            <p className="text-sm mb-1">নাম</p>

            <TextField
              isRequired
              name="name"
              type="text"
              className="border rounded-xl border-gray-100"
            >
              <Input
                value={currentName}
                onChange={(event) => setName(event.target.value)}
                placeholder="আপনার নাম লিখুন"
              />

              <FieldError />
            </TextField>
          </div>

          {/* Feedback Message */}
          {message && (
            <p className="text-sm mt-3 text-emerald-600">{message}</p>
          )}

          {/* Update Button */}
          <div className="mt-4">
            <Button
              onClick={handleUpdateName}
              isDisabled={
                isUpdating ||
                !currentName.trim() ||
                currentName.trim() === user.name
              }
              className="w-full rounded-md border bg-green-700 px-4 py-2 text-white hover:bg-green-700 disabled:bg-green-700 disabled:opacity-100"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
