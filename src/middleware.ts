

import { NextRequest, NextResponse } from "next/server";

// Define public routes that do not require authentication
// eslint-disable-next-line  
const publicRoutes = ["/about", "/contact", "/","/signup","/signin","/verifyotp"];

// Define protected routes that require authentication
const protectedRoutes = ["/dashboard", "/profile", "/setting", "/github", "/resume", "/project"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
// For production
// const token = req.cookies.get("__Secure-authjs.session-token")?.value;
  const token = req.cookies.get("authjs.session-token")?.value;
  // If the route is protected, check if the user is authenticated
  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    // Token exists, continue with the request
    return NextResponse.next();
  }
return NextResponse.next()
}

// Configure middleware to run only for specific paths
export const config = {
  matcher: [
    "/signup","/signin",
    "/verifyotp",
    "/dashboard",
    "/profile",
    "/setting",
    "/github",
    "/about",
    "/contact",
    "/resume",
    "/project"
  ], 
};




