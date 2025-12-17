import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes that don't require authentication
  const PUBLIC_ROUTES = ["/", "/signin", "/signup"];
  
  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Create Supabase client for middleware
  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  
  // Redirect to signin if not authenticated
  if (!user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/signin";
    return NextResponse.redirect(redirectUrl);
  }
  
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|sw.js|manifest.webmanifest|workbox-|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};