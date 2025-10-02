'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnaliseCompleta } from '@/types';
import { AnaliseForm } from '@/components/AnaliseForm';
import { ResultadosView } from '@/components/ResultadosView';

export default function Home() {
  const [analise, setAnalise] = useState<AnaliseCompleta | null>(null);

  const handleAnaliseComplete = (novaAnalise: AnaliseCompleta) => {
    setAnalise(novaAnalise);
  };

  const handleReset = () => {
    setAnalise(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-700">AgriCredit</h1>
              <p className="text-sm text-gray-600 mt-1">
                Sistema de Análise de Crédito Agrícola
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/historico"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                📋 Ver Histórico
              </Link>
              <div className="text-right text-sm text-gray-600">
                <p>Versão 1.0</p>
                <p>{new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!analise ? (
          <AnaliseForm onAnaliseComplete={handleAnaliseComplete} />
        ) : (
          <ResultadosView analise={analise} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            © 2025 AgriCredit - Sistema de Análise de Crédito Agrícola
          </p>
        </div>
      </footer>
    </div>
  );
}
