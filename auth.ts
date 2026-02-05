import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'; // Validasi input
import { prisma } from '@/app/lib/prisma'; // Koneksi DB Anda
import bcrypt from 'bcryptjs'; // Untuk cek hash password
import type { User } from '@prisma/client';

// Fungsi helper untuk mencari user di database berdasarkan email
async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  // Kita menimpa array 'providers' dari authConfig di sini
  // karena bcrypt dan prisma tidak bisa berjalan di auth.config.ts (yang dipakai middleware)
  providers: [
    Credentials({
      async authorize(credentials) {
        // 1. Validasi format email & password
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          // 2. Cari user di database
          const user = await getUser(email);
          if (!user) return null;
          
          // 3. Bandingkan password yang diinput dengan yang ada di database
          const passwordsMatch = await bcrypt.compare(password, user.password || '');
          
          // 4. Jika cocok, kembalikan data user (Login Berhasil)
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null; // Login Gagal
      },
    }),
  ],
});