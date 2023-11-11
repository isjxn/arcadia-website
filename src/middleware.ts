import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(_req) {
    // You can write your own logic here.
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token?.rank === "ADMIN") return true;
        return false;
      },
    },
  }
)

export const config = { matcher: ["/staff/:path*"] }