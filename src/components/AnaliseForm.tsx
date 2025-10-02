'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Talhao, AnaliseCompleta } from '@/types';
import { calcularAnaliseCredito } from '@/utils/calculations';
import { loadConfig } from '@/config/defaults';
import { TalhaoList } from './TalhaoList';
import { Card } from './Card';
import { ChevronRight, ChevronLeft } from './icons';

interface AnaliseFormProps {
  onAnaliseComplete: (analise: AnaliseCompleta) => void;
}

interface FormInputs {
  areaPropria: string;
  areaArrendada: string;
  // Soja
  precoSacaSoja: string;
  custoTotalAreaPropriaSoja: string;
  custoTotalAreaArrendadaSoja: string;
  // Milho
  precoSacaMilho: string;
  custoTotalInsumosMilhoHa: string;
  custeioPorHa: string;
  previsaoCusteioAnual: string;
  // Outros
  investimentoTotal: string;
  arrendamentoPorHa: string;
  valorMenos1Ano: string;
  valor1a5Anos: string;
  dividasProtestos: string;
}

// Função para formatar número com pontos de milhares
const formatNumberInput = (value: string): string => {
  if (!value) return '';
  
  // Remove tudo exceto números e vírgula
  const cleaned = value.replace(/[^\d,]/g, '');
  
  // Separa parte inteira e decimal
  const parts = cleaned.split(',');
  let integerPart = parts[0];
  const decimalPart = parts[1];
  
  // Adiciona pontos nos milhares
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  // Retorna com parte decimal se existir
  return decimalPart !== undefined ? `${integerPart},${decimalPart}` : integerPart;
};

// Função para remover formatação e obter valor numérico
const parseNumberInput = (value: string): number => {
  if (!value) return 0;
  // Remove pontos e substitui vírgula por ponto
  const cleaned = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};

export function AnaliseForm({ onAnaliseComplete }: AnaliseFormProps) {
  const [step, setStep] = useState(1);
  const [talhoes, setTalhoes] = useState<Talhao[]>([]);
  
  const { register, handleSubmit, formState: { errors }, control } = useForm<FormInputs>();

  const addTalhao = () => {
    const newTalhao: Talhao = {
      id: `talhao-${Date.now()}`,
      areaPropria: 0, // Será exibido como vazio
      areaArrendada: 0, // Será exibido como vazio
      cultura: 'soja',
      regiao: 'medio',
    };
    setTalhoes([...talhoes, newTalhao]);
  };

  const removeTalhao = (id: string) => {
    setTalhoes(talhoes.filter((t) => t.id !== id));
  };

  const updateTalhao = (id: string, field: keyof Talhao, value: string | number) => {
    setTalhoes(
      talhoes.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const nextStep = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault(); // Prevenir submissão do formulário
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault(); // Prevenir submissão do formulário
    if (step > 1) setStep(step - 1);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Só processar quando estiver no step 3 (Dívidas)
    if (step !== 3) {
      return;
    }

    handleSubmit((data: FormInputs) => {
      const formData = {
        propriedade: {
          areaPropria: parseNumberInput(data.areaPropria) || 0,
          areaArrendada: parseNumberInput(data.areaArrendada) || 0,
          talhoes,
        },
        custos: {
          // Soja
          precoSoja: parseNumberInput(data.precoSacaSoja) || 0,
          custoTotalAreaPropriaSoja: parseNumberInput(data.custoTotalAreaPropriaSoja) || 0,
          custoTotalAreaArrendadaSoja: parseNumberInput(data.custoTotalAreaArrendadaSoja) || 0,
          // Milho
          precoMilho: parseNumberInput(data.precoSacaMilho) || 0,
          custoTotalInsumosMilhoHa: parseNumberInput(data.custoTotalInsumosMilhoHa) || 0,
          custeioPorHa: parseNumberInput(data.custeioPorHa) || 0,
          previsaoCusteioAnual: parseNumberInput(data.previsaoCusteioAnual) || 0,
          // Outros
          investimentoTotal: parseNumberInput(data.investimentoTotal) || 0,
          arrendamentoPorHa: parseNumberInput(data.arrendamentoPorHa) || 0,
        },
        dividas: {
          valorMenos1Ano: parseNumberInput(data.valorMenos1Ano) || 0,
          valor1a5Anos: parseNumberInput(data.valor1a5Anos) || 0,
          dividasProtestos: parseNumberInput(data.dividasProtestos) || 0,
        },
      };

      const config = loadConfig();
      const resultados = calcularAnaliseCredito(formData, config);

      const analise: AnaliseCompleta = {
        dados: formData,
        resultados,
        dataAnalise: new Date().toISOString(),
      };

      onAnaliseComplete(analise);
      setStep(4); // Ir para resultados
    })();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {['Propriedade', 'Custos/Preços', 'Dívidas', 'Resultados'].map((label, index) => (
            <div
              key={index}
              className={`flex-1 text-center ${
                step === index + 1
                  ? 'text-green-600 font-semibold'
                  : step > index + 1
                  ? 'text-green-500'
                  : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${
                  step === index + 1
                    ? 'bg-green-600 text-white'
                    : step > index + 1
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs">{label}</span>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 bg-green-600 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Dados da Propriedade */}
      {step === 1 && (
        <Card title="Dados da Propriedade">
          <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <strong>Passo 1 de 3:</strong> Informe os dados da propriedade e adicione os talhões.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Área Própria (ha) *
              </label>
              <Controller
                name="areaPropria"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    type="text"
                    value={field.value || ''}
                    onChange={(e) => {
                      const formatted = formatNumberInput(e.target.value);
                      field.onChange(formatted);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder=""
                  />
                )}
              />
              {errors.areaPropria && (
                <span className="text-red-500 text-sm">Campo obrigatório</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Área Arrendada (ha)
              </label>
              <Controller
                name="areaArrendada"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    value={field.value || ''}
                    onChange={(e) => {
                      const formatted = formatNumberInput(e.target.value);
                      field.onChange(formatted);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder=""
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Área Total (ha)
              </label>
              <Controller
                name="areaPropria"
                control={control}
                render={({ field: fieldPropria }) => (
                  <Controller
                    name="areaArrendada"
                    control={control}
                    render={({ field: fieldArrendada }) => {
                      const areaPropria = parseNumberInput(fieldPropria.value || '0');
                      const areaArrendada = parseNumberInput(fieldArrendada.value || '0');
                      const areaTotal = areaPropria + areaArrendada;
                      return (
                        <input
                          type="text"
                          value={areaTotal > 0 ? formatNumberInput(areaTotal.toString()) : ''}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-semibold"
                          placeholder="0"
                        />
                      );
                    }}
                  />
                )}
              />
            </div>
          </div>

          <TalhaoList
            talhoes={talhoes}
            onAdd={addTalhao}
            onRemove={removeTalhao}
            onChange={updateTalhao}
          />
        </Card>
      )}

      {/* Step 2: Custos e Preços */}
      {step === 2 && (
        <Card title="Custos e Preços">
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Passo 2 de 3:</strong> Informe os custos de produção e preços.
            </p>
            <p className="text-xs text-blue-700 mt-2">
              💡 Os valores monetários são formatados automaticamente em R$ (ex: 10000 → R$ 10.000,00)
            </p>
          </div>
          
          {/* SOJA */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-green-800 mb-4">🌱 Soja</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço Saca de Soja *
                </label>
                <Controller
                  name="precoSacaSoja"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      type="text"
                      value={field.value ? `R$ ${formatNumberInput(field.value)}` : ''}
                      onChange={(e) => {
                        const withoutPrefix = e.target.value.replace(/^R\$\s*/, '');
                        const formatted = formatNumberInput(withoutPrefix);
                        field.onChange(formatted);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="R$ 0,00"
                    />
                  )}
                />
                {errors.precoSacaSoja && (
                  <span className="text-red-500 text-sm">Campo obrigatório</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custo Total Área Própria (sc/ha) *
                </label>
                <Controller
                  name="custoTotalAreaPropriaSoja"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      type="text"
                      value={field.value || ''}
                      onChange={(e) => {
                        const formatted = formatNumberInput(e.target.value);
                        field.onChange(formatted);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="0"
                    />
                  )}
                />
                {errors.custoTotalAreaPropriaSoja && (
                  <span className="text-red-500 text-sm">Campo obrigatório</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custo Total Área Arrendada (sc/ha) *
                </label>
                <Controller
                  name="custoTotalAreaArrendadaSoja"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      type="text"
                      value={field.value || ''}
                      onChange={(e) => {
                        const formatted = formatNumberInput(e.target.value);
                        field.onChange(formatted);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="0"
                    />
                  )}
                />
                {errors.custoTotalAreaArrendadaSoja && (
                  <span className="text-red-500 text-sm">Campo obrigatório</span>
                )}
              </div>
            </div>
          </div>

          {/* MILHO */}
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">🌽 Milho</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço Saca de Milho *
                </label>
                <Controller
                  name="precoSacaMilho"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      type="text"
                      value={field.value ? `R$ ${formatNumberInput(field.value)}` : ''}
                      onChange={(e) => {
                        const withoutPrefix = e.target.value.replace(/^R\$\s*/, '');
                        const formatted = formatNumberInput(withoutPrefix);
                        field.onChange(formatted);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="R$ 0,00"
                    />
                  )}
                />
                {errors.precoSacaMilho && (
                  <span className="text-red-500 text-sm">Campo obrigatório</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custo Total Insumos (sc/ha) *
                </label>
                <Controller
                  name="custoTotalInsumosMilhoHa"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      type="text"
                      value={field.value || ''}
                      onChange={(e) => {
                        const formatted = formatNumberInput(e.target.value);
                        field.onChange(formatted);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="0"
                    />
                  )}
                />
                {errors.custoTotalInsumosMilhoHa && (
                  <span className="text-red-500 text-sm">Campo obrigatório</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custo Custeio (por hectare) *
                </label>
                <Controller
                  name="custeioPorHa"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      type="text"
                      value={field.value ? `R$ ${formatNumberInput(field.value)}` : ''}
                      onChange={(e) => {
                        const withoutPrefix = e.target.value.replace(/^R\$\s*/, '');
                        const formatted = formatNumberInput(withoutPrefix);
                        field.onChange(formatted);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="R$ 0,00"
                    />
                  )}
                />
                {errors.custeioPorHa && (
                  <span className="text-red-500 text-sm">Campo obrigatório</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previsão Custeio Anual *
                </label>
                <Controller
                  name="previsaoCusteioAnual"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      type="text"
                      value={field.value ? `R$ ${formatNumberInput(field.value)}` : ''}
                      onChange={(e) => {
                        const withoutPrefix = e.target.value.replace(/^R\$\s*/, '');
                        const formatted = formatNumberInput(withoutPrefix);
                        field.onChange(formatted);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="R$ 0,00"
                    />
                  )}
                />
                {errors.previsaoCusteioAnual && (
                  <span className="text-red-500 text-sm">Campo obrigatório</span>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Step 3: Dívidas */}
      {step === 3 && (
        <Card title="Dívidas SISBACEN">
          <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Passo 3 de 3:</strong> Informe as dívidas registradas no SISBACEN antes de calcular.
            </p>
            <p className="text-xs text-yellow-700 mt-2">
              💡 Os valores monetários são formatados automaticamente em R$ (ex: 100000 → R$ 100.000,00)
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor com vencimento em menos de 1 ano
              </label>
              <Controller
                name="valorMenos1Ano"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    value={field.value ? `R$ ${formatNumberInput(field.value)}` : ''}
                    onChange={(e) => {
                      const withoutPrefix = e.target.value.replace(/^R\$\s*/, '');
                      const formatted = formatNumberInput(withoutPrefix);
                      field.onChange(formatted);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="R$ 0,00"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor com vencimento de 1 a 5 anos
              </label>
              <Controller
                name="valor1a5Anos"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    value={field.value ? `R$ ${formatNumberInput(field.value)}` : ''}
                    onChange={(e) => {
                      const withoutPrefix = e.target.value.replace(/^R\$\s*/, '');
                      const formatted = formatNumberInput(withoutPrefix);
                      field.onChange(formatted);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="R$ 0,00"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dívidas de Protestos
              </label>
              <Controller
                name="dividasProtestos"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    value={field.value ? `R$ ${formatNumberInput(field.value)}` : ''}
                    onChange={(e) => {
                      const withoutPrefix = e.target.value.replace(/^R\$\s*/, '');
                      const formatted = formatNumberInput(withoutPrefix);
                      field.onChange(formatted);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="R$ 0,00"
                  />
                )}
              />
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> As dívidas SISBACEN são utilizadas para calcular os
              indicadores de crédito. Valores mais altos podem impactar negativamente a análise.
            </p>
          </div>
        </Card>
      )}

      {/* Navigation Buttons */}
      {step < 4 && (
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="btn-nav btn-nav-prev"
          >
            <ChevronLeft className="w-5 h-5" />
            Anterior
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-nav btn-nav-next"
            >
              Próximo
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="submit"
              className="btn-nav btn-nav-submit"
            >
              Calcular Análise
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </form>
  );
}
