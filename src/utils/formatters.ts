/**
 * Utilitários de Formatação - AgriCredit
 * 
 * Este arquivo contém funções padronizadas para formatação de valores
 * em toda a aplicação, garantindo consistência visual.
 * 
 * PADRÕES DE FORMATAÇÃO BRASILEIRA:
 * - Valores monetários: R$ 1.000,00 (separador de milhares: ponto | decimal: vírgula)
 * - Números: 1.000,50 (separador de milhares: ponto | decimal: vírgula)
 * - Percentuais: 15,5% (decimal: vírgula)
 * 
 * Exemplos:
 * - formatCurrency(10000) → "R$ 10.000,00"
 * - formatNumber(1234.56) → "1.234,56"
 * - formatPercent(0.155) → "15,5%"
 */

/**
 * Formata número para exibição com separador de milhares (ponto)
 * Exemplo: 10000 -> "10.000"
 */
export function formatNumber(value: number | string): string {
  if (value === '' || value === null || value === undefined) return '';
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return '';
  
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numValue);
}

/**
 * Formata valor monetário (R$) com 2 casas decimais
 * Exemplo: 10000 -> "R$ 10.000,00"
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formata percentual com 2 casas decimais
 * IMPORTANTE: Não usar style: 'percent' do Intl pois ele multiplica por 100 automaticamente
 * Exemplo: 0.0066 -> "0,66%" (não 66,00%)
 */
export function formatPercent(value: number): string {
  // Multiplica por 100 manualmente e formata com 2 casas decimais
  const percentValue = value * 100;
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(percentValue) + '%';
}

/**
 * Remove formatação de número (remove pontos e vírgulas)
 * Exemplo: "10.000,50" -> 10000.5
 */
export function parseFormattedNumber(value: string): number {
  if (!value) return 0;
  
  // Remove pontos (separador de milhares) e substitui vírgula por ponto
  const cleaned = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

/**
 * Formata input enquanto usuário digita
 * Mantém a posição do cursor correta
 */
export function formatInputNumber(value: string): string {
  // Remove tudo exceto números, vírgula e ponto
  const cleaned = value.replace(/[^\d,]/g, '').replace(/^0+(?=\d)/, '');
  
  // Separa parte inteira e decimal
  const parts = cleaned.split(',');
  const integerPart = parts[0];
  const decimalPart = parts[1];
  
  // Formata parte inteira com separador de milhares
  const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  // Retorna com parte decimal se existir
  return decimalPart !== undefined ? `${formatted},${decimalPart}` : formatted;
}
