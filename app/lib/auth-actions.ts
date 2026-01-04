'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // Kita ubah FormData menjadi object biasa agar bisa menambahkan properti 'redirectTo'
    const data = Object.fromEntries(formData);

    // Login menggunakan credentials dan paksa redirect ke '/lab'
    await signIn('credentials', {
      ...data,
      redirectTo: '/lab', 
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials. Please check your email and password.'
        default:
          return 'Something went wrong. Please try again.'
      }
    }
    // Error redirect (NEXT_REDIRECT) harus dilempar ulang agar navigasi berjalan
    throw error 
  }
}