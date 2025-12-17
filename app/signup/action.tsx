'use server'

import { createClient } from "../../lib/supabaseClient";

export async function register(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) {
    return { error: error.message };
  }
  
  return { success: "Registration successful! Please check your email to verify your account." };
}