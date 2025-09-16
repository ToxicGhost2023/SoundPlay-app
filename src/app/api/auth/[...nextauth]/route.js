import NextAuth from "next-auth";
import { UserModel } from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { verifyPassword } from "@/utils/authHash";
import connectDB from "@/utils/connectDB";

export const authOptions = {
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectDB();
        } catch (error) {
          throw new Error("Problem has occurred in the server");
        }

        if (!email || !password)
          throw new Error("Please enter valid information");

        const user = await UserModel.findOne({ email });

        //

        if (!user) throw new Error("Please create an account first");

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) throw new Error("Email or password is wrong");
        if (!user.verifiedMobile) {
          user.verifiedMobile = true;
          await user.save();
        }
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          userName: user.userName,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.userName = user.userName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.userName = token.userName;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
