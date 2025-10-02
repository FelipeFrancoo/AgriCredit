import { FileDown } from './icons';
import { AnaliseCompleta } from '@/types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ExportPdfButtonProps {
  analise: AnaliseCompleta;
}

export function ExportPdfButton({ analise }: ExportPdfButtonProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  };

  const handleExport = () => {
    const doc = new jsPDF();
    const { dados, resultados } = analise;

    // Título
    doc.setFontSize(18);
    doc.text('Análise de Crédito Agrícola', 14, 20);

    doc.setFontSize(10);
    doc.text(`Data: ${new Date(analise.dataAnalise).toLocaleDateString('pt-BR')}`, 14, 28);

    // Dados da Propriedade
    doc.setFontSize(14);
    doc.text('Dados da Propriedade', 14, 40);

    const areaTotal = dados.propriedade.areaPropria + dados.propriedade.areaArrendada;

    autoTable(doc, {
      startY: 45,
      head: [['Item', 'Valor']],
      body: [
        ['Área Própria', `${dados.propriedade.areaPropria} ha`],
        ['Área Arrendada', `${dados.propriedade.areaArrendada} ha`],
        ['Área Total', `${areaTotal} ha`],
      ],
    });

    // Talhões
    let finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Talhões', 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [['#', 'Área Própria (ha)', 'Área Arrendada (ha)', 'Área Total (ha)', 'Cultura', 'Região']],
      body: dados.propriedade.talhoes.map((t, i) => [
        `${i + 1}`,
        `${t.areaPropria}`,
        `${t.areaArrendada}`,
        `${t.areaPropria + t.areaArrendada}`,
        t.cultura,
        t.regiao,
      ]),
    });

    // Custos e Preços
    finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Custos e Preços', 14, finalY);

    // Soja
    doc.setFontSize(12);
    doc.text('🌱 Soja', 14, finalY + 7);

    autoTable(doc, {
      startY: finalY + 10,
      head: [['Item', 'Valor']],
      body: [
        ['Preço Saca de Soja', formatCurrency(dados.custos.precoSoja)],
        ['Custo Total Área Própria', formatCurrency(dados.custos.custoTotalAreaPropriaSoja)],
        ['Custo Total Área Arrendada', formatCurrency(dados.custos.custoTotalAreaArrendadaSoja)],
      ],
    });

    // Milho
    finalY = (doc as any).lastAutoTable.finalY + 8;
    doc.setFontSize(12);
    doc.text('🌽 Milho', 14, finalY);

    autoTable(doc, {
      startY: finalY + 3,
      head: [['Item', 'Valor']],
      body: [
        ['Preço Saca de Milho', formatCurrency(dados.custos.precoMilho)],
        ['Custo Total Insumos (sc milho/ha)', formatCurrency(dados.custos.custoTotalInsumosMilhoHa)],
        ['Custo Custeio', formatCurrency(dados.custos.custeioPorHa) + '/ha'],
        ['Previsão Custeio Anual', formatCurrency(dados.custos.previsaoCusteioAnual)],
      ],
    });

    // Outros Custos
    finalY = (doc as any).lastAutoTable.finalY + 8;
    doc.setFontSize(12);
    doc.text('📊 Outros Custos', 14, finalY);

    autoTable(doc, {
      startY: finalY + 3,
      head: [['Item', 'Valor']],
      body: [
        ['Investimento Total', formatCurrency(dados.custos.investimentoTotal)],
        ['Arrendamento por Hectare', formatCurrency(dados.custos.arrendamentoPorHa)],
      ],
    });

    // Dívidas
    finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Dívidas SISBACEN', 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [['Prazo', 'Valor']],
      body: [
        ['Menos de 1 ano', formatCurrency(dados.dividas.valorMenos1Ano)],
        ['1 a 5 anos', formatCurrency(dados.dividas.valor1a5Anos)],
      ],
    });

    // Nova página para resultados
    doc.addPage();

    doc.setFontSize(18);
    doc.text('Resultados da Análise', 14, 20);

    // Resultados Financeiros
    doc.setFontSize(14);
    doc.text('Resultados Financeiros', 14, 35);

    autoTable(doc, {
      startY: 40,
      head: [['Métrica', 'Valor']],
      body: [
        ['Receita Bruta Total', formatCurrency(resultados.receitaBrutaTotal)],
        ['Custo Total', formatCurrency(resultados.custoTotal)],
        ['  • Custo Área Própria', formatCurrency(resultados.custoTotalPropria)],
        ['  • Custo Área Arrendada', formatCurrency(resultados.custoTotalArrendada)],
        ['Lucro Total', formatCurrency(resultados.lucroTotal)],
        ['  • Lucro Área Própria', formatCurrency(resultados.lucroPropria)],
        ['  • Lucro Área Arrendada', formatCurrency(resultados.lucroArrendada)],
      ],
    });

    // Indicadores
    finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Indicadores de Crédito', 14, finalY);

    const parecerTexto = {
      aprovado: 'APROVADO',
      atencao: 'ATENÇÃO',
      reprovado: 'REPROVADO',
    };

    autoTable(doc, {
      startY: finalY + 5,
      head: [['Indicador', 'Valor', 'Parecer']],
      body: [
        [
          'Indicador de Custeio',
          formatPercent(resultados.indicadorCusteio),
          parecerTexto[resultados.parecerCusteio],
        ],
        [
          'Indicador de Investimento',
          formatPercent(resultados.indicadorInvestimento),
          parecerTexto[resultados.parecerInvestimento],
        ],
      ],
    });

    // Parecer Final
    finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(16);
    doc.setTextColor(
      resultados.parecerFinal === 'aprovado'
        ? 0
        : resultados.parecerFinal === 'atencao'
        ? 200
        : 200,
      resultados.parecerFinal === 'aprovado' ? 150 : 0,
      0
    );
    doc.text(`PARECER FINAL: ${parecerTexto[resultados.parecerFinal]}`, 14, finalY);

    // Salvar PDF
    doc.save(`analise-credito-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
    >
      <FileDown className="w-5 h-5" />
      Exportar PDF
    </button>
  );
}
