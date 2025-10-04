'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnaliseCompleta } from '@/types';
import { AnaliseForm } from '@/components/AnaliseForm';
import { ResultadosView } from '@/components/ResultadosView';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Header } from '@/components/Header';

export default function Home() {
  const [analise, setAnalise] = useState<AnaliseCompleta | null>(null);

  const handleAnaliseComplete = (novaAnalise: AnaliseCompleta) => {
    setAnalise(novaAnalise);
  };

  const handleReset = () => {
    setAnalise(null);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Header */}
        <Header />

        {/* Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 py-4">
              <Link
                href="/historico"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                📋 Ver Histórico
              </Link>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        </div>

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
    </ProtectedRoute>
  );
}
