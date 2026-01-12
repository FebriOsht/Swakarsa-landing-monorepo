'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'
import { auth, signIn, signOut } from '@/auth' 
import bcrypt from 'bcryptjs' 
import { AuthError } from "next-auth";

// Inisialisasi Resend (Opsional, hanya jika API key ada)
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

// ==========================================
// 1. AUTH ACTIONS (Login & Logout)
// ==========================================

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}

// ==========================================
// 2. PUBLIC: LANDING PAGE DATA (Agency)
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
// 3. PUBLIC: FORM SUBMISSIONS (Contact & Jobs)
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
// 4. ADMIN: DASHBOARD DATA & ACTIONS
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
// 5. PLATFORM: THE LAB (CLIENT - The Creator)
// ==========================================

export async function getAvailableHeroes() {
  try {
    const heroes = await prisma.heroProfile.findMany({
      where: { isAvailable: true }, // Mengambil hero yang statusnya Available
      include: { user: true }
    });

    return heroes.map(hero => ({
      id: hero.userId, 
      name: hero.user.name || hero.nickname,
      role: "Specialist", 
      rate: 2500, // USD (Hardcoded rate for MVP)
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
    const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    const project = await prisma.clientProject.create({
      data: {
        name: `New Project - ${dateStr}`, 
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
  const user = session?.user as any;
  const userId = user?.id;
  const userRole = user?.role;

  if (!userId) return null;

  try {
    const project = await prisma.clientProject.findUnique({
      where: { id: projectId },
      include: {
        client: true, // Data User Client
        members: {
          include: {
            hero: { include: { heroProfile: true } }
          }
        }
      }
    });

    if (!project) return null;

    // Security Logic: Hanya Admin, Owner, atau Member yang boleh lihat
    const isAdmin = userRole === 'ADMIN';
    const isOwner = project.clientId === userId;
    const isMember = project.members.some(member => member.heroId === userId);

    if (!isOwner && !isAdmin && !isMember) {
      return null;
    }

    return project;
  } catch (error) {
    return null;
  }
}

// ==========================================
// 6. PLATFORM: THE GUILD (CONSULTANT - The Hero)
// ==========================================

export async function getAssignedProjects() {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) return [];

  try {
    const projects = await prisma.clientProject.findMany({
      where: {
        members: { some: { heroId: userId } },
        status: { in: ['ACTIVE', 'COMPLETED'] }
      },
      include: {
        client: true,
        members: { 
          include: { 
            hero: {
              include: { heroProfile: true } 
            }
          } 
        }
      },
      orderBy: { updatedAt: 'desc' }
    });
    return projects;
  } catch (error) {
    console.error("Failed to fetch assigned projects:", error);
    return [];
  }
}

export async function getQuests() {
  const session = await auth();
  const userId = (session?.user as any)?.id;

  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    // 1. Available Quests (Quest Board) - Status NEGOTIATION
    const availableProjects = await prisma.clientProject.findMany({
      where: {
        status: 'NEGOTIATION',
      },
      include: {
        client: { select: { name: true, email: true, image: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    // 2. My Quests (Active Log) - Status ACTIVE/COMPLETED & User is Member
    const myProjects = await prisma.clientProject.findMany({
      where: {
        status: { in: ['ACTIVE', 'COMPLETED'] },
        members: { some: { heroId: userId } }, 
      },
      include: {
        client: { select: { name: true, email: true, image: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const allProjects = [...myProjects, ...availableProjects];

    const quests = allProjects.map((project) => {
      let difficulty: 'S' | 'A' | 'B' | 'C' = 'B';
      
      // USD Thresholds Logic
      if (project.totalRate > 5000) difficulty = 'S';
      else if (project.totalRate > 3000) difficulty = 'A';
      else if (project.totalRate > 1000) difficulty = 'B';
      else difficulty = 'C';

      const roleDisplay = project.status === 'NEGOTIATION' 
        ? 'Open Squad' 
        : 'Assigned Member';

      // Estimasi Deadline (Mockup Real-time calculation)
      const baseDate = project.status === 'ACTIVE' ? project.updatedAt : project.createdAt;
      const estimatedDeadline = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000); 
      // Safe casting karena field deadline belum ada di schema ClientProject
      const deadlineDate = estimatedDeadline;

      return {
        id: project.id,
        title: project.name,
        client: project.client.name || project.client.email || 'Unknown Client',
        role: roleDisplay,
        difficulty: difficulty,
        reward: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(project.totalRate),
        deadline: deadlineDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: project.status === 'NEGOTIATION' ? 'AVAILABLE' : project.status, 
        description: project.description,
      };
    });

    return { success: true, data: quests };
  } catch (error) {
    console.error('Failed to fetch quests:', error);
    return { success: false, error: 'Failed to fetch quests' };
  }
}

export async function getGuildStats() {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) return null;

  try {
    // FIX: Menggunakan 'projectMember' (nama model di schema)
    const projects = await prisma.projectMember.findMany({
      where: { heroId: userId },
      include: { project: true } // 'project' adalah relasi ke ClientProject
    });

    const activeQuests = projects.filter(p => p.project.status === 'ACTIVE').length;
    const completedQuests = projects.filter(p => p.project.status === 'COMPLETED').length;
    
    const totalLootValue = projects.reduce((acc, curr) => acc + Number(curr.project.totalRate), 0);
    const totalLoot = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      maximumFractionDigits: 0 
    }).format(totalLootValue);

    // RPG Leveling Logic
    const xp = (completedQuests * 100) + (activeQuests * 20);
    const level = Math.floor(xp / 500) + 1;
    const nextLevelXp = level * 500;
    const xpNeeded = nextLevelXp - xp;

    let rank = "Rookie";
    if (level >= 5) rank = "Specialist";
    if (level >= 10) rank = "Elite";
    if (level >= 20) rank = "Legend";

    return {
      activeQuests,
      completedQuests,
      totalLoot,
      rank,
      level,
      xpNeeded
    };
  } catch (error) {
    console.error("Failed to fetch guild stats:", error);
    return null;
  }
}

export async function getQuestById(projectId: string) {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) return null;

  try {
    const project = await prisma.clientProject.findUnique({
      where: { id: projectId },
      include: {
        client: { select: { name: true, email: true, image: true } },
        members: { 
          include: { 
            hero: { 
              include: { heroProfile: true } 
            } 
          } 
        }
      }
    });

    if (!project) return null;

    let difficulty: 'S' | 'A' | 'B' | 'C' = 'B';
    if (project.totalRate > 5000) difficulty = 'S';
    else if (project.totalRate > 3000) difficulty = 'A';
    else if (project.totalRate > 1000) difficulty = 'B';
    else difficulty = 'C';

    const baseDate = project.status === 'ACTIVE' ? project.updatedAt : project.createdAt;
    const estimatedDeadline = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000); 
    const deadlineDate = estimatedDeadline;

    const isMember = project.members.some(m => m.heroId === userId);

    // Transformasi data member agar bersih untuk UI
    const squadMembers = project.members.map(m => ({
      id: m.hero.id,
      name: m.hero.heroProfile?.nickname || m.hero.name || "Unknown Hero",
      role: m.hero.heroProfile?.tier || "Specialist", // Class RPG
      image: m.hero.image,
      stats: {
        speed: m.hero.heroProfile?.statSpeed || 0,
        logic: m.hero.heroProfile?.statLogic || 0,
      }
    }));

    return {
      id: project.id,
      title: project.name,
      client: project.client.name || project.client.email || 'Unknown Client',
      clientImage: project.client.image,
      role: isMember ? 'Member' : 'Open Slot',
      difficulty,
      reward: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(project.totalRate),
      deadline: deadlineDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: project.status,
      description: project.description,
      isMember: isMember,
      memberCount: project.members.length,
      members: squadMembers 
    };
  } catch (error) {
    console.error("Failed to fetch quest detail:", error);
    return null;
  }
}

export async function joinQuest(projectId: string) {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  
  if (!userId) return { success: false, message: "Unauthorized" };

  try {
    // 1. Cek ketersediaan project
    const project = await prisma.clientProject.findUnique({
      where: { id: projectId },
      include: { members: true }
    });

    if (!project) return { success: false, message: "Quest not found." };
    if (project.status !== 'NEGOTIATION') return { success: false, message: "Quest is no longer available." };

    // 2. Cek apakah user sudah bergabung
    const isAlreadyMember = project.members.some(m => m.heroId === userId);
    if (isAlreadyMember) return { success: false, message: "You have already joined this quest." };

    // 3. Gabung ke Quest (Create record di ProjectMember)
    // Menggunakan nama field 'projectId' sesuai schema
    await prisma.projectMember.create({
      data: {
        projectId: projectId,
        heroId: userId
      }
    });

    revalidatePath('/guild');
    revalidatePath(`/guild/project/${projectId}`);
    return { success: true, message: "You have joined the squad!" };

  } catch (error) {
    console.error("Join Quest Error:", error);
    return { success: false, message: "Failed to join quest." };
  }
}

// ==========================================
// 7. HERO PROFILE (CHARACTER SHEET)
// ==========================================

export async function getHeroStats() {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) return null;

  try {
    // 1. Ambil Data User beserta HeroProfile-nya
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { heroProfile: true }
    });

    if (!user) return null;

    // 2. LOGIKA REAL: Jika HeroProfile belum ada, BUAT SEKARANG (Auto-Initialize)
    // Ini memastikan data yang tampil adalah data database yang sah, bukan mock object.
    let hero = user.heroProfile;

    if (!hero) {
      hero = await prisma.heroProfile.create({
        data: {
          userId: userId,
          nickname: user.name || "Consultant", 
          isAvailable: true,
          statSpeed: 50,      // Base stat standar
          statLogic: 50,
          statAesthetic: 50,
          tier: "Specialist", // Default Class/Tier
          xp: 0
        }
      });
    }

    // 3. Hitung XP Real-time dari Riwayat Project (Quest Log)
    // Menggunakan relasi 'projectMember' sesuai schema.prisma
    const projects = await prisma.projectMember.findMany({
      where: { heroId: userId },
      include: { project: true } 
    });

    const completed = projects.filter(p => p.project.status === 'COMPLETED').length;
    const active = projects.filter(p => p.project.status === 'ACTIVE').length;
    
    // Rumus XP: Selesai=100xp, Sedang Jalan=20xp
    const xp = (completed * 100) + (active * 20);
    
    // Leveling: Setiap 500 XP naik 1 level
    const level = Math.floor(xp / 500) + 1;
    const nextLevelXp = level * 500;

    // Return data yang siap ditampilkan di UI
    return {
      name: hero.nickname, 
      email: user.email,
      class: hero.tier,
      level,
      xp,
      xpNext: nextLevelXp, 
      stats: {
        speed: hero.statSpeed,
        logic: hero.statLogic,
        aesthetic: hero.statAesthetic
      },
      availability: hero.isAvailable,
      // Kirim data real untuk ditampilkan di frontend
      completedProjects: completed,
      activeProjects: active
    };

  } catch (error) {
    console.error("Failed to fetch hero stats:", error);
    return null;
  }
}

// [REAL] Fungsi Update Status Ketersediaan
export async function updateHeroAvailability(status: boolean) {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) return { success: false, message: "Unauthorized" };

  try {
    // Upsert untuk memastikan update berjalan meski data baru dibuat
    await prisma.heroProfile.upsert({
      where: { userId },
      create: {
        userId,
        isAvailable: status,
        nickname: session?.user?.name || "Hero",
        statSpeed: 50,
        statLogic: 50,
        statAesthetic: 50
      },
      update: {
        isAvailable: status
      }
    });

    revalidatePath('/guild');
    revalidatePath('/guild/profile');
    revalidatePath('/lab'); // Agar client melihat status terbaru
    
    return { success: true, message: `Status updated to ${status ? 'Available' : 'Busy'}` };
  } catch (error) {
    console.error("Update Status Error:", error);
    return { success: false, message: "Failed to update status" };
  }
}

// ==========================================
// 8. GENERAL: USER SETTINGS (REAL)
// ==========================================

export async function updateProfile(formData: FormData) {
  const session = await auth();
  const userId = (session?.user as any)?.id;

  if (!userId) return { success: false, message: "Unauthorized" };

  const name = formData.get("name") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const updateData: any = { name };

  // Update Hero Profile Nickname juga agar sinkron dengan User Name
  try {
      await prisma.heroProfile.update({
          where: { userId },
          data: { nickname: name }
      }).catch(() => {}); // Ignore error jika profile belum ada
  } catch (e) {}

  if (newPassword && newPassword.trim() !== "") {
    if (newPassword !== confirmPassword) {
      console.error("Password mismatch"); 
      return { success: false, message: "Password konfirmasi tidak cocok." };
    }
    
    if (newPassword.length < 6) {
        return { success: false, message: "Password minimal 6 karakter." };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updateData.password = hashedPassword;
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: updateData
    });
    
    revalidatePath('/settings');
    revalidatePath('/guild/profile');
    return { success: true, message: "Profil berhasil diperbarui!" };
  } catch (error) {
    console.error("Update Profile Error:", error);
    return { success: false, message: "Gagal update profil." };
  }
}