'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'
import { auth } from '@/auth' 
import bcrypt from 'bcryptjs' // Pastikan library ini sudah diinstall (npm install bcryptjs @types/bcryptjs)

// Inisialisasi Resend
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

// ==========================================
// 1. PUBLIC: LANDING PAGE DATA
// ==========================================

export async function getLandingPageData() {
  try {
    const [team, portfolio, skills] = await Promise.all([
      prisma.teamMember.findMany({ orderBy: { order: 'asc' } }),
      prisma.portfolioProject.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
      prisma.skill.findMany({ orderBy: { id: 'asc' } })
    ]);
    return { team, portfolio, skills };
  } catch (error) {
    console.error("Database Error (Landing Page):", error);
    return { team: [], portfolio: [], skills: [] };
  }
}

export async function getPortfolioPageData() {
  try {
    return await prisma.portfolioProject.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    return [];
  }
}

export async function getTeamPageData() {
  try {
    return await prisma.teamMember.findMany({ orderBy: { order: 'asc' } });
  } catch (error) {
    return [];
  }
}

// ==========================================
// 2. PUBLIC: FORM SUBMISSIONS
// ==========================================

export async function submitContactForm(formData: FormData) {
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
    honeypot: formData.get('company'),
  }

  if (rawData.honeypot) return { success: false, message: "Bot detected." };
  if (!rawData.name || !rawData.email || !rawData.message) {
    return { success: false, message: "Semua kolom wajib diisi." };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: rawData.name,
        email: rawData.email,
        message: rawData.message,
        status: "UNREAD"
      }
    });

    if (resend) {
      await resend.emails.send({
        from: 'Swakarsa Notif <system@swakarsadigital.com>',
        to: 'swakarsadigital@gmail.com',
        subject: `Pesan Baru: ${rawData.name}`,
        html: `<h3>Pesan dari Website</h3><p><strong>Nama:</strong> ${rawData.name}</p><p><strong>Email:</strong> ${rawData.email}</p><p><strong>Pesan:</strong><br/>${rawData.message}</p>`
      });
    }
    
    return { success: true, message: "Pesan berhasil terkirim!" };
  } catch (error) {
    console.error("Contact Submit Error:", error);
    return { success: false, message: "Gagal mengirim pesan, coba lagi nanti." };
  }
}

export async function submitJobApplication(formData: FormData) {
  try {
    const rawData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      hasWorkspace: formData.get('hasWorkspace') === 'on',
      experience: formData.get('experience') as string,
    }

    if (!rawData.email || !rawData.fullName) {
      return { success: false, message: "Email dan Nama wajib diisi." };
    }

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

    if (resend) {
      await resend.emails.send({
        from: 'Swakarsa Careers <jobs@swakarsadigital.com>',
        to: 'swakarsadigital@gmail.com',
        subject: `Pelamar Baru Arise: ${rawData.fullName}`,
        html: `<h3>Lamaran Kerja Baru</h3><p><strong>Nama:</strong> ${rawData.fullName}</p><p><strong>Email:</strong> ${rawData.email}</p><p><strong>Lokasi:</strong> ${rawData.location}</p>`
      });
    }

    return { success: true, message: "Lamaran berhasil dikirim!" };
  } catch (error) {
    console.error("Job Submit Error:", error);
    return { success: false, message: "Terjadi kesalahan sistem saat melamar." };
  }
}

// ==========================================
// 3. ADMIN: DASHBOARD DATA & ACTIONS
// ==========================================

export async function getContactMessages() {
  try {
    return await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    return [];
  }
}

export async function getJobApplications() {
  try {
    return await prisma.jobApplication.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    return [];
  }
}

export async function getAllProjects() {
  const session = await auth();
  const user = session?.user as any;
  if (user?.role !== 'ADMIN') return [];

  try {
    return await prisma.clientProject.findMany({
      include: {
        client: true,
        members: true 
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    return [];
  }
}

export async function approveProject(projectId: string) {
  const session = await auth();
  const user = session?.user as any;
  if (user?.role !== 'ADMIN') return { success: false, message: "Unauthorized" };

  try {
    await prisma.clientProject.update({
      where: { id: projectId },
      data: { status: 'ACTIVE' }
    });
    revalidatePath('/admin');
    revalidatePath('/lab');
    revalidatePath('/guild');
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal update status." };
  }
}

// ==========================================
// 4. PLATFORM: THE LAB (CLIENT)
// ==========================================

export async function getAvailableHeroes() {
  try {
    const heroes = await prisma.heroProfile.findMany({
      include: { user: true }
    });

    return heroes.map(hero => ({
      id: hero.userId, 
      name: hero.user.name || hero.nickname,
      role: "Specialist", 
      rate: 2500, 
      stats: {
        speed: hero.statSpeed,
        logic: hero.statLogic,
        aesthetic: hero.statAesthetic
      }
    }));
  } catch (error) {
    return [];
  }
}

export async function createProject(squadIds: string[], totalRate: number) {
  const session = await auth();
  const user = session?.user as any;
  const userId = user?.id;
  const userRole = user?.role;

  if (!userId) return { success: false, message: "Unauthorized" };
  if (userRole === 'CONSULTANT') return { success: false, message: "Konsultan tidak dapat membuat project." };
  if (squadIds.length === 0) return { success: false, message: "Squad kosong." };

  try {
    const project = await prisma.clientProject.create({
      data: {
        name: `Project Alpha #${Math.floor(Math.random() * 1000)}`,
        description: "Drafted team from The Lab",
        clientId: userId,
        totalRate: totalRate,
        status: "NEGOTIATION",
        members: {
          create: squadIds.map((heroId) => ({
            heroId: heroId
          }))
        }
      }
    });
    console.log(`✅ Project Created: ${project.id} by User ${userId}`);
    revalidatePath('/lab'); 
    return { success: true, projectId: project.id };
  } catch (error) {
    console.error("Create Project Error:", error);
    return { success: false, message: "Gagal membuat project." };
  }
}

export async function getClientProjects() {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) return [];

  try {
    const projects = await prisma.clientProject.findMany({
      where: { clientId: userId },
      include: {
        members: {
          include: {
            hero: { include: { heroProfile: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return projects;
  } catch (error) {
    return [];
  }
}

export async function getProjectDetails(projectId: string) {
  const session = await auth();
  // Casting user session
  const user = session?.user as any;
  const userId = user?.id;
  const userRole = user?.role;

  if (!userId) return null;

  try {
    const project = await prisma.clientProject.findUnique({
      where: { id: projectId },
      include: {
        client: true, // [BARU] Kita butuh data client untuk ditampilkan ke konsultan
        members: {
          include: {
            hero: { include: { heroProfile: true } }
          }
        }
      }
    });

    if (!project) return null;

    // Security Logic: Siapa yang boleh lihat?
    // 1. Admin
    const isAdmin = userRole === 'ADMIN';
    // 2. Pemilik Project (Client)
    const isOwner = project.clientId === userId;
    // 3. [BARU] Anggota Tim (Consultant yang terdaftar di project ini)
    const isMember = project.members.some(member => member.heroId === userId);

    // Jika bukan salah satu dari di atas, tolak akses
    if (!isOwner && !isAdmin && !isMember) {
      return null;
    }

    return project;
  } catch (error) {
    return null;
  }
}

// ==========================================
// 5. PLATFORM: THE GUILD (CONSULTANT)
// ==========================================

export async function getAssignedProjects() {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) return [];

  try {
    const projects = await prisma.clientProject.findMany({
      where: {
        members: { some: { heroId: userId } }
      },
      include: {
        client: true,
        members: { include: { hero: true } }
      },
      orderBy: { updatedAt: 'desc' }
    });
    return projects;
  } catch (error) {
    return [];
  }
}

// ==========================================
// 6. GENERAL: USER SETTINGS (REAL)
// ==========================================

export async function updateProfile(formData: FormData) {
  const session = await auth();
  const userId = (session?.user as any)?.id;

  if (!userId) return { success: false, message: "Unauthorized" };

  const name = formData.get("name") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Objek data yang akan diupdate (Defaultnya hanya nama)
  const updateData: any = { name };

  // Logika Ganti Password (Jika diisi)
  if (newPassword && newPassword.trim() !== "") {
    if (newPassword !== confirmPassword) {
      console.error("Password mismatch"); 
      return { success: false, message: "Password konfirmasi tidak cocok." };
    }
    
    if (newPassword.length < 6) {
        return { success: false, message: "Password minimal 6 karakter." };
    }

    // Hash password baru sebelum simpan ke DB
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updateData.password = hashedPassword;
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: updateData
    });
    
    revalidatePath('/settings');
    return { success: true, message: "Profil berhasil diperbarui!" };
  } catch (error) {
    console.error("Update Profile Error:", error);
    return { success: false, message: "Gagal update profil." };
  }
}