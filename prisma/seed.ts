import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // ==========================================
  // 1. SEED USER ADMIN (Platform Access)
  // ==========================================
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@swakarsa.id' },
    update: {}, // Jika sudah ada, jangan ubah apa-apa
    create: {
      email: 'admin@swakarsa.id',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'ADMIN',
      // Admin juga punya profil Hero (Opsional, untuk testing fitur Guild)
      heroProfile: {
        create: {
          nickname: 'The Architect',
          tier: 'DIAMOND',
          statSpeed: 10,
          statLogic: 10,
          statAesthetic: 10,
          xp: 9999
        }
      }
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
  await prisma.skill.create({
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
  
  await prisma.skill.create({
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

  // ==========================================
  // 4. SEED PORTFOLIO PROJECTS
  // ==========================================
  await prisma.portfolioProject.upsert({
    where: { id: 'oneclick-smart-resume' },
    update: {},
    create: {
      id: 'oneclick-smart-resume',
      title: 'OneClick Smart Resume',
      category: 'AI Platform',
      client: 'Swakarsa Digital',
      image: 'https://placehold.co/800x600/1e293b/FFF?text=OneClick+Smart+Resume',
      shortDescription: 'Transform Your Resume Instantly',
      description: `Stop letting bad formatting ruin your chances. Watch OneClick restructure your chaotic draft into an ATS-beating professional document.

OneClick Smart Resume is an AI-powered resume optimization platform that helps job seekers transform their resumes into professional, ATS-friendly documents. The platform uses advanced AI to analyze, restructure, and optimize resumes, ensuring they pass Applicant Tracking Systems (ATS) and stand out to recruiters.

**Key Features:**
- AI-powered resume optimization and restructuring
- ATS-friendly formatting and structure
- Job matching and discovery
- Real-time resume analysis and scoring
- Professional document generation

**Impact:**
- Successfully managing 500+ monthly active users
- Helping job seekers improve their resume quality and job application success rates
- Integrated payment system for seamless user experience

**Technical Implementation:**
Built with modern web technologies including React.js for the frontend, Vercel for deployment, Supabase for backend services and database, and Stripe for secure payment processing.`,
      duration: '6 months',
      challenges: [
        'Creating an AI system that accurately analyzes and optimizes resumes while maintaining user intent',
        'Ensuring ATS compatibility across different applicant tracking systems',
        'Handling high user volume (500+ monthly users) with reliable performance',
        'Integrating secure payment processing while maintaining user trust',
        'Providing accurate job matching recommendations'
      ],
      solutions: [
        'Developed advanced AI algorithms trained on successful resume patterns and ATS requirements',
        'Implemented comprehensive ATS compatibility testing and validation',
        'Leveraged Supabase for scalable database and backend infrastructure',
        'Integrated Stripe for secure, PCI-compliant payment processing',
        'Created intelligent job matching algorithm based on resume content and job descriptions'
      ],
      results: [
        { value: '500+', label: 'Monthly Active Users' },
        { value: '98%', label: 'ATS Compatibility Score' },
        { value: '24/7', label: 'Uptime Availability' }
      ],
      techStack: ['React.js', 'Vercel', 'Supabase', 'Stripe', 'AI/ML']
    }
  })
  console.log('Seeded Portfolio Projects')

  console.log('✅ Seeding completed successfully!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })