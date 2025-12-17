'use client';

import Link from "next/link";
import { login } from "./action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [state, formAction] = useActionState(login, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      setTimeout(() => router.push('/dashboard'), 1500);
    }
  }, [state?.success, router]);

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <form
          action={formAction}
          className="border rounded-xl p-6 flex flex-col gap-4 w-80"
        >
          <h1 className="text-2xl font-bold text-center">Sign In</h1>
          
          {state?.error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {state.error}
            </div>
          )}
          
          {state?.success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {state.success}
            </div>
          )}
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            required
            className="border rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            required
            className="border rounded-lg p-2"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white rounded-lg p-2">
          Sign In
        </button>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
        </>
    )

 
 }