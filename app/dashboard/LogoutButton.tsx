'use client'

import { logout } from "./action";

export default function LogoutButton() {
  return (
    <button 
      className="bg-red-500 text-white py-2 px-3 rounded-lg" 
      onClick={logout}
    >
      Logout
    </button>
  );
}