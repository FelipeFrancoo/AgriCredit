# 📊 TODAS AS FÓRMULAS DE CÁLCULO - SISTEMA AGRICREDIT

## 📋 Índice
1. [Dados de Entrada](#dados-de-entrada)
2. [Constantes e Configurações](#constantes-e-configurações)
3. [Cálculos de Área](#cálculos-de-área)
4. [Produtividade e Rendimento](#produtividade-e-rendimento)
5. [Receitas - MILHO](#receitas---milho)
6. [Receitas e Lucros - SOJA](#receitas-e-lucros---soja)
7. [Receitas e Lucros - TOTAIS](#receitas-e-lucros---totais)
8. [Dívidas](#dívidas)
9. [Indicadores de Crédito](#indicadores-de-crédito)
10. [Parecer Final](#parecer-final)
11. [Fluxograma Completo](#fluxograma-completo)

---

## 1️⃣ DADOS DE ENTRADA

### 1.1 Propriedade
```
✅ Nome do Proprietário
✅ CPF
✅ Área Própria (ha)
✅ Área Arrendada (ha)
✅ Talhões (lista com detalhes de cada talhão)
```

### 1.2 Cada Talhão contém:
```
✅ Área Própria do Talhão (ha)
✅ Área Arrendada do Talhão (ha)
✅ Cultura (soja ou milho)
✅ Região (boa, média ou baixa)
```

### 1.3 Custos e Preços - SOJA
```
✅ Preço da Saca de Soja (R$)
✅ Custo Total Área Própria Soja (sc/ha)
✅ Custo Total Área Arrendada Soja (sc/ha)
```

### 1.4 Custos e Preços - MILHO
```
✅ Preço da Saca de Milho (R$)
✅ Custo Total Insumos Milho (sc/ha)
```

### 1.5 Outros Custos
```
✅ Investimento Total (R$)
✅ Arrendamento por Hectare (R$/ha)
✅ Outras Receitas (R$)
```

### 1.6 Dívidas SISBACEN
```
✅ Valor Menos de 1 ano (R$)
✅ Valor 1 a 5 anos (R$)
✅ Dívidas/Protestos (R$)
```

---

## 2️⃣ CONSTANTES E CONFIGURAÇÕES

### 2.1 Produtividade por Região - SOJA
```
Região BOA    = 70 sc/ha
Região MÉDIA  = 60 sc/ha
Região BAIXA  = 50 sc/ha
```

### 2.2 Produtividade por Região - MILHO
```
Região BOA    = 120 sc/ha
Região MÉDIA  = 100 sc/ha
Região BAIXA  = 80 sc/ha
```

### 2.3 Thresholds dos Indicadores
```
APROVADO  : < 50% (0.5)
ATENÇÃO   : 50% - 70% (0.5 - 0.7)
REPROVADO : > 70% (0.7)
```

---

## 3️⃣ CÁLCULOS DE ÁREA

### 3.1 Área Total Plantada
```typescript
Área Total Plantada = Área Própria + Área Arrendada
```

**Exemplo:**
```
Área Própria: 100 ha
Área Arrendada: 50 ha
Área Total Plantada = 100 + 50 = 150 ha
```

### 3.2 Área Total por Cultura
```typescript
// Para cada cultura (soja/milho):
Área Total da Cultura = Σ (Área Própria do Talhão + Área Arrendada do Talhão)
                        onde Talhão.cultura == cultura desejada
```

**Exemplo:**
```
Talhão 1: 80 ha própria + 30 ha arrendada (soja) = 110 ha
Talhão 2: 20 ha própria + 20 ha arrendada (milho) = 40 ha

Área Total Soja = 110 ha
Área Total Milho = 40 ha
```

### 3.3 Área Própria por Cultura
```typescript
Área Própria da Cultura = Σ (Área Própria do Talhão)
                          onde Talhão.cultura == cultura desejada
```

### 3.4 Área Arrendada por Cultura
```typescript
Área Arrendada da Cultura = Σ (Área Arrendada do Talhão)
                            onde Talhão.cultura == cultura desejada
```

---

## 4️⃣ PRODUTIVIDADE E RENDIMENTO

### 4.1 Produtividade Média por Cultura
```typescript
Produtividade Média = Σ (Rendimento da Região × Área do Talhão) / Área Total da Cultura

Onde:
- Rendimento da Região: valor fixo por região (boa/média/baixa)
- Área do Talhão: área própria + área arrendada do talhão
- Soma todos os talhões da mesma cultura
```

**Exemplo SOJA:**
```
Talhão 1: 110 ha, Região Boa (70 sc/ha)
Talhão 2: 40 ha, Região Média (60 sc/ha)

Produtividade Média Soja = (70 × 110 + 60 × 40) / (110 + 40)
                         = (7.700 + 2.400) / 150
                         = 10.100 / 150
                         = 67,33 sc/ha
```

**Exemplo MILHO:**
```
Talhão 1: 50 ha, Região Boa (120 sc/ha)
Talhão 2: 30 ha, Região Baixa (80 sc/ha)

Produtividade Média Milho = (120 × 50 + 80 × 30) / (50 + 30)
                          = (6.000 + 2.400) / 80
                          = 8.400 / 80
                          = 105 sc/ha
```

---

## 5️⃣ RECEITAS - MILHO 🌽

### 5.1 Receita Bruta do Milho
```typescript
Receita Bruta Milho = Produtividade Média Milho × Área Total Milho × Preço Saca Milho
```

**Exemplo:**
```
Produtividade Média: 105 sc/ha
Área Total Milho: 80 ha
Preço Saca: R$ 80,00

Receita Bruta Milho = 105 × 80 × 80
                    = 8.400 × 80
                    = R$ 672.000,00
```

### 5.2 Previsão de Lucro Total do Milho
```typescript
Previsão Lucro Total Milho = Área Total Milho × 
                             (Produtividade Média Milho - Custo Total Insumos Milho) × 
                             Preço Saca Milho
```

**Exemplo:**
```
Área Total: 80 ha
Produtividade Média: 105 sc/ha
Custo Insumos: 30 sc/ha
Preço Saca: R$ 80,00

Previsão Lucro = 80 × (105 - 30) × 80
               = 80 × 75 × 80
               = R$ 480.000,00
```

---

## 6️⃣ RECEITAS E LUCROS - SOJA 🌱

### 6.1 Receita Bruta da Soja
```typescript
Receita Bruta Soja = Área Total Soja × Produtividade Média Soja × Preço Saca Soja
```

**Exemplo:**
```
Área Total: 150 ha
Produtividade Média: 67,33 sc/ha
Preço Saca: R$ 150,00

Receita Bruta Soja = 150 × 67,33 × 150
                   = 10.099,5 × 150
                   = R$ 1.514.925,00
```

### 6.2 Previsão Lucro Terras Próprias (Soja)
```typescript
Previsão Lucro Terras Próprias = Área Própria Soja × 
                                 (Produtividade Média Soja - Custo Área Própria) × 
                                 Preço Saca Soja
```

**Exemplo:**
```
Área Própria: 100 ha
Produtividade Média: 67,33 sc/ha
Custo Área Própria: 40 sc/ha
Preço Saca: R$ 150,00

Previsão Lucro Próprias = 100 × (67,33 - 40) × 150
                        = 100 × 27,33 × 150
                        = R$ 409.950,00
```

### 6.3 Previsão Lucro Terras Arrendadas (Soja)
```typescript
Previsão Lucro Terras Arrendadas = Área Arrendada Soja × 
                                   (Produtividade Média Soja - Custo Área Arrendada) × 
                                   Preço Saca Soja
```

**Exemplo:**
```
Área Arrendada: 50 ha
Produtividade Média: 67,33 sc/ha
Custo Área Arrendada: 45 sc/ha
Preço Saca: R$ 150,00

Previsão Lucro Arrendadas = 50 × (67,33 - 45) × 150
                          = 50 × 22,33 × 150
                          = R$ 167.475,00
```

### 6.4 Previsão Lucro Total Soja
```typescript
Previsão Lucro Total Soja = Previsão Lucro Terras Próprias + Previsão Lucro Terras Arrendadas
```

**Exemplo:**
```
Lucro Próprias: R$ 409.950,00
Lucro Arrendadas: R$ 167.475,00

Previsão Lucro Total Soja = 409.950 + 167.475
                          = R$ 577.425,00
```

---

## 7️⃣ RECEITAS E LUCROS - TOTAIS 💰

### 7.1 Receita Bruta Total
```typescript
Receita Bruta Total = Receita Bruta Soja + Receita Bruta Milho
```

**Exemplo:**
```
Receita Soja: R$ 1.514.925,00
Receita Milho: R$ 672.000,00

Receita Bruta Total = 1.514.925 + 672.000
                    = R$ 2.186.925,00
```

### 7.2 Previsão de Lucro de Outras Receitas (NOVO!)
```typescript
Previsão Lucro Outras Receitas = Outras Receitas × 0.2
```

**Explicação:** Aplica-se uma margem de lucro de 20% sobre outras receitas (venda de animais, aluguel de máquinas, etc.)

**Exemplo:**
```
Outras Receitas: R$ 100.000,00

Previsão Lucro Outras Receitas = 100.000 × 0.2
                                = R$ 20.000,00
```

### 7.3 Lucro Total (FÓRMULA ATUALIZADA!)
```typescript
Lucro Total = Previsão Lucro Total Soja + 
              Previsão Lucro Total Milho + 
              Previsão Lucro Outras Receitas
```

**Exemplo:**
```
Lucro Soja: R$ 577.425,00
Lucro Milho: R$ 480.000,00
Lucro Outras Receitas: R$ 20.000,00

Lucro Total = 577.425 + 480.000 + 20.000
            = R$ 1.077.425,00
```

---

## 8️⃣ DÍVIDAS 📊

### 8.1 Previsão de Custeio Anual
```typescript
Previsão Custeio Anual = Sisbacen Menos de 1 ano
```

**Exemplo:**
```
Sisbacen Menos 1 ano: R$ 200.000,00

Previsão Custeio Anual = R$ 200.000,00
```

### 8.2 Previsão de Investimento Anual
```typescript
Previsão Investimento Anual = Sisbacen 1 a 5 anos / 5
```

**Explicação:** Divide as dívidas de médio prazo em 5 anos

**Exemplo:**
```
Sisbacen 1 a 5 anos: R$ 500.000,00

Previsão Investimento Anual = 500.000 / 5
                            = R$ 100.000,00
```

### 8.3 Dívida Total Anual
```typescript
Dívida Total Anual = Previsão Custeio Anual + Previsão Investimento Anual
```

**Exemplo:**
```
Previsão Custeio: R$ 200.000,00
Previsão Investimento: R$ 100.000,00

Dívida Total Anual = 200.000 + 100.000
                   = R$ 300.000,00
```

---

## 9️⃣ INDICADORES DE CRÉDITO 📈

### 9.1 Indicador de Custeio (FÓRMULA ATUALIZADA!)
```typescript
Indicador Custeio = (Sisbacen Menos 1 ano + Dívidas Vencidas) / Receita Bruta Total
```

**Explicação:** Mede a capacidade de pagamento de dívidas de curto prazo e vencidas em relação à receita

**Exemplo:**
```
Sisbacen Menos 1 ano: R$ 200.000,00
Dívidas Vencidas: R$ 50.000,00
Receita Bruta Total: R$ 2.186.925,00

Indicador Custeio = (200.000 + 50.000) / 2.186.925
                  = 250.000 / 2.186.925
                  = 0.1143 ou 11.43%
```

**Interpretação:**
```
✅ < 50%    → APROVADO (Verde)
⚠️  50-70%  → ATENÇÃO (Amarelo)
❌ > 70%    → REPROVADO (Vermelho)
```

### 9.2 Indicador de Investimento
```typescript
Indicador Investimento = Previsão Investimento Anual / Lucro Total
```

**Explicação:** Mede se o lucro é suficiente para cobrir os investimentos anuais

**Exemplo:**
```
Previsão Investimento: R$ 100.000,00
Lucro Total: R$ 1.077.425,00

Indicador Investimento = 100.000 / 1.077.425
                       = 0.0928 ou 9.28%
```

**Interpretação:**
```
✅ < 50%    → APROVADO (Verde)
⚠️  50-70%  → ATENÇÃO (Amarelo)
❌ > 70%    → REPROVADO (Vermelho)
```

---

## 🔟 PARECER FINAL 🎯

### 10.1 Regras de Decisão

#### Parecer Individual (Custeio e Investimento)
```typescript
SE Indicador < 50% (0.5)
   ENTÃO Parecer = APROVADO ✅

SE Indicador >= 50% E Indicador <= 70% (0.5 - 0.7)
   ENTÃO Parecer = ATENÇÃO ⚠️

SE Indicador > 70% (0.7)
   ENTÃO Parecer = REPROVADO ❌
```

#### Parecer Final Combinado
```typescript
SE (Parecer Custeio == REPROVADO) OU (Parecer Investimento == REPROVADO)
   ENTÃO Parecer Final = REPROVADO ❌

SENÃO SE (Parecer Custeio == ATENÇÃO) OU (Parecer Investimento == ATENÇÃO)
   ENTÃO Parecer Final = ATENÇÃO ⚠️

SENÃO
   Parecer Final = APROVADO ✅
```

**Tabela de Decisão:**

| Custeio | Investimento | Final |
|---------|--------------|-------|
| ✅ Aprovado | ✅ Aprovado | ✅ **APROVADO** |
| ✅ Aprovado | ⚠️ Atenção | ⚠️ **ATENÇÃO** |
| ✅ Aprovado | ❌ Reprovado | ❌ **REPROVADO** |
| ⚠️ Atenção | ✅ Aprovado | ⚠️ **ATENÇÃO** |
| ⚠️ Atenção | ⚠️ Atenção | ⚠️ **ATENÇÃO** |
| ⚠️ Atenção | ❌ Reprovado | ❌ **REPROVADO** |
| ❌ Reprovado | ✅ Aprovado | ❌ **REPROVADO** |
| ❌ Reprovado | ⚠️ Atenção | ❌ **REPROVADO** |
| ❌ Reprovado | ❌ Reprovado | ❌ **REPROVADO** |

---

## 1️⃣1️⃣ FLUXOGRAMA COMPLETO DO CÁLCULO

```
ENTRADA DE DADOS
    ↓
┌───────────────────────────────────────────┐
│ 1. PROCESSAMENTO DE TALHÕES              │
├───────────────────────────────────────────┤
│ • Separar talhões por cultura            │
│ • Calcular áreas totais por cultura      │
│ • Calcular produtividade média ponderada │
└───────────────────────────────────────────┘
    ↓
┌───────────────────────────────────────────┐
│ 2. CÁLCULOS DO MILHO 🌽                   │
├───────────────────────────────────────────┤
│ • Receita Bruta Milho                    │
│ • Previsão Lucro Total Milho             │
└───────────────────────────────────────────┘
    ↓
┌───────────────────────────────────────────┐
│ 3. CÁLCULOS DA SOJA 🌱                    │
├───────────────────────────────────────────┤
│ • Receita Bruta Soja                     │
│ • Previsão Lucro Terras Próprias         │
│ • Previsão Lucro Terras Arrendadas       │
│ • Previsão Lucro Total Soja              │
└───────────────────────────────────────────┘
    ↓
┌───────────────────────────────────────────┐
│ 4. CÁLCULOS TOTAIS 💰                     │
├───────────────────────────────────────────┤
│ • Receita Bruta Total                    │
│ • Previsão Lucro Outras Receitas         │
│ • Lucro Total                            │
└───────────────────────────────────────────┘
    ↓
┌───────────────────────────────────────────┐
│ 5. ANÁLISE DE DÍVIDAS 📊                  │
├───────────────────────────────────────────┤
│ • Previsão Custeio Anual                 │
│ • Previsão Investimento Anual            │
│ • Dívida Total Anual                     │
└───────────────────────────────────────────┘
    ↓
┌───────────────────────────────────────────┐
│ 6. INDICADORES 📈                         │
├───────────────────────────────────────────┤
│ • Indicador de Custeio                   │
│ • Indicador de Investimento              │
└───────────────────────────────────────────┘
    ↓
┌───────────────────────────────────────────┐
│ 7. PARECERES                              │
├───────────────────────────────────────────┤
│ • Parecer Custeio                        │
│ • Parecer Investimento                   │
│ • Parecer Final                          │
└───────────────────────────────────────────┘
    ↓
RESULTADO FINAL
```

---

## 📝 EXEMPLO COMPLETO PASSO A PASSO

### Dados de Entrada:
```
PROPRIEDADE:
- Nome: João Silva
- CPF: 123.456.789-00
- Área Própria: 100 ha
- Área Arrendada: 50 ha

TALHÕES:
1. Talhão 1: 80 ha própria + 30 ha arrendada = 110 ha, Soja, Região Boa
2. Talhão 2: 20 ha própria + 20 ha arrendada = 40 ha, Milho, Região Média

CUSTOS SOJA:
- Preço Saca: R$ 150,00
- Custo Área Própria: 40 sc/ha
- Custo Área Arrendada: 45 sc/ha

CUSTOS MILHO:
- Preço Saca: R$ 80,00
- Custo Insumos: 30 sc/ha

OUTROS:
- Investimento Total: R$ 50.000,00
- Arrendamento: R$ 1.500,00/ha
- Outras Receitas: R$ 100.000,00

DÍVIDAS:
- Menos de 1 ano: R$ 200.000,00
- 1 a 5 anos: R$ 500.000,00
- Dívidas/Protestos: R$ 50.000,00
```

### Cálculos:

#### 1. Áreas
```
Área Total Plantada = 100 + 50 = 150 ha
Área Total Soja = 110 ha
Área Total Milho = 40 ha
Área Própria Soja = 80 ha
Área Arrendada Soja = 30 ha
```

#### 2. Produtividade Média
```
Produtividade Média Soja = (70 × 110) / 110 = 70 sc/ha
Produtividade Média Milho = (100 × 40) / 40 = 100 sc/ha
```

#### 3. Milho 🌽
```
Receita Bruta Milho = 100 × 40 × 80 = R$ 320.000,00
Previsão Lucro Milho = 40 × (100 - 30) × 80 = R$ 224.000,00
```

#### 4. Soja 🌱
```
Receita Bruta Soja = 110 × 70 × 150 = R$ 1.155.000,00
Lucro Terras Próprias = 80 × (70 - 40) × 150 = R$ 360.000,00
Lucro Terras Arrendadas = 30 × (70 - 45) × 150 = R$ 112.500,00
Previsão Lucro Total Soja = 360.000 + 112.500 = R$ 472.500,00
```

#### 5. Totais 💰
```
Receita Bruta Total = 1.155.000 + 320.000 = R$ 1.475.000,00
Lucro Outras Receitas = 100.000 × 0.2 = R$ 20.000,00
Lucro Total = 472.500 + 224.000 + 20.000 = R$ 716.500,00
```

#### 6. Dívidas 📊
```
Previsão Custeio Anual = R$ 200.000,00
Previsão Investimento Anual = 500.000 / 5 = R$ 100.000,00
Dívida Total Anual = 200.000 + 100.000 = R$ 300.000,00
```

#### 7. Indicadores 📈
```
Indicador Custeio = (200.000 + 50.000) / 1.475.000 = 0.1695 = 16.95%
Parecer Custeio = APROVADO ✅ (< 50%)

Indicador Investimento = 100.000 / 716.500 = 0.1395 = 13.95%
Parecer Investimento = APROVADO ✅ (< 50%)
```

#### 8. Parecer Final 🎯
```
Ambos indicadores APROVADOS
Parecer Final = APROVADO ✅
```

---

## 🔄 RESUMO DAS FÓRMULAS PRINCIPAIS

| # | Métrica | Fórmula |
|---|---------|---------|
| 1 | **Área Total Plantada** | `Área Própria + Área Arrendada` |
| 2 | **Produtividade Média** | `Σ(Rendimento × Área) / Área Total` |
| 3 | **Receita Bruta Milho** | `Produtividade × Área × Preço` |
| 4 | **Lucro Milho** | `Área × (Produtividade - Custo) × Preço` |
| 5 | **Receita Bruta Soja** | `Área × Produtividade × Preço` |
| 6 | **Lucro Terras Próprias** | `Área × (Produtividade - Custo) × Preço` |
| 7 | **Lucro Terras Arrendadas** | `Área × (Produtividade - Custo) × Preço` |
| 8 | **Lucro Total Soja** | `Lucro Próprias + Lucro Arrendadas` |
| 9 | **Receita Total** | `Receita Soja + Receita Milho` |
| 10 | **Lucro Outras Receitas** | `Outras Receitas × 0.2` |
| 11 | **Lucro Total** | `Lucro Soja + Lucro Milho + Lucro Outras` |
| 12 | **Previsão Custeio** | `Sisbacen Menos 1 ano` |
| 13 | **Previsão Investimento** | `Sisbacen 1 a 5 anos / 5` |
| 14 | **Dívida Total Anual** | `Custeio + Investimento` |
| 15 | **Indicador Custeio** | `(Custeio + Dívidas Vencidas) / Receita Total` |
| 16 | **Indicador Investimento** | `Investimento / Lucro Total` |

---

## 🎯 MUDANÇAS RECENTES (v2.0)

### ✅ Indicador de Custeio
**Antes:**
```
Indicador Custeio = Sisbacen Menos 1 ano / Receita
```

**Agora:**
```
Indicador Custeio = (Sisbacen Menos 1 ano + Dívidas Vencidas) / Receita
```

### ✅ Lucro Total
**Antes:**
```
Lucro Total = Lucro Soja + Lucro Milho
```

**Agora:**
```
Lucro Total = Lucro Soja + Lucro Milho + (Outras Receitas × 0.2)
```

---

## 📚 OBSERVAÇÕES IMPORTANTES

1. **Produtividade por Região:**
   - Os valores são médias históricas
   - Podem ser ajustados em `src/config/defaults.ts`

2. **Margem de Outras Receitas:**
   - Fixada em 20% (0.2)
   - Representa lucro líquido estimado
   - Pode ser ajustada conforme necessário

3. **Dívidas Vencidas:**
   - Incluídas no Indicador de Custeio
   - Torna a análise mais conservadora
   - Reflete melhor o risco real

4. **Thresholds:**
   - Podem ser personalizados por instituição
   - Valores padrão: 50% (aprovado) e 70% (reprovado)

5. **Custos em Sacas:**
   - Soja: custos em sc/ha
   - Milho: custos em sc/ha
   - Convertidos automaticamente para R$ nos cálculos

---

**Desenvolvido para AgriCredit**  
**Sistema de Análise de Crédito Agrícola**  
**Versão 2.0 - Outubro 2025**
