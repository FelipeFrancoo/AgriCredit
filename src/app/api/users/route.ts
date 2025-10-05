import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// GET - Listar todos os usuários
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Não retorna password
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json({ error: 'Erro ao buscar usuários' }, { status: 500 });
  }
}

// POST - Criar novo usuário
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, password, role } = data;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Verifica se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role.toUpperCase() as 'ADMIN' | 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: unknown) {
    console.error('Erro ao criar usuário:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao criar usuário';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// PUT - Atualizar usuário
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, name, email, password, role } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório' },
        { status: 400 }
      );
    }

    // Verifica se o usuário existe
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Se está alterando email, verifica se já existe
    if (email && email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });

      if (emailExists) {
        return NextResponse.json(
          { error: 'Email já cadastrado' },
          { status: 400 }
        );
      }
    }

    // Prepara os dados para atualização
    const updateData: {
      name?: string;
      email?: string;
      password?: string;
      role?: 'ADMIN' | 'USER';
    } = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role.toUpperCase() as 'ADMIN' | 'USER';
    
    // Hash da nova senha se fornecida
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Atualiza o usuário
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return NextResponse.json(updatedUser);
  } catch (error: unknown) {
    console.error('Erro ao atualizar usuário:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar usuário';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// DELETE - Deletar usuário
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório' },
        { status: 400 }
      );
    }

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Não permite deletar o último admin
    if (user.role === 'ADMIN') {
      const adminCount = await prisma.user.count({
        where: { role: 'ADMIN' },
      });

      if (adminCount <= 1) {
        return NextResponse.json(
          { error: 'Não é possível deletar o último administrador' },
          { status: 400 }
        );
      }
    }

    // Deleta o usuário (cascata deleta as análises também)
    await prisma.user.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Usuário deletado com sucesso' });
  } catch (error: unknown) {
    console.error('Erro ao deletar usuário:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao deletar usuário';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
