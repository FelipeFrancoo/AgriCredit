import { NextResponse } from 'next/server';
import { getUsers, addUser, updateUser, deleteUser } from '@/utils/userStorage';

// GET - Listar todos os usuários
export async function GET() {
  try {
    const users = getUsers();
    // Remove senhas da resposta
    const usersWithoutPasswords = users.map(({ password: _pwd, ...user }) => user);
    return NextResponse.json(usersWithoutPasswords);
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

    const newUser = addUser({ name, email, password, role });
    
    // Remove senha da resposta
    const { password: _pwd, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(userWithoutPassword, { status: 201 });
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

    const updatedUser = updateUser(id, { name, email, password, role });
    
    // Remove senha da resposta
    const { password: _pwd2, ...userWithoutPassword } = updatedUser;
    
    return NextResponse.json(userWithoutPassword);
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

    deleteUser(id);
    
    return NextResponse.json({ message: 'Usuário deletado com sucesso' });
  } catch (error: unknown) {
    console.error('Erro ao deletar usuário:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao deletar usuário';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
