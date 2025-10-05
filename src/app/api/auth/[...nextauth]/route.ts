import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({ server: process.env.EMAIL_SERVER! , from: process.env.EMAIL_FROM! }),
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'database' },
  callbacks: {
    async session({ session, user }) {
      (session as any).user.id = user.id
      (session as any).user.role = user.role
      return session
    }
  }
})

export { handler as GET, handler as POST }
