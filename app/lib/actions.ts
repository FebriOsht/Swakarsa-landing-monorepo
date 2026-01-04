'use server'

import { prisma } from '../lib/prisma'
// import { revalidatePath } from 'next/cache' // Aktifkan jika nanti butuh revalidasi cache

// --- 1. FUNCTION: GET LANDING PAGE DATA (Untuk Halaman Home) ---
export async function getLandingPageData() {
  try {
    const [team, portfolio, skills] = await Promise.all([
      prisma.teamMember.findMany({
        orderBy: { order: 'asc' }
      }),
      prisma.portfolioProject.findMany({
        orderBy: { createdAt: 'desc' },
        take: 6 // Ambil 6 project terbaru
      }),
      prisma.skill.findMany({
        orderBy: { id: 'asc' }
      })
    ]);

    return { team, portfolio, skills };
  } catch (error) {
    console.error("Database Error:", error);
    // Return array kosong jika DB gagal agar web tidak crash total
    return { team: [], portfolio: [], skills: [] };
  }
}

// --- 2. FUNCTION: SUBMIT CONTACT FORM (Untuk Contact Form) ---
export async function submitContactForm(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  }
  
  console.log("Contact Form submitted:", rawData);
  // TODO: Sambungkan ke Resend Email atau Simpan ke DB ContactMessage
  return { success: true };
}

// --- 3. FUNCTION: SUBMIT JOB APPLICATION (Untuk Halaman Jobs/Arise) ---
export async function submitJobApplication(formData: FormData) {
  try {
    const rawData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      hasWorkspace: formData.get('hasWorkspace') === 'on', // Checkbox value
      experience: formData.get('experience') as string,
    }

    // Validasi sederhana
    if (!rawData.email || !rawData.fullName) {
      return { success: false, message: "Email dan Nama wajib diisi." };
    }

    // Simpan ke Database
    await prisma.jobApplication.create({
      data: {
        fullName: rawData.fullName,
        email: rawData.email,
        phone: rawData.phone,
        location: rawData.location,
        hasWorkspace: rawData.hasWorkspace,
        experience: rawData.experience,
        status: "NEW" 
      }
    });

    console.log("Job Application Saved:", rawData.email);
    
    return { success: true, message: "Lamaran berhasil dikirim!" };
  } catch (error) {
    console.error("Job Submit Error:", error);
    return { success: false, message: "Terjadi kesalahan sistem." };
  }
}

// --- 4. FUNCTION: GET ALL PORTFOLIO (Untuk Halaman /portfolio) ---
export async function getPortfolioPageData() {
  try {
    const projects = await prisma.portfolioProject.findMany({
      orderBy: { createdAt: 'desc' } // Ambil SEMUA data, urutkan dari terbaru
    });
    return projects;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

// --- 5. FUNCTION: GET ALL TEAM (Untuk Halaman /team) ---
export async function getTeamPageData() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' } // Ambil SEMUA data tim
    });
    return members;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}