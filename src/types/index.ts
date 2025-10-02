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
  custeioPorHa: number;
  previsaoCusteioAnual: number;
  // Outros
  investimentoTotal: number;
  arrendamentoPorHa: number;
}

export interface Dividas {
  valorMenos1Ano: number;
  valor1a5Anos: number;
}

export interface FormData {
  propriedade: DadosPropriedade;
  custos: CustosPrecos;
  dividas: Dividas;
}

export interface Resultados {
  receitaBrutaTotal: number;
  lucroPropria: number;
  lucroArrendada: number;
  lucroTotal: number;
  custoTotalPropria: number;
  custoTotalArrendada: number;
  custoTotal: number;
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
