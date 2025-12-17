'use server'

import { createClient } from "../../lib/supabaseClient";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    return { error: error.message };
  }
  
  return { success: "Login successful! Redirecting..." };
}