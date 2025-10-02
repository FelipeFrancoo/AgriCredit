# Indicadores Corrigidos

## Fórmulas dos Indicadores

### Indicador de Custeio
**Fórmula:** `Sisbacen menos 1 ano / Receita bruta total`

### Indicador de Investimento
**Fórmula:** `Previsão de investimento anual / Lucro total`

## Critérios de Avaliação

Ambos os indicadores seguem a mesma regra de classificação:

| Resultado | Classificação | Cor | Status |
|-----------|---------------|-----|--------|
| **< 0,5** | ✅ Aprovado | 🟢 Verde | `aprovado` |
| **0,5 a 0,7** | ⚠️ Atenção | 🟡 Amarelo | `atencao` |
| **> 0,7** | ❌ Reprovado | 🔴 Vermelho | `reprovado` |

## Alterações Realizadas

### 1. Arquivo: `src/config/defaults.ts`
- ✅ Atualizado threshold `custeio.aprovado` de `0.2` para `0.5`
- ✅ Mantido threshold `custeio.atencao` em `0.7`
- ✅ Mantido threshold `investimento.aprovado` em `0.5`
- ✅ Mantido threshold `investimento.atencao` em `0.7`

### 2. Arquivo: `src/utils/calculations.ts`
- ✅ Atualizada documentação das funções `calcularIndicadorCusteio` e `calcularIndicadorInvestimento`
- ✅ Corrigida lógica da função `determinarParecerCusteio` (mudou de `<=` para `<` no primeiro threshold)
- ✅ Adicionada documentação clara dos critérios em ambas as funções de parecer

## Exemplos de Resultados

### Exemplo 1: Cliente Aprovado
```
Indicador de Custeio: 0.35 (< 0.5) → 🟢 Aprovado
Indicador de Investimento: 0.42 (< 0.5) → 🟢 Aprovado
Resultado Final: ✅ APROVADO
```

### Exemplo 2: Cliente em Atenção
```
Indicador de Custeio: 0.55 (0.5 a 0.7) → 🟡 Atenção
Indicador de Investimento: 0.45 (< 0.5) → 🟢 Aprovado
Resultado Final: ⚠️ ATENÇÃO
```

### Exemplo 3: Cliente Reprovado
```
Indicador de Custeio: 0.75 (> 0.7) → 🔴 Reprovado
Indicador de Investimento: 0.60 (0.5 a 0.7) → 🟡 Atenção
Resultado Final: ❌ REPROVADO
```

## Parecer Final

O parecer final é determinado pela **pior** classificação entre os dois indicadores:
- Se qualquer indicador estiver **Reprovado** → Resultado: **REPROVADO**
- Se qualquer indicador estiver em **Atenção** (e nenhum reprovado) → Resultado: **ATENÇÃO**
- Se ambos estiverem **Aprovados** → Resultado: **APROVADO**
