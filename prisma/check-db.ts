import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['info', 'warn', 'error'],
})

async function main() {
  console.log("\n🔍 --- DIAGNOSA DATABASE ---")

  const url = process.env.DATABASE_URL || "KOSONG/UNDEFINED"
  const maskedUrl = url.includes("@") 
    ? url.replace(/:([^:@]+)@/, ":****@") 
    : url
  console.log(`📡 URL Database Terbaca: ${maskedUrl}`)

  try {
    await prisma.$connect()
    console.log("✅ Koneksi ke Database BERHASIL!")
  } catch (e) {
    console.error("❌ GAGAL Konek Database:", e)
    return
  }

  const models = Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$'))
  console.log(`📋 Model yang dikenali Prisma:`, models)

  console.log("\n✍️ Mencoba Insert Data Test...")
  
  const blogModel = (prisma as any).blogPost || (prisma as any).post || (prisma as any).article

  if (!blogModel) {
    console.error("❌ ERROR FATAL: Tidak ada model Blog yang ditemukan.")
    return
  }

  try {
    const result = await blogModel.upsert({
      where: { slug: 'test-koneksi-db' },
      update: {},
      create: {
        title: "Test Koneksi Database",
        slug: "test-koneksi-db",
        excerpt: "Jika artikel ini muncul, berarti koneksi benar.",
        content: "<p>Test data berhasil masuk.</p>",
        published: true,
        author: "Debug Bot",
        category: "System",
        // tags: ["Debug"],  <-- Baris ini SAYA HAPUS karena menyebabkan error
        imageUrl: "https://placehold.co/600x400",
      }
    })
    console.log("✅ BERHASIL Insert! Data test telah masuk.")
    console.log("👉 Silakan refresh Prisma Studio (localhost:5555) atau buka /blog.")
  } catch (e) {
    console.error("❌ GAGAL Insert Data:", e)
  }
}

main()
  .finally(() => prisma.$disconnect())