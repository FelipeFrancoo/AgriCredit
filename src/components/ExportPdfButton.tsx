'use client';

import { FileDown } from './icons';
import { AnaliseCompleta } from '@/types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState } from 'react';

interface ExportPdfButtonProps {
  analise: AnaliseCompleta;
}

export function ExportPdfButton({ analise }: ExportPdfButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Encontra o elemento que queremos capturar
      const element = document.getElementById('resultados-view');
      
      if (!element) {
        alert('Erro ao encontrar o elemento para exportar');
        setIsExporting(false);
        return;
      }

      // Esconde os botões de ação durante a captura
      const actionButtons = element.querySelectorAll('button');
      const links = element.querySelectorAll('a');
      
      actionButtons.forEach((btn) => {
        (btn as HTMLElement).style.display = 'none';
      });
      links.forEach((link) => {
        (link as HTMLElement).style.display = 'none';
      });

      // Captura o elemento como canvas com alta qualidade
      const canvas = await html2canvas(element, {
        scale: 2, // Aumenta a resolução
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Restaura os botões
      actionButtons.forEach((btn) => {
        (btn as HTMLElement).style.display = '';
      });
      links.forEach((link) => {
        (link as HTMLElement).style.display = '';
      });

      // Converte o canvas para imagem
      const imgData = canvas.toDataURL('image/png');
      
      // Calcula as dimensões para o PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const imgX = 0;
      const imgY = 0;
      
      const canvasWidth = imgWidth * ratio;
      const canvasHeight = imgHeight * ratio;

      // Se a imagem for muito alta, divide em múltiplas páginas
      const pageHeight = pdfHeight;
      let heightLeft = canvasHeight;
      let position = 0;

      // Adiciona a primeira página
      pdf.addImage(imgData, 'PNG', imgX, imgY, canvasWidth, canvasHeight);
      heightLeft -= pageHeight;

      // Adiciona páginas adicionais se necessário
      while (heightLeft > 0) {
        position = heightLeft - canvasHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', imgX, position, canvasWidth, canvasHeight);
        heightLeft -= pageHeight;
      }

      // Adiciona informações no rodapé da última página
      const pageCount = pdf.internal.pages.length - 1;
      const currentDate = new Date(analise.dataAnalise).toLocaleDateString('pt-BR');
      
      pdf.setPage(pageCount);
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(
        `Análise gerada em ${currentDate} - AgriCredit`,
        pdfWidth / 2,
        pdfHeight - 5,
        { align: 'center' }
      );

      // Salva o PDF
      const fileName = `analise-credito-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar PDF. Por favor, tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FileDown className="w-5 h-5" />
      {isExporting ? 'Gerando PDF...' : 'Exportar PDF'}
    </button>
  );
}
