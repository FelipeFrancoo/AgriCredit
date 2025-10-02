import { calcularAnaliseCredito } from './src/utils/calculations';
import { FormData } from './src/types';
import { defaultConfig } from './src/config/defaults';

/**
 * Script de teste para validar os cálculos do AgriCredit
 * Execute com: node --loader tsx test-calculations.ts
 */

console.log('='.repeat(80));
console.log('TESTE DE CÁLCULOS - AgriCredit');
console.log('='.repeat(80));
console.log();

// Teste 1: Caso Simples - Apenas Soja em Terra Própria
console.log('📊 TESTE 1: Soja Simples (100 ha terra própria, região boa)');
console.log('-'.repeat(80));

const teste1: FormData = {
  propriedade: {
    areaPropria: 100,
    areaArrendada: 0,
    talhoes: [
      {
        id: '1',
        areaPropria: 100,
        areaArrendada: 0,
        cultura: 'soja',
        regiao: 'boa',
      },
    ],
  },
  custos: {
    precoSoja: 100.00,
    custoTotalAreaPropriaSoja: 30.00, // R$ 30/saca
    custoTotalAreaArrendadaSoja: 0,
    precoMilho: 0,
    custoTotalInsumosMilhoHa: 0,
    custeioPorHa: 0,
    previsaoCusteioAnual: 0,
    investimentoTotal: 0,
    arrendamentoPorHa: 0,
  },
  dividas: {
    valorMenos1Ano: 50000,
    valor1a5Anos: 100000,
    dividasProtestos: 0,
  },
};

const resultado1 = calcularAnaliseCredito(teste1, defaultConfig);

console.log('Entrada:');
console.log(`  Área: 100 ha (terra própria)`);
console.log(`  Cultura: Soja`);
console.log(`  Região: Boa (70 sc/ha)`);
console.log(`  Preço Soja: R$ 100,00/saca`);
console.log(`  Custo por saca: R$ 30,00`);
console.log();

console.log('Cálculos Manuais:');
console.log(`  Produção: 100 ha × 70 sc/ha = 7.000 sacas`);
console.log(`  Receita Bruta: 7.000 sc × R$ 100 = R$ 700.000,00`);
console.log(`  Lucro: 100 ha × (70 - 30) sc × R$ 100 = R$ 400.000,00`);
console.log();

console.log('Resultados do Sistema:');
console.log(`  ✅ Receita Bruta Soja: R$ ${resultado1.receitaBrutaSoja.toFixed(2)}`);
console.log(`  ✅ Lucro Terras Próprias: R$ ${resultado1.previsaoLucroTerrasProprias.toFixed(2)}`);
console.log(`  ✅ Lucro Total Soja: R$ ${resultado1.previsaoLucroTotalSoja.toFixed(2)}`);
console.log(`  ✅ Receita Bruta Total: R$ ${resultado1.receitaBrutaTotal.toFixed(2)}`);
console.log(`  ✅ Lucro Total: R$ ${resultado1.lucroTotal.toFixed(2)}`);
console.log();

const teste1OK = 
  Math.abs(resultado1.receitaBrutaSoja - 700000) < 0.01 &&
  Math.abs(resultado1.lucroTotal - 400000) < 0.01;

console.log(teste1OK ? '✅ TESTE 1 PASSOU!' : '❌ TESTE 1 FALHOU!');
console.log();
console.log();

// Teste 2: Soja com Terra Própria e Arrendada
console.log('📊 TESTE 2: Soja Mista (100 ha própria + 50 ha arrendada, região boa)');
console.log('-'.repeat(80));

const teste2: FormData = {
  propriedade: {
    areaPropria: 100,
    areaArrendada: 50,
    talhoes: [
      {
        id: '1',
        areaPropria: 100,
        areaArrendada: 50,
        cultura: 'soja',
        regiao: 'boa',
      },
    ],
  },
  custos: {
    precoSoja: 130.00,
    custoTotalAreaPropriaSoja: 50.00, // R$ 50/saca
    custoTotalAreaArrendadaSoja: 55.00, // R$ 55/saca (mais caro)
    precoMilho: 0,
    custoTotalInsumosMilhoHa: 0,
    custeioPorHa: 0,
    previsaoCusteioAnual: 0,
    investimentoTotal: 0,
    arrendamentoPorHa: 0,
  },
  dividas: {
    valorMenos1Ano: 100000,
    valor1a5Anos: 200000,
    dividasProtestos: 0,
  },
};

const resultado2 = calcularAnaliseCredito(teste2, defaultConfig);

console.log('Entrada:');
console.log(`  Área: 100 ha própria + 50 ha arrendada = 150 ha`);
console.log(`  Cultura: Soja`);
console.log(`  Região: Boa (70 sc/ha)`);
console.log(`  Preço Soja: R$ 130,00/saca`);
console.log(`  Custo própria: R$ 50,00/saca`);
console.log(`  Custo arrendada: R$ 55,00/saca`);
console.log();

console.log('Cálculos Manuais:');
console.log(`  Produção Total: 150 ha × 70 sc/ha = 10.500 sacas`);
console.log(`  Receita Bruta: 150 × 70 × 130 = R$ 1.365.000,00`);
console.log(`  Lucro Própria: 100 × (70 - 50) × 130 = R$ 260.000,00`);
console.log(`  Lucro Arrendada: 50 × (70 - 55) × 130 = R$ 97.500,00`);
console.log(`  Lucro Total: R$ 357.500,00`);
console.log();

console.log('Resultados do Sistema:');
console.log(`  ✅ Receita Bruta Soja: R$ ${resultado2.receitaBrutaSoja.toFixed(2)}`);
console.log(`  ✅ Lucro Terras Próprias: R$ ${resultado2.previsaoLucroTerrasProprias.toFixed(2)}`);
console.log(`  ✅ Lucro Terras Arrendadas: R$ ${resultado2.previsaoLucroTerrasArrendadas.toFixed(2)}`);
console.log(`  ✅ Lucro Total Soja: R$ ${resultado2.previsaoLucroTotalSoja.toFixed(2)}`);
console.log(`  ✅ Receita Bruta Total: R$ ${resultado2.receitaBrutaTotal.toFixed(2)}`);
console.log(`  ✅ Lucro Total: R$ ${resultado2.lucroTotal.toFixed(2)}`);
console.log();

const teste2OK = 
  Math.abs(resultado2.receitaBrutaSoja - 1365000) < 0.01 &&
  Math.abs(resultado2.previsaoLucroTerrasProprias - 260000) < 0.01 &&
  Math.abs(resultado2.previsaoLucroTerrasArrendadas - 97500) < 0.01 &&
  Math.abs(resultado2.lucroTotal - 357500) < 0.01;

console.log(teste2OK ? '✅ TESTE 2 PASSOU!' : '❌ TESTE 2 FALHOU!');
console.log();
console.log();

// Teste 3: Soja + Milho
console.log('📊 TESTE 3: Soja + Milho (150 ha soja + 100 ha milho)');
console.log('-'.repeat(80));

const teste3: FormData = {
  propriedade: {
    areaPropria: 180,
    areaArrendada: 70,
    talhoes: [
      {
        id: '1',
        areaPropria: 100,
        areaArrendada: 50,
        cultura: 'soja',
        regiao: 'boa',
      },
      {
        id: '2',
        areaPropria: 80,
        areaArrendada: 20,
        cultura: 'milho',
        regiao: 'medio',
      },
    ],
  },
  custos: {
    precoSoja: 130.00,
    custoTotalAreaPropriaSoja: 50.00,
    custoTotalAreaArrendadaSoja: 55.00,
    precoMilho: 85.00,
    custoTotalInsumosMilhoHa: 40.00,
    custeioPorHa: 0,
    previsaoCusteioAnual: 0,
    investimentoTotal: 0,
    arrendamentoPorHa: 0,
  },
  dividas: {
    valorMenos1Ano: 150000,
    valor1a5Anos: 300000,
    dividasProtestos: 0,
  },
};

const resultado3 = calcularAnaliseCredito(teste3, defaultConfig);

console.log('Entrada:');
console.log(`  SOJA: 100 ha própria + 50 ha arrendada = 150 ha (região boa, 70 sc/ha)`);
console.log(`  MILHO: 80 ha própria + 20 ha arrendada = 100 ha (região médio, 60 sc/ha)`);
console.log(`  Preço Soja: R$ 130,00/saca | Preço Milho: R$ 85,00/saca`);
console.log();

console.log('Cálculos Manuais:');
console.log(`  SOJA:`);
console.log(`    Receita: 150 × 70 × 130 = R$ 1.365.000,00`);
console.log(`    Lucro Própria: 100 × (70-50) × 130 = R$ 260.000,00`);
console.log(`    Lucro Arrendada: 50 × (70-55) × 130 = R$ 97.500,00`);
console.log(`    Lucro Total Soja: R$ 357.500,00`);
console.log();
console.log(`  MILHO:`);
console.log(`    Receita: 60 × 100 × 85 = R$ 510.000,00`);
console.log(`    Lucro: 100 × (60-40) × 85 = R$ 170.000,00`);
console.log();
console.log(`  TOTAL:`);
console.log(`    Receita Total: 1.365.000 + 510.000 = R$ 1.875.000,00`);
console.log(`    Lucro Total: 357.500 + 170.000 = R$ 527.500,00`);
console.log();

console.log('Resultados do Sistema:');
console.log(`  SOJA:`);
console.log(`    ✅ Receita Bruta: R$ ${resultado3.receitaBrutaSoja.toFixed(2)}`);
console.log(`    ✅ Lucro Total: R$ ${resultado3.previsaoLucroTotalSoja.toFixed(2)}`);
console.log(`  MILHO:`);
console.log(`    ✅ Receita Bruta: R$ ${resultado3.receitaBrutaMilho.toFixed(2)}`);
console.log(`    ✅ Lucro Total: R$ ${resultado3.previsaoLucroTotalMilho.toFixed(2)}`);
console.log(`  TOTAL:`);
console.log(`    ✅ Receita Bruta Total: R$ ${resultado3.receitaBrutaTotal.toFixed(2)}`);
console.log(`    ✅ Lucro Total: R$ ${resultado3.lucroTotal.toFixed(2)}`);
console.log();

const teste3OK = 
  Math.abs(resultado3.receitaBrutaSoja - 1365000) < 0.01 &&
  Math.abs(resultado3.receitaBrutaMilho - 510000) < 0.01 &&
  Math.abs(resultado3.receitaBrutaTotal - 1875000) < 0.01 &&
  Math.abs(resultado3.lucroTotal - 527500) < 0.01;

console.log(teste3OK ? '✅ TESTE 3 PASSOU!' : '❌ TESTE 3 FALHOU!');
console.log();
console.log();

// Resumo Final
console.log('='.repeat(80));
console.log('RESUMO DOS TESTES');
console.log('='.repeat(80));
console.log(`Teste 1 (Soja Simples): ${teste1OK ? '✅ PASSOU' : '❌ FALHOU'}`);
console.log(`Teste 2 (Soja Mista): ${teste2OK ? '✅ PASSOU' : '❌ FALHOU'}`);
console.log(`Teste 3 (Soja + Milho): ${teste3OK ? '✅ PASSOU' : '❌ FALHOU'}`);
console.log();

const todosOK = teste1OK && teste2OK && teste3OK;
if (todosOK) {
  console.log('🎉 TODOS OS TESTES PASSARAM! As fórmulas estão corretas! 🎉');
} else {
  console.log('⚠️  ALGUNS TESTES FALHARAM! Verifique as fórmulas.');
}
console.log('='.repeat(80));
