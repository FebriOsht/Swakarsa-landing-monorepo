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
  console.log('Password default: admin123')

  console.log('✅ Seeding completed successfully! (Simple version)')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })