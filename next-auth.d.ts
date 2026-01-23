import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Memperluas tipe Session agar bisa membaca session.user.role
   */
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }

  /**
   * Memperluas tipe User agar menerima properti dari database Prisma
   */
  interface User {
    role: string
  }
}

declare module "next-auth/jwt" {
  /**
   * Memperluas tipe token JWT agar bisa menyimpan properti role
   */
  interface JWT {
    id: string
    role: string
  }
}
