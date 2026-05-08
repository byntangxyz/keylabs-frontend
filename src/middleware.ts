import { withAuth } from 'next-auth/middleware';

export const middleware = withAuth({
  callbacks: {
    authorized: async ({ token }) => !!token,
  },
});

export const config = {
  matcher: ['/profile', '/settings'],
};
