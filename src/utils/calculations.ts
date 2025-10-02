import { FormData, Resultados, Config, Talhao, Regiao } from '@/types';
import { defaultConfig } from '@/config/defaults';

/**
 * Calcula o rendimento esperado baseado na região
 */
export function calcularRendimento(regiao: Regiao, config: Config = defaultConfig): number {
  return config.rendimentos[regiao];
}

/**
 * Calcula a área total da propriedade
 */
export function calcularAreaTotal(areaPropria: number, areaArrendada: number): number {
  return areaPropria + areaArrendada;
}

/**
 * Calcula a produção total em sacas
 */
export function calcularProducaoTotal(talhoes: Talhao[], config: Config = defaultConfig): number {
  return talhoes.reduce((total, talhao) => {
    const rendimento = calcularRendimento(talhao.regiao, config);
    const areaTotal = talhao.areaPropria + talhao.areaArrendada;
    return total + (areaTotal * rendimento);
  }, 0);
}

/**
 * Calcula a receita bruta total considerando preços diferentes por cultura
 */
export function calcularReceitaBruta(
  talhoes: Talhao[],
  precoSoja: number,
  precoMilho: number,
  config: Config = defaultConfig
): number {
  return talhoes.reduce((total, talhao) => {
    const rendimento = calcularRendimento(talhao.regiao, config);
    const areaTotal = talhao.areaPropria + talhao.areaArrendada;
    const producao = areaTotal * rendimento;
    const preco = talhao.cultura === 'soja' ? precoSoja : precoMilho;
    return total + (producao * preco);
  }, 0);
}

/**
 * Calcula o custo total de custeio
 */
export function calcularCustoCusteio(
  areaTotal: number,
  custeioPorHa: number
): number {
  return areaTotal * custeioPorHa;
}

/**
 * Calcula o custo total de arrendamento
 */
export function calcularCustoArrendamento(
  areaArrendada: number,
  arrendamentoPorHa: number
): number {
  return areaArrendada * arrendamentoPorHa;
}

/**
 * Calcula custos e lucros separados por área própria e arrendada
 */
export function calcularCustosELucros(
  dados: FormData,
  producaoTotal: number,
  receitaBruta: number
): {
  custoTotalPropria: number;
  custoTotalArrendada: number;
  custoTotal: number;
  lucroPropria: number;
  lucroArrendada: number;
  lucroTotal: number;
} {
  const { propriedade, custos } = dados;
  const areaTotal = calcularAreaTotal(propriedade.areaPropria, propriedade.areaArrendada);
  
  // Custos
  const custoCusteio = calcularCustoCusteio(areaTotal, custos.custeioPorHa);
  const custoArrendamento = calcularCustoArrendamento(propriedade.areaArrendada, custos.arrendamentoPorHa);
  
  // Proporção de receita por área
  const proporcaoAreaPropria = areaTotal > 0 ? propriedade.areaPropria / areaTotal : 0;
  const proporcaoAreaArrendada = areaTotal > 0 ? propriedade.areaArrendada / areaTotal : 0;
  
  const receitaPropria = receitaBruta * proporcaoAreaPropria;
  const receitaArrendada = receitaBruta * proporcaoAreaArrendada;
  
  const custoCusteioPropria = custoCusteio * proporcaoAreaPropria;
  const custoCusteioArrendada = custoCusteio * proporcaoAreaArrendada;
  
  // Investimento é distribuído proporcionalmente
  const investimentoPropria = custos.investimentoTotal * proporcaoAreaPropria;
  const investimentoArrendada = custos.investimentoTotal * proporcaoAreaArrendada;
  
  const custoTotalPropria = custoCusteioPropria + investimentoPropria;
  const custoTotalArrendada = custoCusteioArrendada + investimentoArrendada + custoArrendamento;
  const custoTotal = custoTotalPropria + custoTotalArrendada;
  
  const lucroPropria = receitaPropria - custoTotalPropria;
  const lucroArrendada = receitaArrendada - custoTotalArrendada;
  const lucroTotal = lucroPropria + lucroArrendada;
  
  return {
    custoTotalPropria,
    custoTotalArrendada,
    custoTotal,
    lucroPropria,
    lucroArrendada,
    lucroTotal,
  };
}

/**
 * Calcula o indicador de custeio (Dívida curto prazo / Receita Bruta)
 */
export function calcularIndicadorCusteio(
  dividaCurtoPrazo: number,
  receitaBruta: number
): number {
  if (receitaBruta === 0) return Infinity;
  return dividaCurtoPrazo / receitaBruta;
}

/**
 * Calcula o indicador de investimento (Investimento / Lucro Total)
 */
export function calcularIndicadorInvestimento(
  investimento: number,
  lucroTotal: number
): number {
  if (lucroTotal <= 0) return Infinity;
  return investimento / lucroTotal;
}

/**
 * Determina o parecer baseado no indicador de custeio
 */
export function determinarParecerCusteio(
  indicador: number,
  config: Config = defaultConfig
): 'aprovado' | 'atencao' | 'reprovado' {
  if (indicador <= config.thresholds.custeio.aprovado) return 'aprovado';
  if (indicador <= config.thresholds.custeio.atencao) return 'atencao';
  return 'reprovado';
}

/**
 * Determina o parecer baseado no indicador de investimento
 */
export function determinarParecerInvestimento(
  indicador: number,
  config: Config = defaultConfig
): 'aprovado' | 'atencao' | 'reprovado' {
  if (indicador < config.thresholds.investimento.aprovado) return 'aprovado';
  if (indicador <= config.thresholds.investimento.atencao) return 'atencao';
  return 'reprovado';
}

/**
 * Determina o parecer final combinando os dois indicadores
 */
export function determinarParecerFinal(
  parecerCusteio: 'aprovado' | 'atencao' | 'reprovado',
  parecerInvestimento: 'aprovado' | 'atencao' | 'reprovado'
): 'aprovado' | 'atencao' | 'reprovado' {
  if (parecerCusteio === 'reprovado' || parecerInvestimento === 'reprovado') {
    return 'reprovado';
  }
  if (parecerCusteio === 'atencao' || parecerInvestimento === 'atencao') {
    return 'atencao';
  }
  return 'aprovado';
}

/**
 * Função principal que realiza todos os cálculos da análise de crédito
 */
export function calcularAnaliseCredito(
  dados: FormData,
  config: Config = defaultConfig
): Resultados {
  const producaoTotal = calcularProducaoTotal(dados.propriedade.talhoes, config);
  const receitaBrutaTotal = calcularReceitaBruta(
    dados.propriedade.talhoes,
    dados.custos.precoSoja,
    dados.custos.precoMilho,
    config
  );
  
  const {
    custoTotalPropria,
    custoTotalArrendada,
    custoTotal,
    lucroPropria,
    lucroArrendada,
    lucroTotal,
  } = calcularCustosELucros(dados, producaoTotal, receitaBrutaTotal);
  
  const indicadorCusteio = calcularIndicadorCusteio(
    dados.dividas.valorMenos1Ano,
    receitaBrutaTotal
  );
  
  const indicadorInvestimento = calcularIndicadorInvestimento(
    dados.custos.investimentoTotal,
    lucroTotal
  );
  
  const parecerCusteio = determinarParecerCusteio(indicadorCusteio, config);
  const parecerInvestimento = determinarParecerInvestimento(indicadorInvestimento, config);
  const parecerFinal = determinarParecerFinal(parecerCusteio, parecerInvestimento);
  
  return {
    receitaBrutaTotal,
    lucroPropria,
    lucroArrendada,
    lucroTotal,
    custoTotalPropria,
    custoTotalArrendada,
    custoTotal,
    indicadorCusteio,
    indicadorInvestimento,
    parecerCusteio,
    parecerInvestimento,
    parecerFinal,
  };
}
