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
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
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
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700">Receita Bruta Total</td>
            <td className="px-4 py-3 text-right font-medium text-gray-900">
              {formatCurrency(resultados.receitaBrutaTotal)}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700">Custo Total</td>
            <td className="px-4 py-3 text-right font-medium text-gray-900">
              {formatCurrency(resultados.custoTotal)}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700 pl-8">• Custo Área Própria</td>
            <td className="px-4 py-3 text-right text-gray-700">
              {formatCurrency(resultados.custoTotalPropria)}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700 pl-8">• Custo Área Arrendada</td>
            <td className="px-4 py-3 text-right text-gray-700">
              {formatCurrency(resultados.custoTotalArrendada)}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50 bg-green-50">
            <td className="px-4 py-3 text-gray-700 font-semibold">Lucro Total</td>
            <td className="px-4 py-3 text-right font-bold text-green-700">
              {formatCurrency(resultados.lucroTotal)}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700 pl-8">• Lucro Área Própria</td>
            <td className="px-4 py-3 text-right text-gray-700">
              {formatCurrency(resultados.lucroPropria)}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-700 pl-8">• Lucro Área Arrendada</td>
            <td className="px-4 py-3 text-right text-gray-700">
              {formatCurrency(resultados.lucroArrendada)}
            </td>
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
