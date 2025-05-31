import { NextResponse, NextRequest } from 'next/server';

// Define public routes using regex patterns
const publicRoutes = ['/login(.*)', '/register(.*)', '/'];

// Middleware function
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path matches any public route
  const isPublicRoute = publicRoutes.some((route) => {
    const regex = new RegExp(`^${route}$`);
    return regex.test(pathname);
  });

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check for authentication (e.g., session cookie or token)
    const sessionToken = request.cookies.get('token')?.value
    console.log(sessionToken)

  // If no session token, redirect to login page
  if (!sessionToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

    // If user is authenticated and trying to access login or signup, redirect to dashboard
    if (sessionToken && (pathname === '/login' || pathname === '/signup')) {
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }



}

// Middleware configuration
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};