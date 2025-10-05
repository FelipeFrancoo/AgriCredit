import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Verifica se já existe um admin
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
  });

  if (existingAdmin) {
    console.log('✅ Admin já existe no banco de dados');
    console.log(`   Email: ${existingAdmin.email}`);
    return;
  }

  // Cria o admin padrão
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@agricredit.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin criado com sucesso!');
  console.log('   Email: admin@agricredit.com');
  console.log('   Senha: admin123');
  console.log('   ID:', admin.id);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao fazer seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
