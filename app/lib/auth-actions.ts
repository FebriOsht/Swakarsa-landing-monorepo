'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '@/app/lib/prisma'; // Pastikan path import ini sesuai

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // 1. SMART REDIRECT: Cek Role dulu sebelum login
    // Kita intip database sebentar untuk tahu siapa yang mau masuk
    const user = await prisma.user.findUnique({
      where: { email },
      select: { role: true }
    });

    let destination = '/lab'; // Default landing page (untuk CLIENT)

    if (user) {
      if (user.role === 'ADMIN') {
        destination = '/admin';      // Redirect Admin
      } else if (user.role === 'CONSULTANT') {
        destination = '/guild';      // Redirect Konsultan
      }
    }

    // 2. Eksekusi Login NextAuth dengan tujuan spesifik
    await signIn('credentials', {
      email,
      password,
      redirectTo: destination, // <-- Ini kuncinya!
    });

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Email atau Password salah.';
        default:
          return 'Terjadi kesalahan sistem.';
      }
    }
    throw error;
  }
}