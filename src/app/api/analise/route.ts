import { NextRequest, NextResponse } from 'next/server';
import { FormData } from '@/types';
import { calcularAnaliseCredito } from '@/utils/calculations';
import { defaultConfig } from '@/config/defaults';

export async function POST(request: NextRequest) {
  try {
    const dados: FormData = await request.json();

    // Validação básica
    if (!dados.propriedade || !dados.custos || !dados.dividas) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Calcular análise
    const resultados = calcularAnaliseCredito(dados, defaultConfig);

    return NextResponse.json({
      dados,
      resultados,
      dataAnalise: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro ao processar análise:', error);
    return NextResponse.json(
      { error: 'Erro ao processar análise' },
      { status: 500 }
    );
  }
}
