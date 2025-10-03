import { forwardRef } from 'react';

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  prefix?: string;
}

/**
 * Componente de input para valores monetários em R$ (BRL)
 * Formata automaticamente os valores enquanto o usuário digita
 */
export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, placeholder = '', className = '', prefix = 'R$ ' }, ref) => {
    /**
     * Formata o valor para exibição com R$ e separadores
     * Exemplo: 1234.56 -> R$ 1.234,56
     */
    const formatCurrency = (value: string): string => {
      if (!value) return '';

      // Remove tudo exceto números e vírgula
      const cleaned = value.replace(/[^\d,]/g, '');

      // Separa parte inteira e decimal
      const parts = cleaned.split(',');
      let integerPart = parts[0];
      const decimalPart = parts[1];

      // Adiciona pontos nos milhares
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      // Monta o valor formatado
      let formatted = integerPart;
      if (decimalPart !== undefined) {
        // Limita a 2 casas decimais
        formatted += ',' + decimalPart.slice(0, 2);
      }

      return formatted;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      // Remove o prefixo R$ se existir
      const withoutPrefix = inputValue.replace(/^R\$\s*/, '');
      
      // Formata o valor
      const formatted = formatCurrency(withoutPrefix);
      
      // Passa o valor formatado de volta
      onChange(formatted);
    };

    // Adiciona o prefixo R$ ao valor exibido
    const displayValue = value ? `${prefix}${formatCurrency(value)}` : '';

    return (
      <input
        ref={ref}
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder ? `${prefix}${placeholder}` : prefix}
        className={className}
      />
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';
