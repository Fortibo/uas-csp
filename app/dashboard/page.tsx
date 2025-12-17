// import { useState } from "react";
// 'use client'
import { createClient } from "@/lib/supabaseClient";
// import { getAnnouncements, logout } from "./action";
// import { useEffect, useState } from "react";


export default async function Dashboard() {

  
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
     
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, Successfully logged in as <span className="text-blue-600 font-bold">{user?.email}</span></p>
    <button className=" bg-red-500 text-white py-2 px-3 rounded-lg " onClick={logout}>Logout</button>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Announcements</h2>
        {data.error ? (
          <p className="text-red-600">{data.error}</p>
        ) : (
          <div className="space-y-4">
            {data?.map((announcement) => (
              <div key={announcement.id} className="border p-4 rounded">
                <h3 className="font-bold">{announcement.title}</h3>
                <p>{announcement.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}