import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', name: 'Admin', role: 'admin' }
  })
  console.log({ admin })
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
