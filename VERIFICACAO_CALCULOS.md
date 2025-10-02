# Verificação de Cálculos - AgriCredit

## Fórmulas Especificadas

### MILHO
1. **Receita Bruta Milho**: `Produtividade média da região × Área total plantada × Preço saca milho`
2. **Previsão Lucro Total Milho**: `Área total plantada × (Produtividade média região - Custo total insumos) × Preço saca milho`

### SOJA
1. **Receita Bruta Soja**: `Área total plantada × Produtividade média da região × Preço saca soja`
2. **Previsão Lucro Terras Próprias**: `Área plantio terra própria × (Produtividade média região - Custo total área própria) × Preço saca soja`
3. **Previsão Lucro Terras Arrendadas**: `Área plantio terra arrendada × (Produtividade média região - Custo total área arrendada) × Preço saca soja`
4. **Previsão Lucro Total Soja**: `Lucro terras próprias + Lucro terras arrendadas`

### TOTAIS
1. **Receita Bruta Total**: `Receita bruta soja + Receita bruta milho`
2. **Lucro Total**: `Previsão lucro total soja + Previsão lucro total milho`

## Status do Código Atual

### ✅ Fórmulas Implementadas Corretamente

Todas as fórmulas estão implementadas conforme especificação no arquivo `src/utils/calculations.ts`:

```typescript
// MILHO ✅
const receitaBrutaMilho = produtividadeMediaMilho * areaTotalMilho * dados.custos.precoMilho;
const previsaoLucroTotalMilho = areaTotalMilho * (produtividadeMediaMilho - dados.custos.custoTotalInsumosMilhoHa) * dados.custos.precoMilho;

// SOJA ✅
const receitaBrutaSoja = areaTotalSoja * produtividadeMediaSoja * dados.custos.precoSoja;
const previsaoLucroTerrasProprias = areaPropiaSoja * (produtividadeMediaSoja - dados.custos.custoTotalAreaPropriaSoja) * dados.custos.precoSoja;
const previsaoLucroTerrasArrendadas = areaArrendadaSoja * (produtividadeMediaSoja - dados.custos.custoTotalAreaArrendadaSoja) * dados.custos.precoSoja;
const previsaoLucroTotalSoja = previsaoLucroTerrasProprias + previsaoLucroTerrasArrendadas;

// TOTAIS ✅
const receitaBrutaTotal = receitaBrutaSoja + receitaBrutaMilho;
const lucroTotal = previsaoLucroTotalSoja + previsaoLucroTotalMilho;
```

## Exemplo de Cálculo Manual

### Dados de Teste
```
TALHÃO 1 (SOJA):
- Área própria: 100 ha
- Área arrendada: 50 ha
- Região: boa (70 sc/ha)

TALHÃO 2 (MILHO):
- Área própria: 80 ha
- Área arrendada: 20 ha
- Região: média (60 sc/ha)

PREÇOS:
- Soja: R$ 130,00/sc
- Milho: R$ 85,00/sc

CUSTOS:
- Custo total área própria soja: R$ 50,00/sc
- Custo total área arrendada soja: R$ 55,00/sc
- Custo total insumos milho: R$ 40,00/sc
```

### Cálculos Passo a Passo

#### SOJA
```
Área total soja = 100 + 50 = 150 ha
Área própria soja = 100 ha
Área arrendada soja = 50 ha
Produtividade média = 70 sc/ha

Receita Bruta Soja:
= 150 × 70 × 130
= 1.365.000,00

Lucro Terras Próprias:
= 100 × (70 - 50) × 130
= 100 × 20 × 130
= 260.000,00

Lucro Terras Arrendadas:
= 50 × (70 - 55) × 130
= 50 × 15 × 130
= 97.500,00

Lucro Total Soja:
= 260.000 + 97.500
= 357.500,00
```

#### MILHO
```
Área total milho = 80 + 20 = 100 ha
Produtividade média = 60 sc/ha

Receita Bruta Milho:
= 60 × 100 × 85
= 510.000,00

Lucro Total Milho:
= 100 × (60 - 40) × 85
= 100 × 20 × 85
= 170.000,00
```

#### TOTAIS
```
Receita Bruta Total:
= 1.365.000 + 510.000
= 1.875.000,00

Lucro Total:
= 357.500 + 170.000
= 527.500,00
```

## Como Verificar se há Problema

### 1. Verificar se os valores de entrada estão corretos
- ✅ Os custos por hectare estão sendo inseridos corretamente?
- ✅ As áreas estão corretas em cada talhão?
- ✅ Os preços das sacas estão corretos?

### 2. Verificar se a produtividade média está sendo calculada
O código calcula a produtividade média **ponderada** pela área:

```typescript
const produtividadeMediaSoja = talhoesSoja.length > 0
  ? talhoesSoja.reduce((sum, t) => {
      const area = t.areaPropria + t.areaArrendada;
      return sum + (calcularRendimento(t.regiao, config) * area);
    }, 0) / areaTotalSoja
  : 0;
```

**Exemplo**:
- Talhão 1: 100 ha região BOA (70 sc/ha) → 7.000 sc
- Talhão 2: 50 ha região MÉDIA (60 sc/ha) → 3.000 sc
- **Total**: 150 ha produzindo 10.000 sc
- **Produtividade média**: 10.000 / 150 = **66,67 sc/ha**

### 3. Verificar os custos inseridos

⚠️ **ATENÇÃO**: Os campos de custo devem ser preenchidos em **REAIS POR HECTARE** ou **REAIS POR SACA** conforme o tipo:

- `custoTotalAreaPropriaSoja`: Custo **por saca** da área própria
- `custoTotalAreaArrendadaSoja`: Custo **por saca** da área arrendada
- `custoTotalInsumosMilhoHa`: Custo **por saca** do milho

## Possíveis Problemas e Soluções

### ❌ Problema 1: Valores muito baixos ou negativos
**Causa**: Custos inseridos em formato errado (total em vez de por unidade)
**Solução**: Verificar se os custos estão em R$/saca

### ❌ Problema 2: Valores muito altos
**Causa**: Custos inseridos como centavos em vez de reais
**Solução**: Verificar a unidade monetária

### ❌ Problema 3: Lucro negativo inesperado
**Causa**: Custo por saca maior que produtividade
**Solução**: Revisar os valores de custo inseridos

## Teste Recomendado

Execute uma análise com estes valores simplificados:

```json
{
  "propriedade": {
    "areaPropria": 100,
    "areaArrendada": 0,
    "talhoes": [
      {
        "id": "1",
        "areaPropria": 100,
        "areaArrendada": 0,
        "cultura": "soja",
        "regiao": "boa"
      }
    ]
  },
  "custos": {
    "precoSoja": 100.00,
    "precoMilho": 80.00,
    "custoTotalAreaPropriaSoja": 30.00,
    "custoTotalAreaArrendadaSoja": 35.00,
    "custoTotalInsumosMilhoHa": 25.00,
    "custeioPorHa": 3000.00,
    "previsaoCusteioAnual": 0,
    "investimentoTotal": 0,
    "arrendamentoPorHa": 2000.00
  },
  "dividas": {
    "valorMenos1Ano": 50000,
    "valor1a5Anos": 100000,
    "dividasProtestos": 0
  }
}
```

### Resultados Esperados:
```
Produtividade: 70 sc/ha (região boa)
Área total: 100 ha

Receita Bruta Soja: 100 × 70 × 100 = 700.000,00
Lucro Terras Próprias: 100 × (70 - 30) × 100 = 400.000,00
Lucro Total Soja: 400.000,00

Receita Bruta Total: 700.000,00
Lucro Total: 400.000,00
```

## Conclusão

✅ **As fórmulas estão CORRETAS no código!**

Se você está vendo valores incorretos, o problema está provavelmente em:
1. 🔴 Valores de entrada (custos) no formato errado
2. 🔴 Unidades incorretas (total vs por hectare/saca)
3. 🔴 Talhões cadastrados incorretamente

**Recomendação**: Forneça um exemplo específico dos valores de entrada e o resultado que está obtendo para identificar o problema exato.
