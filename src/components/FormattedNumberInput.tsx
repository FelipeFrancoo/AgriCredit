'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { formatInputNumber, parseFormattedNumber } from '@/utils/formatters';

interface FormattedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: string) => void;
  onValueChange?: (numericValue: number) => void;
}

export const FormattedNumberInput = forwardRef<HTMLInputElement, FormattedInputProps>(
  ({ onChange, onValueChange, value, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      // Permite apenas números, vírgula e ponto
      if (inputValue && !/^[\d.,]*$/.test(inputValue)) {
        return;
      }

      // Formata o valor para exibição
      const formatted = formatInputNumber(inputValue);
      setDisplayValue(formatted);

      // Extrai o valor numérico
      const numericValue = parseFormattedNumber(formatted);

      // Chama callbacks
      if (onChange) {
        onChange(numericValue.toString());
      }
      if (onValueChange) {
        onValueChange(numericValue);
      }
    };

    const handleBlur = () => {
      // Ao perder o foco, garante que o valor esteja formatado
      if (displayValue) {
        const formatted = formatInputNumber(displayValue);
        setDisplayValue(formatted);
      }
    };

    return (
      <input
        {...props}
        ref={ref}
        type="text"
        inputMode="decimal"
        value={displayValue || value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  }
);

FormattedNumberInput.displayName = 'FormattedNumberInput';
