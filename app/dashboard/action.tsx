'use server'

import { revalidatePath } from "next/cache";
import { createClient } from "../../lib/supabaseClient";
import { redirect } from "next/navigation";

export async function getAnnouncements() {
  const supabase = await createClient();

    const {data: {user},errorUser} = await supabase.auth.getUser();
    if (errorUser) {
      return { errorUser: errorUser.message };
    }

  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    return { error: error.message };
  }
  
  return { data, user };
}

export async function logout() {
    const supabase = await createClient();
    const {data, error} = await supabase.auth.getUser();
    if (error) {
      return { error: error.message };
    }
    console.log(data)
    if(data?.user){
      await supabase.auth.signOut();
    }
    // await supabase.auth.signOut();
    redirect("/");
    revalidatePath("/", "layout");
}