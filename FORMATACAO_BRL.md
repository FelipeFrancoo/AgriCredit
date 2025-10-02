# Formatação de Valores em R$ (BRL) - AgriCredit

## ✅ Alterações Implementadas

### 📝 Campos Atualizados com Formatação R$ (BRL)

Todos os campos que envolvem valores monetários agora exibem automaticamente o prefixo **R$** e formatação brasileira.

#### 🌱 Seção SOJA:
1. **Preço Saca de Soja**
   - Label: `Preço Saca de Soja *`
   - Formato: `R$ 0,00`
   - Exemplo: `R$ 130,00`

2. **Custo Total Área Própria**
   - Label: `Custo Total Área Própria (por saca) *`
   - Formato: `R$ 0,00`
   - Exemplo: `R$ 50,00`

3. **Custo Total Área Arrendada**
   - Label: `Custo Total Área Arrendada (por saca) *`
   - Formato: `R$ 0,00`
   - Exemplo: `R$ 55,00`

#### 🌽 Seção MILHO:
1. **Preço Saca de Milho**
   - Label: `Preço Saca de Milho *`
   - Formato: `R$ 0,00`
   - Exemplo: `R$ 85,00`

2. **Custo Total Insumos**
   - Label: `Custo Total Insumos (por saca) *`
   - Formato: `R$ 0,00`
   - Exemplo: `R$ 40,00`

3. **Custo Custeio**
   - Label: `Custo Custeio (por hectare) *`
   - Formato: `R$ 0,00`
   - Exemplo: `R$ 6.200,00`

4. **Previsão Custeio Anual**
   - Label: `Previsão Custeio Anual *`
   - Formato: `R$ 0,00`
   - Exemplo: `R$ 800.000,00`

#### 💰 Seção DÍVIDAS (já estava formatado):
1. **Valor com vencimento em menos de 1 ano**
   - Formato: `R$ 0,00`

2. **Valor com vencimento de 1 a 5 anos**
   - Formato: `R$ 0,00`

3. **Dívidas de Protestos**
   - Formato: `R$ 0,00`

---

## 🎨 Formatação Aplicada

### Entrada de Dados:
- ✅ Prefixo **R$** exibido automaticamente
- ✅ Separador de milhares com ponto (`.`)
- ✅ Separador decimal com vírgula (`,`)
- ✅ Limitado a 2 casas decimais

### Exemplos de Formatação:
```
Digitado:    130      → Exibido: R$ 130
Digitado:    13050    → Exibido: R$ 13.050
Digitado:    130,5    → Exibido: R$ 130,50
Digitado:    130,50   → Exibido: R$ 130,50
Digitado:    1500000  → Exibido: R$ 1.500.000
```

---

## 📊 Tooltips Atualizados

### Seção Custos/Preços:
```
💡 Os valores monetários são formatados automaticamente em R$ 
   (ex: 10000 → R$ 10.000,00)
```

### Seção Dívidas:
```
💡 Os valores monetários são formatados automaticamente em R$ 
   (ex: 100000 → R$ 100.000,00)
```

---

## 🔧 Funcionamento Técnico

### Processamento do Input:
1. **Entrada do usuário**: O valor é digitado normalmente
2. **Remoção do prefixo**: Remove `R$` temporariamente para processar
3. **Formatação**: Aplica separadores de milhares e decimais
4. **Exibição**: Adiciona `R$` de volta e exibe formatado
5. **Armazenamento**: Salva o valor numérico internamente

### Código de Formatação:
```typescript
value={field.value ? `R$ ${formatNumberInput(field.value)}` : ''}
onChange={(e) => {
  const withoutPrefix = e.target.value.replace(/^R\$\s*/, '');
  const formatted = formatNumberInput(withoutPrefix);
  field.onChange(formatted);
}}
placeholder="R$ 0,00"
```

---

## ✅ Benefícios

1. **✨ Melhor UX**: Usuário vê imediatamente que o valor é monetário
2. **📱 Padrão Brasileiro**: Formatação familiar para usuários brasileiros
3. **🚫 Menos Erros**: Reduz confusão sobre unidades monetárias
4. **👁️ Clareza Visual**: Facilita leitura de valores grandes
5. **💯 Profissionalismo**: Interface mais polida e profissional

---

## 📋 Checklist de Campos com R$

- ✅ Preço Saca de Soja
- ✅ Custo Total Área Própria Soja
- ✅ Custo Total Área Arrendada Soja
- ✅ Preço Saca de Milho
- ✅ Custo Total Insumos Milho
- ✅ Custo Custeio (por hectare)
- ✅ Previsão Custeio Anual
- ✅ Valor Dívidas < 1 ano
- ✅ Valor Dívidas 1-5 anos
- ✅ Dívidas de Protestos

---

## 🧪 Como Testar

1. Acesse a aplicação
2. Vá para a seção "Custos/Preços"
3. Digite valores nos campos
4. Verifique se o prefixo `R$` aparece automaticamente
5. Confirme a formatação com separadores corretos

### Exemplo de Teste:
```
Campo: Preço Saca de Soja
Digite: 13050
Resultado Esperado: R$ 13.050 ou R$ 130,50 (dependendo se tem vírgula)
```

---

**Data de Implementação**: 02/10/2025  
**Versão**: 1.0  
**Status**: ✅ Concluído
