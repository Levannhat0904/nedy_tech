import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('authToken'); // Lấy token từ cookie
  if (!token) {
    // Chưa có token, chuyển hướng về trang đăng nhập
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Nếu đã đăng nhập, cho phép truy cập
  return NextResponse.next();
}

// Áp dụng middleware cho các đường dẫn
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // Các trang yêu cầu đăng nhập
};
