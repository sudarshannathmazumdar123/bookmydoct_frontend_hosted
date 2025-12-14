import { NextResponse } from 'next/server'

const authRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password']
const userRoutes = ['/appointment', '/appointments', '/labTestBookings', '/profile', '/admin', '/superAdmin']

export function middleware(request) {
    const token = request.headers.get('cookie');
    const url = request.nextUrl.pathname

    const isAuthRoute = authRoutes.some(route => url.startsWith(route));
    const isUserRoute = userRoutes.some(route => url.startsWith(route));

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (isUserRoute && !token) {
        return NextResponse.redirect(new URL('/signin/patient', request.nextUrl))
    }

    // Just return next() for testing
    return NextResponse.next()
}

export const config = {
    matcher: ['/:path*']
}
