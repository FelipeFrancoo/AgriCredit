import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Salvar análise
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { userId, dados, resultados } = data;

    if (!userId || !dados || !resultados) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Criar análise no banco
    const analise = await prisma.analiseCredito.create({
      data: {
        userId,
        nomeProprietario: dados.propriedade.nomeProprietario || 'Não informado',
        cpf: dados.propriedade.cpf || 'Não informado',
        areaPropria: dados.propriedade.areaPropria,
        areaArrendada: dados.propriedade.areaArrendada,
        talhoes: dados.propriedade.talhoes,
        custos: dados.custos,
        dividas: dados.dividas,
        resultados: resultados,
      },
    });

    return NextResponse.json({ success: true, id: analise.id }, { status: 201 });
  } catch (error) {
    console.error('Erro ao salvar análise:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar análise' },
      { status: 500 }
    );
  }
}

// GET - Buscar análises
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId é obrigatório' },
        { status: 400 }
      );
    }

    const analises = await prisma.analiseCredito.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Formata as análises para o formato esperado
    const formattedAnalises = analises.map((analise) => ({
      id: analise.id,
      dataAnalise: analise.createdAt.toISOString(),
      dados: {
        propriedade: {
          nomeProprietario: analise.nomeProprietario,
          cpf: analise.cpf,
          areaPropria: analise.areaPropria,
          areaArrendada: analise.areaArrendada,
          talhoes: analise.talhoes,
        },
        custos: analise.custos,
        dividas: analise.dividas,
      },
      resultados: analise.resultados,
      user: analise.user,
    }));

    return NextResponse.json(formattedAnalises);
  } catch (error) {
    console.error('Erro ao buscar análises:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar análises' },
      { status: 500 }
    );
  }
}
