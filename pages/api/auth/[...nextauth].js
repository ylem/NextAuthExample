import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/login`;
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            username: credentials.email, // server requires the key is `usernaem` rather than `email
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const token = await res.json();
        if (res.ok && token) {
          return token.body;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Credentials sign in return as user
      account.access_token = user.access_token;
      // account.id_token = user.id_token;
      // account.refresh_token = user.refresh_token;
      // account.expires_in = user.expires_in;
      return true;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        // token.refreshToken = account.refresh_token;
        // token.idToken = account.id_token;
        // token.expiresIn = account.expires_in;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      // session.refres`hToken = token.refreshToken
      // session.idToken = token.idToken
      // session.expires`In = token.expiresIn
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: '/auth/logout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  debug: process.env.NODE_ENV === "development" ? true : false,
};
export default NextAuth(authOptions);
