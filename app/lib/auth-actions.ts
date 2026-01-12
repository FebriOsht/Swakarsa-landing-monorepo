'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

// Helper untuk mengecek apakah error adalah Redirect Error dari Next.js
function isRedirectError(error: any) {
  return error?.message === 'NEXT_REDIRECT' || 
         error?.digest?.startsWith('NEXT_REDIRECT');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // 1. Cek User & Role secara manual untuk menentukan tujuan redirect
    // Kita lakukan ini agar "redirectTo" bisa dinamis sesuai role
    const user = await prisma.user.findUnique({
      where: { email },
    });

    let destination = '/'; // Default ke home

    if (user) {
      // Validasi password manual di sini agar kita tidak redirect user yang salah password
      // (Meskipun signIn akan mengecek lagi, ini untuk UX yang lebih baik & hemat proses)
      const passwordsMatch = await bcrypt.compare(password, user.password || '');
      if (!passwordsMatch) {
        return 'Invalid credentials.';
      }

      // Tentukan tujuan berdasarkan role
      switch (user.role) {
        case 'ADMIN':
          destination = '/admin';
          break;
        case 'CLIENT':
          destination = '/lab';
          break;
        case 'CONSULTANT':
          destination = '/guild';
          break;
        default:
          destination = '/home'; // User biasa/Agency
      }
    } else {
      return 'User not found.';
    }

    // 2. Eksekusi Login NextAuth
    // PENTING: signIn akan melempar error Redirect jika berhasil.
    // Error ini HARUS dilempar keluar (re-throw) agar navigasi terjadi.
    await signIn('credentials', {
      email,
      password,
      redirectTo: destination, 
    });

    return undefined; // Sukses (seharusnya tidak tercapai karena redirect)

  } catch (error) {
    // 3. PENTING: Cek apakah ini error redirect Next.js?
    // Jika ya, lempar ulang error tersebut agar halaman berpindah.
    if (isRedirectError(error)) {
      throw error;
    }

    // Handle error spesifik Auth.js
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        case 'CallbackRouteError':
          return 'Login failed. Please check your credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    
    // Log error lain (selain redirect) untuk debugging
    console.error('Login Error:', error);
    throw error;
  }
}