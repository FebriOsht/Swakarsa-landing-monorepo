import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // ==========================================
  // SEED USER ADMIN UTAMA
  // ==========================================
  // Ini akun yang Anda gunakan untuk login ke /admin/blog
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@swakarsa.id' },
    update: {}, // Jika sudah ada, biarkan saja
    create: {
      email: 'admin@swakarsa.id',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'ADMIN',
    }
  })
  
  console.log(`Created Admin: ${admin.email}`)

  // ==========================================
  // 2. SEED CONSULTANTS (PENTING UNTUK "THE LAB")
  // ==========================================
  // Data ini diperlukan agar fitur Drag & Drop di /lab/draft berfungsi
  const heroesData = [
    { name: "Ahmad Musyaari", email: "ahmad@swakarsa.id", role: "Fullstack Dev", rate: 2500, stats: { speed: 8, logic: 9, aesthetic: 6 } },
    { name: "Reynardi G.", email: "reynardi@swakarsa.id", role: "Backend Lead", rate: 3000, stats: { speed: 7, logic: 10, aesthetic: 4 } },
    { name: "M. Taufiq", email: "taufiq@swakarsa.id", role: "DevOps Engineer", rate: 2800, stats: { speed: 9, logic: 8, aesthetic: 3 } },
    { name: "Yansen", email: "yansen@swakarsa.id", role: "UI/UX Designer", rate: 2200, stats: { speed: 6, logic: 5, aesthetic: 10 } },
    { name: "Richie A.", email: "richie@swakarsa.id", role: "Frontend Dev", rate: 2400, stats: { speed: 8, logic: 7, aesthetic: 9 } },
    { name: "Asep", email: "asep@swakarsa.id", role: "Mobile Dev", rate: 2300, stats: { speed: 7, logic: 8, aesthetic: 6 } },
  ]

  console.log("Seeding Heroes for The Lab...")
  const heroPassword = await bcrypt.hash('hero123', 10)

  for (const hero of heroesData) {
    // 1. Buat User Account
    const user = await prisma.user.upsert({
      where: { email: hero.email },
      update: {},
      create: {
        email: hero.email,
        name: hero.name,
        password: heroPassword,
        role: "CONSULTANT"
      }
    })

    // 2. Buat Hero Profile (RPG Stats)
    await prisma.heroProfile.upsert({
      where: { userId: user.id },
      update: {
        // Update stats jika seed dijalankan ulang
        statSpeed: hero.stats.speed,
        statLogic: hero.stats.logic,
        statAesthetic: hero.stats.aesthetic,
      },
      create: {
        userId: user.id,
        nickname: hero.name.split(" ")[0], // Ambil nama depan saja
        tier: "SILVER",
        statSpeed: hero.stats.speed,
        statLogic: hero.stats.logic,
        statAesthetic: hero.stats.aesthetic,
        xp: 100
      }
    })
  }
  console.log(`Seeded ${heroesData.length} Consultants`)

  // ==========================================
  // 3. SEED SKILLS / SERVICES
  // ==========================================
  await prisma.service.create({
    data: {
      title: "Inventory Management",
      category: "Operational System",
      image: "/images/Manajemen Inventori.jpg",
      shortDescription: "Automatic stock recording system to prevent loss.",
      description: "We develop integrated inventory management systems that track stock levels in real-time, automate reordering, and provide detailed analytics.",
      techStack: ["Next.js", "Node.js", "PostgreSQL"],
      features: ["Real-time stock recording", "Automatic alerts", "Multi-warehouse support"],
      useCases: ["Retail stores", "B2B distributors", "Warehouses"]
    }
  })
  
  await prisma.service.create({
    data: {
      title: "Point of Sale (POS)",
      category: "Transaction System",
      image: "/images/Point of Sale (POS).jpeg",
      shortDescription: "Streamline sales transactions with ease.",
      description: "Custom POS solutions designed for speed and reliability, supporting various payment methods and integrated with inventory.",
      techStack: ["React", "Electron", "Firebase"],
      features: ["Offline mode", "Receipt printing", "Sales reports"],
      useCases: ["Restaurants", "Coffee Shops", "Retail"]
    }
  })
  console.log('Seeded Services/Skills')

  console.log('✅ Seeding completed successfully!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })