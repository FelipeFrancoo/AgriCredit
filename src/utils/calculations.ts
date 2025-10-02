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
 * Calcula o indicador de custeio
 * Fórmula: Sisbacen menos 1 ano / Receita bruta total
 */
export function calcularIndicadorCusteio(
  dividaCurtoPrazo: number,
  receitaBruta: number
): number {
  if (receitaBruta === 0) return Infinity;
  return dividaCurtoPrazo / receitaBruta;
}

/**
 * Calcula o indicador de investimento
 * Fórmula: Previsão de investimento anual / Lucro total
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
 * Menor que 0,5 - Verde (aprovado)
 * Entre 0,5 e 0,7 - Amarelo (atenção)
 * Maior que 0,7 - Reprovado
 */
export function determinarParecerCusteio(
  indicador: number,
  config: Config = defaultConfig
): 'aprovado' | 'atencao' | 'reprovado' {
  if (indicador < config.thresholds.custeio.aprovado) return 'aprovado';
  if (indicador <= config.thresholds.custeio.atencao) return 'atencao';
  return 'reprovado';
}

/**
 * Determina o parecer baseado no indicador de investimento
 * Menor que 0,5 - Verde (aprovado)
 * Entre 0,5 e 0,7 - Amarelo (atenção)
 * Maior que 0,7 - Reprovado
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
  // Área total de terras plantadas: Area de plantio terra própria + Area de plantio terra arrendada
  const areaTotalPlantada = dados.propriedade.areaPropria + dados.propriedade.areaArrendada;
  
  // Separa talhões por cultura
  const talhoesMilho = dados.propriedade.talhoes.filter(t => t.cultura === 'milho');
  const talhoesSoja = dados.propriedade.talhoes.filter(t => t.cultura === 'soja');
  
  // Calcula áreas por cultura
  const areaTotalMilho = talhoesMilho.reduce((sum, t) => sum + t.areaPropria + t.areaArrendada, 0);
  const areaTotalSoja = talhoesSoja.reduce((sum, t) => sum + t.areaPropria + t.areaArrendada, 0);
  const areaPropiaSoja = talhoesSoja.reduce((sum, t) => sum + t.areaPropria, 0);
  const areaArrendadaSoja = talhoesSoja.reduce((sum, t) => sum + t.areaArrendada, 0);
  
  // Calcula produtividade média por cultura (considerando as regiões)
  const produtividadeMediaMilho = talhoesMilho.length > 0
    ? talhoesMilho.reduce((sum, t) => {
        const area = t.areaPropria + t.areaArrendada;
        return sum + (calcularRendimento(t.regiao, config) * area);
      }, 0) / areaTotalMilho
    : 0;
  
  const produtividadeMediaSoja = talhoesSoja.length > 0
    ? talhoesSoja.reduce((sum, t) => {
        const area = t.areaPropria + t.areaArrendada;
        return sum + (calcularRendimento(t.regiao, config) * area);
      }, 0) / areaTotalSoja
    : 0;
  
  // === MILHO ===
  // Receita Bruta: Produtividade media da região x Area total de terra plantada x Preco da saca de milho
  const receitaBrutaMilho = produtividadeMediaMilho * areaTotalMilho * dados.custos.precoMilho;
  
  // Previsão de Lucro total milho: Area total de terras plantadas x (Produtividade media região - custo total de insumos) x Preco da saca do milho
  const previsaoLucroTotalMilho = areaTotalMilho * (produtividadeMediaMilho - dados.custos.custoTotalInsumosMilhoHa) * dados.custos.precoMilho;
  
  // === SOJA ===
  // Previsão Receita Bruta Soja: Area total de terras plantadas x Produtividade media da região x Preco da saca de soja
  const receitaBrutaSoja = areaTotalSoja * produtividadeMediaSoja * dados.custos.precoSoja;
  
  // Previsão lucro terras próprias: Area de plantio de terra própria x (Produtividade media região - Custo total área própria) x Preco saca de soja
  const previsaoLucroTerrasProprias = areaPropiaSoja * (produtividadeMediaSoja - dados.custos.custoTotalAreaPropriaSoja) * dados.custos.precoSoja;
  
  // Previsão lucro terras arrendadas: Area de plantio de terra arrendada x (Produtividade media região - Custo total área arrendada) x Preco saca de soja
  const previsaoLucroTerrasArrendadas = areaArrendadaSoja * (produtividadeMediaSoja - dados.custos.custoTotalAreaArrendadaSoja) * dados.custos.precoSoja;
  
  // Previsão lucro total soja: Previsão lucro terras próprias + Previsão lucro terras arrendadas
  const previsaoLucroTotalSoja = previsaoLucroTerrasProprias + previsaoLucroTerrasArrendadas;
  
  // === TOTAL ===
  // Receita bruta total: Receita bruta da soja + Receita bruta do milho
  const receitaBrutaTotal = receitaBrutaSoja + receitaBrutaMilho;
  
  // Lucro total: Previsão lucro total soja + Previsão lucro total milho
  const lucroTotal = previsaoLucroTotalSoja + previsaoLucroTotalMilho;
  
  // === DÍVIDAS ===
  // Previsão de custeio anual = Sisbacen menos 1 ano
  const previsaoCusteioAnual = dados.dividas.valorMenos1Ano;
  
  // Previsão de Investimento anual = Sisbacen mais 1 a 5 anos / 5
  const previsaoInvestimentoAnual = dados.dividas.valor1a5Anos / 5;
  
  // Divida total anual: Previsão de custeio anual + Previsão de investimento anual
  const dividaTotalAnual = previsaoCusteioAnual + previsaoInvestimentoAnual;
  
  // === INDICADORES ===
  const indicadorCusteio = calcularIndicadorCusteio(previsaoCusteioAnual, receitaBrutaTotal);
  const indicadorInvestimento = calcularIndicadorInvestimento(previsaoInvestimentoAnual, lucroTotal);
  
  const parecerCusteio = determinarParecerCusteio(indicadorCusteio, config);
  const parecerInvestimento = determinarParecerInvestimento(indicadorInvestimento, config);
  const parecerFinal = determinarParecerFinal(parecerCusteio, parecerInvestimento);
  
  return {
    areaTotalPlantada,
    receitaBrutaMilho,
    previsaoLucroTotalMilho,
    receitaBrutaSoja,
    previsaoLucroTerrasProprias,
    previsaoLucroTerrasArrendadas,
    previsaoLucroTotalSoja,
    receitaBrutaTotal,
    lucroTotal,
    previsaoCusteioAnual,
    previsaoInvestimentoAnual,
    dividaTotalAnual,
    indicadorCusteio,
    indicadorInvestimento,
    parecerCusteio,
    parecerInvestimento,
    parecerFinal,
  };
}
