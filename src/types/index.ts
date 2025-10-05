export type Cultura = 'soja' | 'milho';
export type Regiao = 'boa' | 'medio' | 'baixa';

export interface Talhao {
  id: string;
  areaPropria: number;
  areaArrendada: number;
  cultura: Cultura;
  regiao: Regiao;
}

export interface DadosPropriedade {
  nomeProprietario: string;
  cpf: string;
  areaPropria: number;
  areaArrendada: number;
  talhoes: Talhao[];
}

export interface CustosPrecos {
  // Soja
  precoSoja: number;
  custoTotalAreaPropriaSoja: number;
  custoTotalAreaArrendadaSoja: number;
  // Milho
  precoMilho: number;
  custoTotalInsumosMilhoHa: number;
  // Outros
  investimentoTotal: number;
  arrendamentoPorHa: number;
  // Outras Receitas
  outrasReceitas: number;
}

export interface Dividas {
  valorMenos1Ano: number;
  valor1a5Anos: number;
  dividasProtestos: number;
}

export interface FormData {
  propriedade: DadosPropriedade;
  custos: CustosPrecos;
  dividas: Dividas;
}

export interface Resultados {
  // Áreas
  areaTotalPlantada: number;
  
  // MILHO
  receitaBrutaMilho: number;
  previsaoLucroTotalMilho: number;
  
  // SOJA
  receitaBrutaSoja: number;
  previsaoLucroTerrasProprias: number;
  previsaoLucroTerrasArrendadas: number;
  previsaoLucroTotalSoja: number;
  
  // TOTAIS
  receitaBrutaTotal: number;
  previsaoLucroOutrasReceitas: number;
  lucroTotal: number;
  
  // DÍVIDAS
  previsaoInvestimentoAnual: number;
  dividaTotalAnual: number;
  
  // INDICADORES
  indicadorCusteio: number;
  indicadorInvestimento: number;
  parecerCusteio: 'aprovado' | 'atencao' | 'reprovado';
  parecerInvestimento: 'aprovado' | 'atencao' | 'reprovado';
  parecerFinal: 'aprovado' | 'atencao' | 'reprovado';
}

export interface AnaliseCompleta {
  dados: FormData;
  resultados: Resultados;
  dataAnalise: string;
}

export interface Config {
  rendimentos: {
    boa: number;
    medio: number;
    baixa: number;
  };
  rendimentosMilho: {
    boa: number;
    medio: number;
    baixa: number;
  };
  thresholds: {
    custeio: {
      aprovado: number;
      atencao: number;
    };
    investimento: {
      aprovado: number;
      atencao: number;
    };
  };
}
