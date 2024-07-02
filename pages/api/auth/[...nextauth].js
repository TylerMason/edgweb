// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '../../../app/lib/mongodb';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();

        const user = await db.collection('users').findOne({ username: credentials.username });

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user._id, name: user.username };
        } else {
          throw new Error('Invalid username or password');
        }
      }
    })
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  secret: process.env.SECRET_KEY,
});
