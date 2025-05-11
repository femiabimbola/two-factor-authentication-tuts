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
  const sessionToken = request.cookies.get('session_token')?.value;

  // If no session token, redirect to login page
  if (!sessionToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Verify session with Express backend
  try {
    const response = await fetch(`${process.env.EXPRESS_API_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (!response.ok) {
      // Invalid session, clear cookie and redirect to login
      const loginUrl = new URL('/login', request.url);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete('session_token');
      return res;
    }

    // Session is valid, allow access
    return NextResponse.next();
  } catch (error) {
    // Handle errors (e.g., backend unreachable)
    console.error('Middleware auth check failed:', error);
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
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