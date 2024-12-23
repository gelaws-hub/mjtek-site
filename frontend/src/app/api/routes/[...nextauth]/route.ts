import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Send login request to your custom backend
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const user = await res.json();

          // If login is successful and user data is returned
          if (res.ok) {
            return user;
          }

          // Return null if login fails
          return null;
        } catch (err) {
          console.error("Login error:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session storage
  },
  jwt: {
    secret: process.env.JWT_SECRET, // Set this in your .env file
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role_name = user.role_name;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        role_name: token.role_name,
        accessToken: token.accessToken,
      };
      return session;
    },
  },

  pages: {
    signIn: "/login", // Custom login page
  },
});

export { handler as GET, handler as POST };
