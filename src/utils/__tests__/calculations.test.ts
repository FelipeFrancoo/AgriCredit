import {
  calcularRendimento,
  calcularAreaTotal,
  calcularProducaoTotal,
  calcularReceitaBruta,
  calcularCustoCusteio,
  calcularCustoArrendamento,
  calcularCustosELucros,
  calcularIndicadorCusteio,
  calcularIndicadorInvestimento,
  determinarParecerCusteio,
  determinarParecerInvestimento,
  determinarParecerFinal,
  calcularAnaliseCredito,
} from '../calculations';
import { FormData, Talhao } from '@/types';

describe('Calculations Utils', () => {
  describe('calcularRendimento', () => {
    it('deve retornar 70 sc/ha para região boa', () => {
      expect(calcularRendimento('boa')).toBe(70);
    });

    it('deve retornar 60 sc/ha para região médio', () => {
      expect(calcularRendimento('medio')).toBe(60);
    });

    it('deve retornar 50 sc/ha para região baixa', () => {
      expect(calcularRendimento('baixa')).toBe(50);
    });
  });

  describe('calcularAreaTotal', () => {
    it('deve somar área própria e arrendada', () => {
      expect(calcularAreaTotal(100, 50)).toBe(150);
    });

    it('deve funcionar com área arrendada zero', () => {
      expect(calcularAreaTotal(100, 0)).toBe(100);
    });
  });

  describe('calcularProducaoTotal', () => {
    const talhoes: Talhao[] = [
      { id: '1', areaPropria: 50, areaArrendada: 0, cultura: 'soja', regiao: 'boa' },
      { id: '2', areaPropria: 30, areaArrendada: 0, cultura: 'milho', regiao: 'medio' },
      { id: '3', areaPropria: 20, areaArrendada: 0, cultura: 'soja', regiao: 'baixa' },
    ];

    it('deve calcular produção total corretamente', () => {
      // 50*70 + 30*60 + 20*50 = 3500 + 1800 + 1000 = 6300
      expect(calcularProducaoTotal(talhoes)).toBe(6300);
    });

    it('deve retornar zero para array vazio', () => {
      expect(calcularProducaoTotal([])).toBe(0);
    });
  });

  describe('calcularReceitaBruta', () => {
    it('deve calcular receita bruta corretamente com culturas diferentes', () => {
      const talhoes: Talhao[] = [
        { id: '1', areaPropria: 50, areaArrendada: 0, cultura: 'soja', regiao: 'boa' },  // 50*70 = 3500 sc soja
        { id: '2', areaPropria: 30, areaArrendada: 0, cultura: 'milho', regiao: 'medio' }, // 30*60 = 1800 sc milho
      ];
      // 3500*100 + 1800*60 = 350000 + 108000 = 458000
      expect(calcularReceitaBruta(talhoes, 100, 60)).toBe(458000);
    });

    it('deve retornar zero para array vazio', () => {
      expect(calcularReceitaBruta([], 100, 60)).toBe(0);
    });

    it('deve calcular corretamente apenas com soja', () => {
      const talhoes: Talhao[] = [
        { id: '1', areaPropria: 100, areaArrendada: 0, cultura: 'soja', regiao: 'boa' }, // 100*70 = 7000 sc
      ];
      expect(calcularReceitaBruta(talhoes, 80, 50)).toBe(560000); // 7000*80
    });

    it('deve calcular corretamente apenas com milho', () => {
      const talhoes: Talhao[] = [
        { id: '1', areaPropria: 50, areaArrendada: 0, cultura: 'milho', regiao: 'medio' }, // 50*60 = 3000 sc
      ];
      expect(calcularReceitaBruta(talhoes, 80, 50)).toBe(150000); // 3000*50
    });
  });

  describe('calcularCustoCusteio', () => {
    it('deve calcular custo de custeio corretamente', () => {
      expect(calcularCustoCusteio(100, 5000)).toBe(500000);
    });
  });

  describe('calcularCustoArrendamento', () => {
    it('deve calcular custo de arrendamento corretamente', () => {
      expect(calcularCustoArrendamento(50, 2000)).toBe(100000);
    });

    it('deve retornar zero se área arrendada for zero', () => {
      expect(calcularCustoArrendamento(0, 2000)).toBe(0);
    });
  });

  describe('calcularCustosELucros', () => {
    const formData: FormData = {
      propriedade: {
        areaPropria: 80,
        areaArrendada: 20,
        talhoes: [
          { id: '1', areaPropria: 80, areaArrendada: 20, cultura: 'soja', regiao: 'boa' },
        ],
      },
      custos: {
        precoSoja: 100,
        precoMilho: 80,
        custoTotalAreaPropriaSoja: 0,
        custoTotalAreaArrendadaSoja: 0,
        custoTotalInsumosMilhoHa: 0,
        custeioPorHa: 5000,
        previsaoCusteioAnual: 0,
        investimentoTotal: 100000,
        arrendamentoPorHa: 2000,
      },
      dividas: {
        valorMenos1Ano: 50000,
        valor1a5Anos: 100000,
        dividasProtestos: 0,
      },
    };

    it('deve calcular custos e lucros corretamente', () => {
      const producaoTotal = 7000; // 100 * 70
      const receitaBruta = 700000; // 7000 * 100

      const resultado = calcularCustosELucros(formData, producaoTotal, receitaBruta);

      // Custo custeio: 100 * 5000 = 500000
      // Custo arrendamento: 20 * 2000 = 40000
      // Investimento: 100000
      // Proporção própria: 80/100 = 0.8
      // Proporção arrendada: 20/100 = 0.2

      expect(resultado.custoTotal).toBe(640000); // 500000 + 40000 + 100000
      expect(resultado.lucroTotal).toBe(60000); // 700000 - 640000
    });
  });

  describe('calcularIndicadorCusteio', () => {
    it('deve calcular indicador de custeio corretamente', () => {
      expect(calcularIndicadorCusteio(100000, 500000)).toBe(0.2);
    });

    it('deve retornar Infinity se receita for zero', () => {
      expect(calcularIndicadorCusteio(100000, 0)).toBe(Infinity);
    });
  });

  describe('calcularIndicadorInvestimento', () => {
    it('deve calcular indicador de investimento corretamente', () => {
      expect(calcularIndicadorInvestimento(50000, 100000)).toBe(0.5);
    });

    it('deve retornar Infinity se lucro for zero ou negativo', () => {
      expect(calcularIndicadorInvestimento(50000, 0)).toBe(Infinity);
      expect(calcularIndicadorInvestimento(50000, -10000)).toBe(Infinity);
    });
  });

  describe('determinarParecerCusteio', () => {
    it('deve retornar aprovado para indicador <= 0.2', () => {
      expect(determinarParecerCusteio(0.15)).toBe('aprovado');
      expect(determinarParecerCusteio(0.2)).toBe('aprovado');
    });

    it('deve retornar atenção para indicador entre 0.2 e 0.5', () => {
      expect(determinarParecerCusteio(0.3)).toBe('atencao');
      expect(determinarParecerCusteio(0.5)).toBe('atencao');
    });

    it('deve retornar reprovado para indicador > 0.5', () => {
      expect(determinarParecerCusteio(0.6)).toBe('reprovado');
      expect(determinarParecerCusteio(1.0)).toBe('reprovado');
    });
  });

  describe('determinarParecerInvestimento', () => {
    it('deve retornar aprovado para indicador < 0.5', () => {
      expect(determinarParecerInvestimento(0.3)).toBe('aprovado');
      expect(determinarParecerInvestimento(0.49)).toBe('aprovado');
    });

    it('deve retornar atenção para indicador entre 0.5 e 0.7', () => {
      expect(determinarParecerInvestimento(0.5)).toBe('atencao');
      expect(determinarParecerInvestimento(0.7)).toBe('atencao');
    });

    it('deve retornar reprovado para indicador > 0.7', () => {
      expect(determinarParecerInvestimento(0.8)).toBe('reprovado');
      expect(determinarParecerInvestimento(1.5)).toBe('reprovado');
    });
  });

  describe('determinarParecerFinal', () => {
    it('deve retornar reprovado se qualquer parecer for reprovado', () => {
      expect(determinarParecerFinal('reprovado', 'aprovado')).toBe('reprovado');
      expect(determinarParecerFinal('aprovado', 'reprovado')).toBe('reprovado');
      expect(determinarParecerFinal('reprovado', 'reprovado')).toBe('reprovado');
    });

    it('deve retornar atenção se qualquer parecer for atenção (e nenhum reprovado)', () => {
      expect(determinarParecerFinal('atencao', 'aprovado')).toBe('atencao');
      expect(determinarParecerFinal('aprovado', 'atencao')).toBe('atencao');
      expect(determinarParecerFinal('atencao', 'atencao')).toBe('atencao');
    });

    it('deve retornar aprovado se ambos forem aprovados', () => {
      expect(determinarParecerFinal('aprovado', 'aprovado')).toBe('aprovado');
    });
  });

  describe('calcularAnaliseCredito - Integração', () => {
    it('deve realizar análise completa corretamente - apenas soja', () => {
      const formData: FormData = {
        propriedade: {
          areaPropria: 100,
          areaArrendada: 50,
          talhoes: [
            { id: '1', areaPropria: 100, areaArrendada: 50, cultura: 'soja', regiao: 'boa' },
          ],
        },
        custos: {
          precoSoja: 100,
          precoMilho: 80,
          custoTotalAreaPropriaSoja: 30, // custo por ha
          custoTotalAreaArrendadaSoja: 35, // custo por ha
          custoTotalInsumosMilhoHa: 25,
          custeioPorHa: 5000,
          previsaoCusteioAnual: 0,
          investimentoTotal: 100000,
          arrendamentoPorHa: 0,
        },
        dividas: {
          valorMenos1Ano: 100000,
          valor1a5Anos: 200000,
          dividasProtestos: 0,
        },
      };

      const resultado = calcularAnaliseCredito(formData);

      // Área total: 100 + 50 = 150 ha
      expect(resultado.areaTotalPlantada).toBe(150);

      // Produtividade média soja: 70 sc/ha (região boa)
      // Receita bruta soja: 150 * 70 * 100 = 1,050,000
      expect(resultado.receitaBrutaSoja).toBe(1050000);
      expect(resultado.receitaBrutaMilho).toBe(0);
      expect(resultado.receitaBrutaTotal).toBe(1050000);

      // Lucro terras próprias: 100 * (70 - 30) * 100 = 400,000
      expect(resultado.previsaoLucroTerrasProprias).toBe(400000);

      // Lucro terras arrendadas: 50 * (70 - 35) * 100 = 175,000
      expect(resultado.previsaoLucroTerrasArrendadas).toBe(175000);

      // Lucro total soja: 400,000 + 175,000 = 575,000
      expect(resultado.previsaoLucroTotalSoja).toBe(575000);
      expect(resultado.lucroTotal).toBe(575000);

      // Dívidas
      expect(resultado.previsaoCusteioAnual).toBe(100000);
      expect(resultado.previsaoInvestimentoAnual).toBe(40000); // 200000 / 5
      expect(resultado.dividaTotalAnual).toBe(140000);

      // Indicadores
      expect(resultado.indicadorCusteio).toBeCloseTo(0.095, 3); // 100000 / 1050000
      expect(resultado.parecerCusteio).toBe('aprovado');

      expect(resultado.indicadorInvestimento).toBeCloseTo(0.070, 3); // 40000 / 575000
      expect(resultado.parecerInvestimento).toBe('aprovado');

      expect(resultado.parecerFinal).toBe('aprovado');
    });

    it('deve realizar análise completa corretamente - soja e milho', () => {
      const formData: FormData = {
        propriedade: {
          areaPropria: 100,
          areaArrendada: 50,
          talhoes: [
            { id: '1', areaPropria: 60, areaArrendada: 30, cultura: 'soja', regiao: 'boa' },
            { id: '2', areaPropria: 40, areaArrendada: 20, cultura: 'milho', regiao: 'medio' },
          ],
        },
        custos: {
          precoSoja: 100,
          precoMilho: 60,
          custoTotalAreaPropriaSoja: 30, // custo por ha
          custoTotalAreaArrendadaSoja: 35, // custo por ha
          custoTotalInsumosMilhoHa: 20, // custo por ha
          custeioPorHa: 5000,
          previsaoCusteioAnual: 0,
          investimentoTotal: 100000,
          arrendamentoPorHa: 0,
        },
        dividas: {
          valorMenos1Ano: 150000,
          valor1a5Anos: 250000,
          dividasProtestos: 0,
        },
      };

      const resultado = calcularAnaliseCredito(formData);

      // Área total: 100 + 50 = 150 ha
      expect(resultado.areaTotalPlantada).toBe(150);

      // SOJA
      // Área soja: 60 + 30 = 90 ha
      // Produtividade média soja: 70 sc/ha (região boa)
      // Receita bruta soja: 90 * 70 * 100 = 630,000
      expect(resultado.receitaBrutaSoja).toBe(630000);

      // Lucro terras próprias soja: 60 * (70 - 30) * 100 = 240,000
      expect(resultado.previsaoLucroTerrasProprias).toBe(240000);

      // Lucro terras arrendadas soja: 30 * (70 - 35) * 100 = 105,000
      expect(resultado.previsaoLucroTerrasArrendadas).toBe(105000);

      // Lucro total soja: 240,000 + 105,000 = 345,000
      expect(resultado.previsaoLucroTotalSoja).toBe(345000);

      // MILHO
      // Área milho: 40 + 20 = 60 ha
      // Produtividade média milho: 60 sc/ha (região médio)
      // Receita bruta milho: 60 * 60 * 60 = 216,000
      expect(resultado.receitaBrutaMilho).toBe(216000);

      // Lucro total milho: 60 * (60 - 20) * 60 = 144,000
      expect(resultado.previsaoLucroTotalMilho).toBe(144000);

      // TOTAIS
      expect(resultado.receitaBrutaTotal).toBe(846000); // 630,000 + 216,000
      expect(resultado.lucroTotal).toBe(489000); // 345,000 + 144,000

      // Dívidas
      expect(resultado.previsaoCusteioAnual).toBe(150000);
      expect(resultado.previsaoInvestimentoAnual).toBe(50000); // 250000 / 5
      expect(resultado.dividaTotalAnual).toBe(200000);

      // Indicadores
      expect(resultado.indicadorCusteio).toBeCloseTo(0.177, 3); // 150000 / 846000
      expect(resultado.parecerCusteio).toBe('aprovado');

      expect(resultado.indicadorInvestimento).toBeCloseTo(0.102, 3); // 50000 / 489000
      expect(resultado.parecerInvestimento).toBe('aprovado');

      expect(resultado.parecerFinal).toBe('aprovado');
    });
  });
});
