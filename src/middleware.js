import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    // GET TOKEN
    const token = await getToken({ req: req, secret: process.env.AUTH_SECRET });

    // Jika URL adalah root (/), redirect ke /admin
    if (pathname === '/') {
        if (token?.role === 'superadmin' | 'admin') {
            return NextResponse.redirect(new URL('/admin', req.url));
        } else {
            return NextResponse.redirect(new URL('/user', req.url));
        }
    }

    if (pathname.startsWith('/api/auth') || pathname.startsWith('/api/auth/signin')) {
        return NextResponse.next();
    }


    // If no token is found, redirect to login page
    if (!token) {
        return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }

    // Lanjutkan permintaan jika bukan root (/)
    return NextResponse.next();
}

