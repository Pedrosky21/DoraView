import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  // Revisa todas las cookies para identificar la sesión
  const cookies = req.cookies;
  const token = cookies.get("sb-xkaggjpiilquvsgqvrmw-auth-token");

  if (!token) {
    // Redirige a login si no hay sesión
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/createDorama/:path*"], // protege /admin y subrutas
};
