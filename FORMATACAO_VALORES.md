# 💰 Formatação de Valores em Reais - AgriCredit

## Padrão Brasileiro de Formatação

Todos os valores monetários no sistema AgriCredit seguem o **padrão brasileiro oficial** de formatação:

### 📊 Regras de Formatação

#### Valores Monetários (R$)
- **Símbolo**: R$ (Real Brasileiro)
- **Separador de milhares**: `.` (ponto)
- **Separador decimal**: `,` (vírgula)
- **Casas decimais**: Sempre 2 casas

#### Exemplos de Formatação

| Valor Numérico | Formatação Exibida |
|----------------|-------------------|
| 100 | R$ 100,00 |
| 1000 | R$ 1.000,00 |
| 10000 | R$ 10.000,00 |
| 100000 | R$ 100.000,00 |
| 1000000 | R$ 1.000.000,00 |
| 1234.56 | R$ 1.234,56 |
| 50.50 | R$ 50,50 |

### 🎯 Onde a Formatação é Aplicada

#### 1. Formulário de Análise
- Preço Saca de Soja (R$/sc)
- Preço Saca de Milho (R$/sc)
- Custo Total Área Própria (R$)
- Custo Total Área Arrendada (R$)
- Custo Total Insumos (R$)
- Custo Custeio (R$/ha)
- Previsão Custeio Anual (R$)
- Investimento Total (R$)
- Arrendamento por Hectare (R$/ha)
- Valor de Dívidas (R$)

#### 2. Resultados da Análise
- Receita Bruta Total
- Custo Total
- Custo Área Própria
- Custo Área Arrendada
- Lucro Total
- Lucro Área Própria
- Lucro Área Arrendada

#### 3. Exportação PDF
Todos os valores monetários no PDF exportado seguem o mesmo padrão.

#### 4. Histórico de Análises
Valores de receita e lucro nas análises salvas.

### 🔧 Implementação Técnica

#### Função Principal: `formatCurrency()`

```typescript
// Localização: src/utils/formatters.ts
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
```

#### Uso nos Componentes

```typescript
// Exemplo de uso
const valor = 10000;
const valorFormatado = formatCurrency(valor);
// Resultado: "R$ 10.000,00"
```

### ✅ Consistência Garantida

Todos os componentes que exibem valores monetários usam a mesma configuração:

- ✅ **ResultTable.tsx** - Tabela de resultados
- ✅ **ResultadosView.tsx** - Visualização de resultados
- ✅ **ExportPdfButton.tsx** - Exportação PDF
- ✅ **historico/page.tsx** - Página de histórico
- ✅ **formatters.ts** - Utilitário centralizado

### 🌍 Locale: pt-BR

O sistema usa o locale `pt-BR` (Português do Brasil) para todas as formatações numéricas, garantindo:

- Separadores corretos (. para milhares, , para decimais)
- Símbolo da moeda correto (R$)
- Posicionamento adequado do símbolo
- Casas decimais obrigatórias

### 📝 Observações Importantes

1. **Entrada de Dados**: Os usuários digitam valores e o sistema formata automaticamente enquanto digitam
2. **Armazenamento**: Valores são armazenados como números (sem formatação)
3. **Exibição**: Valores são formatados apenas para exibição
4. **Cálculos**: Todos os cálculos usam valores numéricos puros
5. **Conversão**: Função `parseNumberInput()` converte texto formatado de volta para número

### 🎨 Exemplos de Uso no Sistema

#### Entrada Manual:
```
Usuário digita: 10000
Sistema exibe: 10.000
Ao salvar: 10000
```

#### Exibição nos Resultados:
```
Valor calculado: 150000.50
Sistema exibe: R$ 150.000,50
```

#### No PDF:
```
Receita Bruta Total: R$ 700.000,00
Custo Total: R$ 600.000,00
Lucro Total: R$ 100.000,00
```

---

**Desenvolvido com 💚 para o AgriCredit**
