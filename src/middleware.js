import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    // GET TOKEN
    const token = await getToken({ req: req, secret: process.env.AUTH_SECRET });

    // Paths yang hanya bisa diakses tanpa token (public paths)
    if (pathname === '/login' || pathname === '/signup') {
        if (token) {
            // Jika user sudah login, redirect sesuai role
            if (token.role === 'superadmin' || token.role === 'admin') {
                return NextResponse.redirect(new URL('/admin', req.url));
            } else {
                return NextResponse.redirect(new URL('/user', req.url));
            }
        }
        return NextResponse.next();
    }

    // Jika URL adalah root (/)
    if (pathname === '/') {
        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        if (token.role === 'superadmin' || token.role === 'admin') {
            return NextResponse.redirect(new URL('/admin', req.url));
        } else {
            return NextResponse.redirect(new URL('/user', req.url));
        }
    }

    // Allow auth API routes
    if (pathname.startsWith('/api/auth')) {
        return NextResponse.next();
    }

    // Check if token exists for protected routes
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Admin route protection
    if (pathname.startsWith('/admin')) {
        if (token.role !== 'admin' && token.role !== 'superadmin') {
            return NextResponse.redirect(new URL('/user', req.url));
        }
        return NextResponse.next();
    }

    // User route protection
    if (pathname.startsWith('/user')) {
        return NextResponse.next();
    }

    return NextResponse.next();
}

// Specify which routes this middleware should run for
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/admin/:path*',
        '/user/:path*',
        '/api/auth/:path*'
    ]
};