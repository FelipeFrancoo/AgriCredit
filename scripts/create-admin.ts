import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Criando usuário admin...');

  // Verificar se o usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { email: 'ti@sementeslima.com.br' },
  });

  if (existingUser) {
    console.log('✅ Usuário admin já existe!');
    console.log({
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      role: existingUser.role,
    });
    return;
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash('ti#2025', 10);

  // Criar usuário admin
  const adminUser = await prisma.user.create({
    data: {
      email: 'ti@sementeslima.com.br',
      password: hashedPassword,
      name: 'TI - Sementes Lima',
      role: 'ADMIN',
    },
  });

  console.log('✅ Usuário admin criado com sucesso!');
  console.log({
    id: adminUser.id,
    email: adminUser.email,
    name: adminUser.name,
    role: adminUser.role,
  });

  // Criar também o admin padrão para compatibilidade
  const defaultAdmin = await prisma.user.findUnique({
    where: { email: 'admin@agricredit.com' },
  });

  if (!defaultAdmin) {
    const defaultHashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: 'admin@agricredit.com',
        password: defaultHashedPassword,
        name: 'Administrador',
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin padrão criado: admin@agricredit.com / admin123');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Erro:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
