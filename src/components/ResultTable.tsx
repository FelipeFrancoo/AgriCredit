import { Resultados } from '@/types';

interface ResultTableProps {
  resultados: Resultados;
}

export function ResultTable({ resultados }: ResultTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
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

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-3 font-semibold text-gray-700 border-b">Métrica</th>
            <th className="px-4 py-3 font-semibold text-gray-700 border-b text-right">Valor</th>
          </tr>
        </thead>
        <tbody>
          {/* Área Total */}
          <tr className="border-b hover:bg-gray-50 bg-blue-50">
            <td className="px-4 py-3 text-gray-700 font-semibold">Área Total de Terras Plantadas</td>
            <td className="px-4 py-3 text-right font-bold text-blue-700">
              {formatNumber(resultados.areaTotalPlantada)} ha
            </td>
          </tr>
          
          {/* MILHO */}
          <tr className="bg-yellow-50">
            <td colSpan={2} className="px-4 py-2 font-bold text-gray-800">🌽 MILHO</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700 pl-8">Receita Bruta</td>
            <td className="px-4 py-3 text-right font-medium text-gray-900">
              {formatCurrency(resultados.receitaBrutaMilho)}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700 pl-8">Previsão de Lucro Total</td>
            <td className="px-4 py-3 text-right font-medium text-gray-900">
              {formatCurrency(resultados.previsaoLucroTotalMilho)}
            </td>
          </tr>
          
          {/* SOJA */}
          <tr className="bg-green-50">
            <td colSpan={2} className="px-4 py-2 font-bold text-gray-800">🌱 SOJA</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700 pl-8">Receita Bruta</td>
            <td className="px-4 py-3 text-right font-medium text-gray-900">
              {formatCurrency(resultados.receitaBrutaSoja)}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700 pl-8">Previsão Lucro Terras Próprias</td>
            <td className="px-4 py-3 text-right text-gray-700">
              {formatCurrency(resultados.previsaoLucroTerrasProprias)}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700 pl-8">Previsão Lucro Terras Arrendadas</td>
            <td className="px-4 py-3 text-right text-gray-700">
              {formatCurrency(resultados.previsaoLucroTerrasArrendadas)}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700 pl-8 font-semibold">Previsão Lucro Total Soja</td>
            <td className="px-4 py-3 text-right font-semibold text-gray-900">
              {formatCurrency(resultados.previsaoLucroTotalSoja)}
            </td>
          </tr>
          
          {/* TOTAIS */}
          <tr className="bg-purple-50">
            <td colSpan={2} className="px-4 py-2 font-bold text-gray-800">💰 TOTAIS</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700 font-semibold">Receita Bruta Total</td>
            <td className="px-4 py-3 text-right font-bold text-gray-900">
              {formatCurrency(resultados.receitaBrutaTotal)}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700 pl-8">Previsão de Lucro de Outras Receitas</td>
            <td className="px-4 py-3 text-right text-gray-700">
              {formatCurrency(resultados.previsaoLucroOutrasReceitas)}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50 bg-green-50">
            <td className="px-4 py-3 text-gray-700 font-semibold">Lucro Total</td>
            <td className="px-4 py-3 text-right font-bold text-green-700">
              {formatCurrency(resultados.lucroTotal)}
            </td>
          </tr>
          
          {/* DÍVIDAS */}
          <tr className="bg-red-50">
            <td colSpan={2} className="px-4 py-2 font-bold text-gray-800">📊 DÍVIDAS</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700 pl-8">Previsão de Investimento Anual</td>
            <td className="px-4 py-3 text-right text-gray-700">
              {formatCurrency(resultados.previsaoInvestimentoAnual)}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700 font-semibold">Dívida Total Anual</td>
            <td className="px-4 py-3 text-right font-bold text-red-700">
              {formatCurrency(resultados.dividaTotalAnual)}
            </td>
          </tr>
          
          {/* INDICADORES */}
          <tr className="bg-gray-100">
            <td colSpan={2} className="px-4 py-2 font-bold text-gray-800">📈 INDICADORES</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700">Indicador de Custeio</td>
            <td className="px-4 py-3 text-right font-medium text-gray-900">
              {formatPercent(resultados.indicadorCusteio)}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700">Indicador de Investimento</td>
            <td className="px-4 py-3 text-right font-medium text-gray-900">
              {formatPercent(resultados.indicadorInvestimento)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
