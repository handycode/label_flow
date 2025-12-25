import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // 创建管理员账户
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@labelflow.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@labelflow.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  })
  console.log('✅ Created admin user:', admin.email)

  // 创建标注员账户
  const labelerPassword = await bcrypt.hash('labeler123', 10)
  const labeler = await prisma.user.upsert({
    where: { email: 'labeler@labelflow.com' },
    update: {},
    create: {
      username: 'labeler',
      email: 'labeler@labelflow.com',
      passwordHash: labelerPassword,
      role: 'LABELER',
      status: 'ACTIVE',
    },
  })
  console.log('✅ Created labeler user:', labeler.email)

  // 创建质检员账户
  const checkerPassword = await bcrypt.hash('checker123', 10)
  const checker = await prisma.user.upsert({
    where: { email: 'checker@labelflow.com' },
    update: {},
    create: {
      username: 'checker',
      email: 'checker@labelflow.com',
      passwordHash: checkerPassword,
      role: 'CHECKER',
      status: 'ACTIVE',
    },
  })
  console.log('✅ Created checker user:', checker.email)

  console.log('')
  console.log('🎉 Seeding completed!')
  console.log('')
  console.log('📋 Test accounts:')
  console.log('   Admin:   admin@labelflow.com / admin123')
  console.log('   Labeler: labeler@labelflow.com / labeler123')
  console.log('   Checker: checker@labelflow.com / checker123')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
