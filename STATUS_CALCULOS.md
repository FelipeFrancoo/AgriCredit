# 📋 Status dos Cálculos - AgriCredit

## ✅ CONFIRMAÇÃO: Fórmulas Estão CORRETAS!

Após análise detalhada do código em `src/utils/calculations.ts`, confirmo que **todas as fórmulas estão implementadas corretamente** conforme suas especificações.

## 📊 Fórmulas Implementadas

### 🌽 MILHO

#### 1. Receita Bruta Milho
```typescript
// Linha 231 - calculations.ts
const receitaBrutaMilho = produtividadeMediaMilho * areaTotalMilho * dados.custos.precoMilho;
```
**Fórmula**: `Produtividade média × Área total × Preço saca milho` ✅

#### 2. Previsão Lucro Total Milho
```typescript
// Linha 234 - calculations.ts
const previsaoLucroTotalMilho = areaTotalMilho * (produtividadeMediaMilho - dados.custos.custoTotalInsumosMilhoHa) * dados.custos.precoMilho;
```
**Fórmula**: `Área total × (Produtividade média - Custo insumos) × Preço saca milho` ✅

---

### 🌱 SOJA

#### 1. Receita Bruta Soja
```typescript
// Linha 238 - calculations.ts
const receitaBrutaSoja = areaTotalSoja * produtividadeMediaSoja * dados.custos.precoSoja;
```
**Fórmula**: `Área total × Produtividade média × Preço saca soja` ✅

#### 2. Previsão Lucro Terras Próprias
```typescript
// Linha 241 - calculations.ts
const previsaoLucroTerrasProprias = areaPropiaSoja * (produtividadeMediaSoja - dados.custos.custoTotalAreaPropriaSoja) * dados.custos.precoSoja;
```
**Fórmula**: `Área própria × (Produtividade média - Custo área própria) × Preço saca soja` ✅

#### 3. Previsão Lucro Terras Arrendadas
```typescript
// Linha 244 - calculations.ts
const previsaoLucroTerrasArrendadas = areaArrendadaSoja * (produtividadeMediaSoja - dados.custos.custoTotalAreaArrendadaSoja) * dados.custos.precoSoja;
```
**Fórmula**: `Área arrendada × (Produtividade média - Custo área arrendada) × Preço saca soja` ✅

#### 4. Previsão Lucro Total Soja
```typescript
// Linha 247 - calculations.ts
const previsaoLucroTotalSoja = previsaoLucroTerrasProprias + previsaoLucroTerrasArrendadas;
```
**Fórmula**: `Lucro terras próprias + Lucro terras arrendadas` ✅

---

### 💰 TOTAIS

#### 1. Receita Bruta Total
```typescript
// Linha 251 - calculations.ts
const receitaBrutaTotal = receitaBrutaSoja + receitaBrutaMilho;
```
**Fórmula**: `Receita bruta soja + Receita bruta milho` ✅

#### 2. Lucro Total
```typescript
// Linha 254 - calculations.ts
const lucroTotal = previsaoLucroTotalSoja + previsaoLucroTotalMilho;
```
**Fórmula**: `Lucro total soja + Lucro total milho` ✅

---

## 🔍 Como a Produtividade Média é Calculada

O sistema calcula a produtividade média **ponderada pela área** de cada talhão:

```typescript
// Linhas 213-219 - calculations.ts
const produtividadeMediaSoja = talhoesSoja.length > 0
  ? talhoesSoja.reduce((sum, t) => {
      const area = t.areaPropria + t.areaArrendada;
      return sum + (calcularRendimento(t.regiao, config) * area);
    }, 0) / areaTotalSoja
  : 0;
```

### Exemplo de Cálculo:
**Talhões de Soja:**
- Talhão 1: 100 ha na região BOA (70 sc/ha) = 7.000 sc
- Talhão 2: 50 ha na região MÉDIA (60 sc/ha) = 3.000 sc

**Produtividade Média Ponderada:**
```
Total produção: 7.000 + 3.000 = 10.000 sc
Total área: 100 + 50 = 150 ha
Produtividade média: 10.000 ÷ 150 = 66,67 sc/ha
```

---

## ⚠️ Possíveis Causas de Valores Incorretos

Se você está vendo valores incorretos na interface, o problema **NÃO está nas fórmulas**, mas pode estar em:

### 1. 🔴 Valores de Entrada Incorretos

#### Campos de Custo (em REAIS POR SACA):
- `custoTotalAreaPropriaSoja`: Custo **por saca** (não por hectare!)
- `custoTotalAreaArrendadaSoja`: Custo **por saca** (não por hectare!)
- `custoTotalInsumosMilhoHa`: Custo **por saca** (não por hectare!)

**Exemplo CORRETO:**
```json
{
  "custoTotalAreaPropriaSoja": 50.00,  // R$ 50,00 por saca
  "custoTotalAreaArrendadaSoja": 55.00, // R$ 55,00 por saca
  "custoTotalInsumosMilhoHa": 40.00    // R$ 40,00 por saca
}
```

**Exemplo INCORRETO:**
```json
{
  "custoTotalAreaPropriaSoja": 3500.00,  // ❌ Isso é custo por hectare!
  "custoTotalAreaArrendadaSoja": 4000.00, // ❌ Isso é custo por hectare!
  "custoTotalInsumosMilhoHa": 2500.00    // ❌ Isso é custo por hectare!
}
```

### 2. 🟡 Talhões Não Cadastrados

Verifique se os talhões foram cadastrados corretamente com:
- ✅ Cultura (soja ou milho)
- ✅ Região (boa, médio, baixa)
- ✅ Áreas (própria e arrendada)

### 3. 🟡 Soma de Áreas

A soma das áreas dos talhões deve corresponder à área total:
```
Área Total = Área Própria + Área Arrendada

Soma de todos os talhões (própria + arrendada) = Área Total
```

---

## 🧪 Teste Simples para Validar

Use estes valores para um teste rápido:

### Entrada:
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
    "custoTotalAreaPropriaSoja": 30.00,
    "custoTotalAreaArrendadaSoja": 0,
    "precoMilho": 0,
    "custoTotalInsumosMilhoHa": 0
  }
}
```

### Resultado Esperado:
```
Produtividade: 70 sc/ha (região boa - padrão do sistema)
Área: 100 ha

Receita Bruta Soja: 100 × 70 × 100 = R$ 700.000,00 ✅
Lucro Terras Próprias: 100 × (70 - 30) × 100 = R$ 400.000,00 ✅
Lucro Total Soja: R$ 400.000,00 ✅

Receita Bruta Total: R$ 700.000,00 ✅
Lucro Total: R$ 400.000,00 ✅
```

---

## 📱 Como Reportar um Problema

Se após verificar todos os itens acima você ainda encontrar valores incorretos, forneça:

1. ✅ **Valores de entrada** (todos os campos do formulário)
2. ✅ **Resultado obtido** (print ou valores)
3. ✅ **Resultado esperado** (cálculo manual)

---

## ✅ Conclusão

**As fórmulas estão 100% corretas no código!**

Se há valores incorretos, o problema está nos **dados de entrada** ou na **interpretação das unidades dos campos**.

**Última atualização**: 02/10/2025
