'use client';

import { useState, useEffect } from 'react';
import { AnaliseCompleta } from '@/types';
import { getHistory, deleteFromHistory, clearHistory } from '@/utils/storage';
import { Card } from '@/components/Card';
import { Trash2, RefreshCw, Eye } from '@/components/icons';
import { ResultadosView } from '@/components/ResultadosView';
import Link from 'next/link';

export default function HistoricoPage() {
  const [historico, setHistorico] = useState<AnaliseCompleta[]>([]);
  const [selectedAnalise, setSelectedAnalise] = useState<AnaliseCompleta | null>(null);

  useEffect(() => {
    loadHistorico();
  }, []);

  const loadHistorico = () => {
    const history = getHistory();
    setHistorico(history);
  };

  const handleDelete = (index: number) => {
    if (confirm('Deseja realmente excluir esta análise do histórico?')) {
      deleteFromHistory(index);
      loadHistorico();
    }
  };

  const handleClearAll = () => {
    if (confirm('Deseja realmente limpar todo o histórico?')) {
      clearHistory();
      loadHistorico();
    }
  };

  const handleViewDetails = (analise: AnaliseCompleta) => {
    setSelectedAnalise(analise);
  };

  const handleCloseDetails = () => {
    setSelectedAnalise(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado':
        return 'text-green-600';
      case 'atencao':
        return 'text-yellow-600';
      case 'reprovado':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-700">
                Histórico de Análises
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {historico.length} análise(s) salva(s)
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleClearAll}
                disabled={historico.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <Trash2 className="w-4 h-4" />
                Limpar Tudo
              </button>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {historico.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                Nenhuma análise salva no histórico
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Realizar Nova Análise
              </Link>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {historico.map((analise, index) => (
              <Card key={index}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Análise #{historico.length - index}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {new Date(analise.dataAnalise).toLocaleString('pt-BR')}
                      </span>
                      <span
                        className={`text-sm font-semibold uppercase ${getStatusColor(
                          analise.resultados.parecerFinal
                        )}`}
                      >
                        {analise.resultados.parecerFinal}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Área Total:</span>
                        <span className="ml-2 font-medium">
                          {analise.dados.propriedade.areaPropria +
                            analise.dados.propriedade.areaArrendada}{' '}
                          ha
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Receita Bruta:</span>
                        <span className="ml-2 font-medium">
                          {formatCurrency(analise.resultados.receitaBrutaTotal)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Lucro Total:</span>
                        <span className="ml-2 font-medium">
                          {formatCurrency(analise.resultados.lucroTotal)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Talhões:</span>
                        <span className="ml-2 font-medium">
                          {analise.dados.propriedade.talhoes.length}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Indicador Custeio:</span>
                        <span className={`ml-2 font-medium ${getStatusColor(analise.resultados.parecerCusteio)}`}>
                          {(analise.resultados.indicadorCusteio * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Indicador Investimento:</span>
                        <span className={`ml-2 font-medium ${getStatusColor(analise.resultados.parecerInvestimento)}`}>
                          {(analise.resultados.indicadorInvestimento * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleViewDetails(analise)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      title="Ver detalhes completos"
                    >
                      <Eye className="w-4 h-4" />
                      Ver Detalhes
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      title="Excluir análise"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Modal de Detalhes */}
      {selectedAnalise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-800">
                Detalhes da Análise - {new Date(selectedAnalise.dataAnalise).toLocaleString('pt-BR')}
              </h2>
              <button
                onClick={handleCloseDetails}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Fechar
              </button>
            </div>
            <div className="p-6">
              <ResultadosView 
                analise={selectedAnalise} 
                onReset={handleCloseDetails}
                showActions={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
