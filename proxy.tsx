import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { updateSession } from "./utils/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const PUBLIC_ROUTES = ["/", "/signin", "/signup"];

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return await updateSession(request);
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/signin";
    return NextResponse.redirect(redirectUrl);
  }
  return await updateSession(request);
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|api|sw.js|manifest.webmanifest|workbox-|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
