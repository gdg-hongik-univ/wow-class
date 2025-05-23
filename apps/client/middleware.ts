import { dashboardApi } from "apis/dashboardApi";
import { cookieKey } from "constants/cookieKey";
import { routePath } from "constants/routePath";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// import { isMobileAllowedUrl } from "utils/isMobileAllowedUrl";
// import { isMobileUser } from "utils/isMobileUser";

export const config = {
  matcher: [
    "/my-page/:path*",
    "/my-study/:path*",
    "/study-apply/:path*",
    // "/mobile/:path*",
    // "/auth",
  ],
};

const middleware = async (req: NextRequest) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(cookieKey.accessToken)?.value;
  const middlewareExecuted = cookieStore.get(cookieKey["middleware-executed"]);
  const userAgent = req.headers.get("user-agent") || "";
  // const isMobile = isMobileUser(userAgent);

  // const url = new URL(req.url);
  // const isAuthUrl =
  //   url.pathname === routePath.auth ||
  //   url.pathname === `/mobile${routePath.auth}`;

  // if (isMobile && isMobileAllowedUrl(url.pathname)) {
  //   url.pathname = `/mobile/${url.pathname}`;
  //   return NextResponse.redirect(url);
  // }

  // if (isAuthUrl) {
  //   const requestHeaders = new Headers(req.headers);
  //   requestHeaders.set("x-pathname", req.nextUrl.pathname);
  //   return NextResponse.next({
  //     request: {
  //       headers: requestHeaders,
  //     },
  //   });
  // }

  if (!accessToken) {
    return NextResponse.redirect(new URL(routePath.auth, req.url));
  }

  if (!middlewareExecuted) {
    const { memberRole } = await dashboardApi.getDashboardInfo();

    if (memberRole !== "REGULAR") {
      return NextResponse.redirect(new URL(routePath.auth, req.url));
    }

    const response = NextResponse.next();
    response.cookies.set(cookieKey["middleware-executed"], "true", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return response;
  }

  return NextResponse.next();
};

export default middleware;
