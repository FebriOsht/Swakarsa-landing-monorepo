import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // 1. SEED USER ADMIN (Untuk Login Platform)
  // Password default: admin123
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@swakarsa.id' },
    update: {},
    create: {
      email: 'admin@swakarsa.id',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'ADMIN',
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

  // 2. SEED TEAM MEMBERS
  await prisma.teamMember.createMany({
    data: [
      {
        name: "M. Jonathan Tanuwijaya",
        role: "CEO & Lead Developer",
        image: "/images/jonathan.jpeg",
        description: "Leading the team with over 5 years of experience in the digital industry.",
        order: 1
      },
      {
        name: "Jethro Elijah Lim",
        role: "Co-Founder & Marketing Director",
        image: "/images/jethro.jpeg",
        description: "Digital strategy expert with a proven track record of increasing online business sales.",
        order: 2
      }
    ],
    skipDuplicates: true
  })
  console.log('Seeded Team Members')

  // 3. SEED SKILLS / SERVICES
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
  console.log('Seeded Skills')

  // 4. SEED PORTFOLIO
  await prisma.portfolioProject.create({
    data: {
      title: "Maju Mobilindo",
      category: "E-commerce Website",
      client: "Maju Mobilindo - Used Car Dealer",
      image: "/portfolio/Maju Mobilindo.jpeg",
      shortDescription: "E-commerce website for used car dealer with extensive catalog.",
      description: "Developing a comprehensive e-commerce website for a used car dealership, featuring advanced search filters, car comparison tools, and an admin dashboard for inventory management.",
      duration: "8 Weeks",
      challenges: ["Managing 500+ car catalog", "Creating responsive search engine"],
      solutions: ["Implementing advanced filtering system", "CDN for fast image loading"],
      results: [
        { "value": "300%", "label": "Traffic Increase" },
        { "value": "45%", "label": "Conversion Rate" }
      ],
      techStack: ["Next.js", "Tailwind CSS", "PostgreSQL"]
    }
  })
  console.log('Seeded Portfolio')

  console.log('Seeding completed!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })