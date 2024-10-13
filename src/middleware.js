import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;

    // Jika URL adalah root (/), redirect ke /admin
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/admin', req.url));
    }

    // Lanjutkan permintaan jika bukan root (/)
    return NextResponse.next();
}

// Configurasi middleware untuk halaman apa saja yang harus dijalankan
export const config = {
    matcher: '/', // Middleware hanya akan berjalan di halaman /
};
