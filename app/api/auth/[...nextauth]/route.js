import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createUser, getUser } from '@/app/_services/actions';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        let existingUser = await getUser(user.email);

        if (!existingUser) {
          existingUser = await createUser({
            email: user.email,
            fullName: user.name,
          });
          return '/account/settings';
        }
        // ENRICH USER OBJECT
        user.id = existingUser.id;
        user.username = existingUser.username;
        user.fullName = existingUser.fullName;
        user.bio = existingUser.bio;
        user.email = existingUser.email;
        return true;
      } catch (err) {
        console.error('Error in signIn callback:', err);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.fullName = user.fullName;
        token.bio = user.bio;
        token.profilePhoto = user.profilePhoto;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = session.user || {};
      session.user.userId = token.id;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.fullName = token.fullName;
      session.user.bio = token.bio;
      session.user.profilePhoto = token.profilePhoto;

      return session;
    },
  },
  pages: {
    signIn: '/auth',
  },
  session: {
    strategy: 'jwt',
  },
};

// API Route Handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
