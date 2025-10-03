'use client';

import { AnaliseCompleta } from '@/types';
import { Card } from './Card';
import { IndicatorBadge } from './IndicatorBadge';
import { ResultTable } from './ResultTable';
import { ExportPdfButton } from './ExportPdfButton';
import { Save, RefreshCw } from './icons';
import { saveToHistory } from '@/utils/storage';
import Link from 'next/link';

interface ResultadosViewProps {
  analise: AnaliseCompleta;
  onReset: () => void;
  showActions?: boolean; // Novo prop para controlar se mostra os botões de ação
}

export function ResultadosView({ analise, onReset, showActions = true }: ResultadosViewProps) {
  const { resultados, dados } = analise;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    // Multiplica por 100 manualmente e formata com 2 casas decimais
    const percentValue = value * 100;
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(percentValue) + '%';
  };

  const areaTotal = dados.propriedade.areaPropria + dados.propriedade.areaArrendada;

  const handleSaveToHistory = () => {
    try {
      saveToHistory(analise);
      alert('Análise salva no histórico com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar histórico:', error);
      alert('Erro ao salvar no histórico.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      {showActions && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Resultados da Análise</h2>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Nova Análise
          </button>
        </div>
      )}

      {/* Informações da Propriedade */}
      <Card title="Resumo da Propriedade">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Área Própria</p>
            <p className="text-2xl font-bold text-blue-700">{formatNumber(dados.propriedade.areaPropria)} ha</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Área Arrendada</p>
            <p className="text-2xl font-bold text-orange-700">{formatNumber(dados.propriedade.areaArrendada)} ha</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Área Total</p>
            <p className="text-2xl font-bold text-green-700">{formatNumber(areaTotal)} ha</p>
          </div>
        </div>
        {dados.propriedade.talhoes.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Talhões cadastrados: {dados.propriedade.talhoes.length}</p>
            <div className="space-y-2">
              {dados.propriedade.talhoes.map((talhao, index) => {
                const totalTalhao = talhao.areaPropria + talhao.areaArrendada;
                return (
                  <div key={talhao.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                    <span className="font-medium">Talhão {index + 1}</span>
                    <span className="text-gray-600">
                      {talhao.cultura === 'soja' ? '🌱' : '🌽'} {talhao.cultura.charAt(0).toUpperCase() + talhao.cultura.slice(1)} - {talhao.regiao.charAt(0).toUpperCase() + talhao.regiao.slice(1)}
                    </span>
                    <span className="font-semibold text-green-600">{formatNumber(totalTalhao)} ha</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      {/* Parecer Final */}
      <Card>
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-700">Parecer Final</h3>
          <div className="flex justify-center">
            <IndicatorBadge
              status={resultados.parecerFinal}
              label="Status da Análise"
              value={
                resultados.parecerFinal === 'aprovado'
                  ? 'APROVADO'
                  : resultados.parecerFinal === 'atencao'
                  ? 'ATENÇÃO'
                  : 'REPROVADO'
              }
              tooltip="Parecer final considerando todos os indicadores"
            />
          </div>
        </div>
      </Card>

      {/* Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Indicador de Custeio">
          <div className="space-y-4">
            <div className="flex justify-center py-2">
              <IndicatorBadge
                status={resultados.parecerCusteio}
                label="Dívida Curto Prazo / Receita"
                value={formatPercent(resultados.indicadorCusteio)}
                tooltip="Proporção da dívida de curto prazo em relação à receita bruta"
              />
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Previsão Custeio Anual:</strong>{' '}
                {formatCurrency(resultados.previsaoCusteioAnual)}
              </p>
              <p>
                <strong>Receita bruta:</strong>{' '}
                {formatCurrency(resultados.receitaBrutaTotal)}
              </p>
              <div className="mt-3 p-3 bg-gray-50 rounded">
                <p className="text-xs">
                  <strong>Critérios:</strong>
                  <br />• &lt; 50%: Aprovado
                  <br />• 50-70%: Atenção
                  <br />• &gt; 70%: Reprovado
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Indicador de Investimento">
          <div className="space-y-4">
            <div className="flex justify-center py-2">
              <IndicatorBadge
                status={resultados.parecerInvestimento}
                label="Investimento / Lucro Total"
                value={formatPercent(resultados.indicadorInvestimento)}
                tooltip="Proporção do investimento em relação ao lucro total"
              />
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Previsão Investimento Anual:</strong>{' '}
                {formatCurrency(resultados.previsaoInvestimentoAnual)}
              </p>
              <p>
                <strong>Lucro total:</strong> {formatCurrency(resultados.lucroTotal)}
              </p>
              <div className="mt-3 p-3 bg-gray-50 rounded">
                <p className="text-xs">
                  <strong>Critérios:</strong>
                  <br />• &lt; 50%: Aprovado
                  <br />• 50-70%: Atenção
                  <br />• &gt; 70%: Reprovado
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabela de Resultados */}
      <Card title="Resumo Financeiro">
        <ResultTable resultados={resultados} />
      </Card>

      {/* Ações */}
      {showActions && (
        <div className="flex gap-4 justify-center flex-wrap">
          <ExportPdfButton analise={analise} />
          <button
            onClick={handleSaveToHistory}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            Salvar no Histórico
          </button>
          <Link
            href="/historico"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Ver Histórico
          </Link>
        </div>
      )}
    </div>
  );
}
