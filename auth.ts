import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from '@/app/lib/prisma'; 
import bcrypt from 'bcryptjs';

// Skema validasi untuk memastikan input aman sebelum diproses ke DB
const LoginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
});

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // 1. Validasi format input menggunakan Zod
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // 2. Cari user di database berdasarkan email
          const user = await prisma.user.findUnique({ where: { email } });
          
          // Jika user tidak ditemukan, return null
          if (!user) return null;

          // 3. Cek kecocokan password dengan yang ada di DB (sudah di-hash)
          if (user.password) {
             const passwordsMatch = await bcrypt.compare(password, user.password);
             if (passwordsMatch) {
               // Jika cocok, kembalikan objek user
               return user;
             }
          }
        }

        console.log('Invalid credentials');
        return null; // Login gagal
      },
    }),
  ],
  // === BAGIAN PENTING: AGAR ID USER TERBAWA SAAT LOGIN ===
  callbacks: {
    // 1. Saat login sukses, simpan ID & Role ke Token JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // 2. Saat session dibaca di server/client, ambil ID & Role dari Token
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});