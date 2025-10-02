# Guia de Início Rápido - AgriCredit

## 🎯 Primeiros Passos

### 1. Instalação

```bash
# Clone o projeto
git clone <url>
cd agricredit

# Instale as dependências
npm install

# Inicie o servidor
npm run dev
```

### 2. Primeira Análise

1. Acesse http://localhost:3000
2. Preencha os dados da propriedade:
   - Área própria: 100 ha
   - Área arrendada: 0 ha
3. Adicione um talhão:
   - Área: 100 ha
   - Cultura: Soja
   - Região: Boa
4. Preencha custos:
   - Preço por saca: R$ 100,00
   - Custeio por ha: R$ 5.000,00
   - Investimento total: R$ 50.000,00
5. Dívidas:
   - Menos de 1 ano: R$ 100.000,00
6. Clique em "Calcular Análise"

### 3. Interpretar Resultados

#### Indicadores
- **Verde (Aprovado)**: Crédito pode ser concedido
- **Amarelo (Atenção)**: Requer análise adicional
- **Vermelho (Reprovado)**: Alto risco

#### Métricas Principais
- **Receita Bruta**: Total de vendas esperadas
- **Lucro Total**: Receita - Custos
- **Indicador Custeio**: Dívida CP / Receita
- **Indicador Investimento**: Investimento / Lucro

## 📊 Cenários de Teste

### Cenário 1: Aprovação Total ✅

```
Propriedade:
- Área própria: 200 ha
- Talhões: 200 ha soja região boa

Custos:
- Preço/saca: R$ 120
- Custeio/ha: R$ 4.500
- Investimento: R$ 200.000

Dívidas:
- < 1 ano: R$ 200.000
```

**Resultado Esperado**: APROVADO
- Receita: R$ 1.680.000
- Lucro: R$ 580.000
- Ind. Custeio: 11.9% ✅
- Ind. Investimento: 34.5% ✅

### Cenário 2: Atenção ⚠️

```
Propriedade:
- Área própria: 100 ha
- Área arrendada: 50 ha
- Talhões: 150 ha milho região médio

Custos:
- Preço/saca: R$ 80
- Custeio/ha: R$ 6.000
- Investimento: R$ 300.000
- Arrendamento/ha: R$ 2.500

Dívidas:
- < 1 ano: R$ 250.000
```

**Resultado Esperado**: ATENÇÃO
- Ind. Custeio: 34.7% ⚠️
- Ind. Investimento: 68.2% ⚠️

### Cenário 3: Reprovação ❌

```
Propriedade:
- Área própria: 50 ha
- Talhões: 50 ha soja região baixa

Custos:
- Preço/saca: R$ 90
- Custeio/ha: R$ 7.000
- Investimento: R$ 200.000

Dívidas:
- < 1 ano: R$ 300.000
```

**Resultado Esperado**: REPROVADO
- Ind. Custeio: 133.3% ❌ (muito alto)
- Lucro baixo para investimento

## 🔧 Personalização

### Alterar Rendimentos

Edite `src/config/defaults.ts`:

```typescript
export const defaultConfig: Config = {
  rendimentos: {
    boa: 75,    // Aumentado de 70
    medio: 65,  // Aumentado de 60
    baixa: 55,  // Aumentado de 50
  },
  // ...
};
```

### Ajustar Thresholds

```typescript
thresholds: {
  custeio: {
    aprovado: 0.25,  // Mudado de 0.2 (mais permissivo)
    atencao: 0.6,    // Mudado de 0.5
  },
  investimento: {
    aprovado: 0.6,   // Mudado de 0.5
    atencao: 0.8,    // Mudado de 0.7
  },
}
```

## 🧪 Testes

### Executar Testes Unitários

```bash
# Todos os testes
npm test

# Modo watch
npm run test:watch

# Com cobertura
npm test -- --coverage
```

### Exemplo de Teste

```typescript
it('deve calcular receita bruta corretamente', () => {
  expect(calcularReceitaBruta(1000, 80)).toBe(80000);
});
```

## 📱 Funcionalidades

### Exportar PDF
1. Complete uma análise
2. Clique em "Exportar PDF"
3. PDF será baixado automaticamente

### Salvar Histórico
1. Complete uma análise
2. Clique em "Salvar no Histórico"
3. Acesse "Ver Histórico" para visualizar

### Múltiplos Talhões
- Clique em "Adicionar Talhão"
- Configure cada área independentemente
- Sistema calcula automaticamente a produção total

## 🚨 Solução de Problemas

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Testes falhando
```bash
npm test -- --clearCache
npm test
```

### Servidor não inicia
```bash
# Verificar se porta 3000 está livre
netstat -ano | findstr :3000

# Usar porta diferente
npm run dev -- -p 3001
```

## 📚 Recursos Adicionais

- [Documentação Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [jsPDF](https://github.com/parallax/jsPDF)

## 💡 Dicas

1. **Sempre adicione pelo menos um talhão** antes de calcular
2. **Use valores realistas** para melhores resultados
3. **Salve análises importantes** no histórico
4. **Exporte PDFs** para documentação
5. **Teste diferentes cenários** para entender os limites

## 🎓 Próximos Passos

1. Explore a página de histórico
2. Teste diferentes combinações de culturas
3. Compare cenários com e sem arrendamento
4. Ajuste as configurações para sua região
5. Execute os testes para entender os cálculos
