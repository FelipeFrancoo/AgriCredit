# AgriCredit - Sistema de Análise de Crédito Agrícola

Sistema completo de análise de crédito para propriedades agrícolas, desenvolvido com Next.js, React e Tailwind CSS.

## 🚀 Funcionalidades

### Core Features
- ✅ Formulário multi-etapas intuitivo (4 etapas)
- ✅ Gestão de múltiplos talhões/safras
- ✅ Cálculos financeiros precisos e automatizados
- ✅ Indicadores de crédito com semáforo (verde/amarelo/vermelho)
- ✅ Exportação de relatórios em PDF
- ✅ Histórico de análises (localStorage)
- ✅ Interface responsiva e moderna
- ✅ Testes unitários completos

### Cálculos Implementados

#### Rendimento por Região
- **Boa**: 70 sc/ha
- **Médio**: 60 sc/ha
- **Baixa**: 50 sc/ha

#### Indicadores de Crédito

**Indicador de Custeio** = Dívida Curto Prazo / Receita Bruta Total
- ≤ 20%: ✅ Aprovado (verde)
- 20-50%: ⚠️ Atenção (amarelo)
- \> 50%: ❌ Reprovado (vermelho)

**Indicador de Investimento** = Investimento Total / Lucro Total
- < 50%: ✅ Aprovado (verde)
- 50-70%: ⚠️ Atenção (amarelo)
- \> 70%: ❌ Reprovado (vermelho)

**Parecer Final**: Combinação dos dois indicadores (se qualquer métrica em vermelho = reprovado)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd agricredit

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

## 🛠️ Scripts Disponíveis

```bash
npm run dev        # Inicia o servidor de desenvolvimento
npm run build      # Cria build de produção
npm run start      # Inicia servidor de produção
npm run lint       # Executa o linter
npm test           # Executa os testes
npm run test:watch # Executa testes em modo watch
```

## 📁 Estrutura do Projeto

```
agricredit/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analise/
│   │   │       └── route.ts          # API endpoint para análise
│   │   ├── globals.css               # Estilos globais
│   │   ├── layout.tsx                # Layout principal
│   │   └── page.tsx                  # Página principal
│   ├── components/
│   │   ├── AnaliseForm.tsx           # Formulário multi-etapas
│   │   ├── Card.tsx                  # Componente de card reutilizável
│   │   ├── ExportPdfButton.tsx       # Botão de exportação PDF
│   │   ├── IndicatorBadge.tsx        # Badge de indicador colorido
│   │   ├── ResultadosView.tsx        # Visualização de resultados
│   │   ├── ResultTable.tsx           # Tabela de resultados
│   │   └── TalhaoList.tsx            # Lista de talhões/safras
│   ├── config/
│   │   └── defaults.ts               # Configurações padrão
│   ├── types/
│   │   └── index.ts                  # Definições de tipos TypeScript
│   └── utils/
│       ├── calculations.ts           # Funções de cálculo
│       └── __tests__/
│           └── calculations.test.ts  # Testes unitários
├── jest.config.js                    # Configuração Jest
├── jest.setup.js                     # Setup Jest
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testes

O projeto inclui testes unitários completos para todas as funções de cálculo financeiro:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm test -- --coverage
```

### Cobertura de Testes

- ✅ Cálculo de rendimento por região
- ✅ Cálculo de área total
- ✅ Cálculo de produção total
- ✅ Cálculo de receita bruta
- ✅ Cálculo de custos (custeio, arrendamento)
- ✅ Cálculo de lucros (própria, arrendada, total)
- ✅ Cálculo de indicadores (custeio, investimento)
- ✅ Determinação de pareceres
- ✅ Análise completa (integração)

## 📊 Exemplos de Uso

### Exemplo 1: Propriedade 100% Própria

**Entrada:**
```json
{
  "propriedade": {
    "areaPropria": 100,
    "areaArrendada": 0,
    "talhoes": [
      { "area": 100, "cultura": "soja", "regiao": "boa" }
    ]
  },
  "custos": {
    "precoPorSaca": 100,
    "custeioPorHa": 5000,
    "investimentoTotal": 100000,
    "arrendamentoPorHa": 0
  },
  "dividas": {
    "valorMenos1Ano": 100000,
    "valor1a5Anos": 50000
  }
}
```

**Saída:**
```json
{
  "receitaBrutaTotal": 700000,
  "custoTotal": 600000,
  "lucroTotal": 100000,
  "indicadorCusteio": 0.143,
  "parecerCusteio": "aprovado",
  "indicadorInvestimento": 1.0,
  "parecerInvestimento": "reprovado",
  "parecerFinal": "reprovado"
}
```

### Exemplo 2: Propriedade Mista (Própria + Arrendada)

**Entrada:**
```json
{
  "propriedade": {
    "areaPropria": 80,
    "areaArrendada": 20,
    "talhoes": [
      { "area": 50, "cultura": "soja", "regiao": "boa" },
      { "area": 30, "cultura": "milho", "regiao": "medio" },
      { "area": 20, "cultura": "soja", "regiao": "baixa" }
    ]
  },
  "custos": {
    "precoPorSaca": 100,
    "custeioPorHa": 5000,
    "investimentoTotal": 50000,
    "arrendamentoPorHa": 2000
  },
  "dividas": {
    "valorMenos1Ano": 80000,
    "valor1a5Anos": 100000
  }
}
```

**Cálculos:**
- Produção: (50×70) + (30×60) + (20×50) = 6.300 sc
- Receita: 6.300 × 100 = R$ 630.000
- Custo custeio: 100 × 5.000 = R$ 500.000
- Custo arrendamento: 20 × 2.000 = R$ 40.000
- Custo total: 500.000 + 40.000 + 50.000 = R$ 590.000
- Lucro total: 630.000 - 590.000 = R$ 40.000
- Indicador custeio: 80.000 / 630.000 = 12.7% (✅ Aprovado)
- Indicador investimento: 50.000 / 40.000 = 125% (❌ Reprovado)

## ⚙️ Configurações Administrativas

As configurações podem ser ajustadas editando o arquivo `src/config/defaults.ts`:

```typescript
export const defaultConfig: Config = {
  rendimentos: {
    boa: 70,      // Altere aqui o rendimento para região boa
    medio: 60,    // Altere aqui o rendimento para região média
    baixa: 50,    // Altere aqui o rendimento para região baixa
  },
  thresholds: {
    custeio: {
      aprovado: 0.2,    // Threshold para aprovação (≤ 20%)
      atencao: 0.5,     // Threshold para atenção (≤ 50%)
    },
    investimento: {
      aprovado: 0.5,    // Threshold para aprovação (< 50%)
      atencao: 0.7,     // Threshold para atenção (≤ 70%)
    },
  },
};
```

## 🎨 Personalização de Tema

O projeto usa Tailwind CSS. Para personalizar cores e estilos, edite:
- `tailwind.config.ts` - Configuração do Tailwind
- `src/app/globals.css` - Estilos globais

## 🔄 Modo Comparação (Futuro)

Funcionalidade planejada para comparar dois cenários lado a lado. Estrutura preparada para implementação futura.

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- 📱 Dispositivos móveis (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1280px+)

## 🛡️ API

### POST /api/analise

Endpoint para processar análise de crédito.

**Request:**
```json
{
  "propriedade": { ... },
  "custos": { ... },
  "dividas": { ... }
}
```

**Response:**
```json
{
  "dados": { ... },
  "resultados": { ... },
  "dataAnalise": "2025-10-01T12:00:00.000Z"
}
```

## 🐛 Solução de Problemas

### Erro ao instalar dependências
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Erros de TypeScript
```bash
# Verifique a configuração do TypeScript
npx tsc --noEmit
```

### Testes falhando
```bash
# Limpe o cache do Jest
npm test -- --clearCache
npm test
```

## 📝 Licença

Este projeto é proprietário e confidencial.

## 👥 Autores

Desenvolvido para análise de crédito agrícola.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.

