import { Talhao } from '@/types';
import { Trash2, Plus } from './icons';

interface TalhaoListProps {
  talhoes: Talhao[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof Talhao, value: any) => void;
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

// Função para remover formatação
const parseNumberInput = (value: string): number => {
  if (!value) return 0;
  const cleaned = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};

export function TalhaoList({ talhoes, onAdd, onRemove, onChange }: TalhaoListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Talhões / Safras</h3>
        <button
          type="button"
          onClick={onAdd}
          className="btn-action btn-add"
        >
          <Plus className="w-4 h-4" />
          Adicionar Talhão
        </button>
      </div>

      {talhoes.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          Nenhum talhão adicionado. Clique em "Adicionar Talhão" para começar.
        </p>
      )}

      {talhoes.map((talhao, index) => (
        <div
          key={talhao.id}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <h4 className="font-medium text-gray-700">Talhão {index + 1}</h4>
              {(talhao.areaPropria > 0 || talhao.areaArrendada > 0) && (
                <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                  Total: {formatNumberInput((talhao.areaPropria + talhao.areaArrendada).toString())} ha
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => onRemove(talhao.id)}
              className="btn-action btn-remove"
              title="Remover talhão"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Área em Propriedade Própria (ha)
              </label>
              <input
                type="text"
                value={talhao.areaPropria === 0 ? '' : formatNumberInput(talhao.areaPropria.toString())}
                onChange={(e) => {
                  const formatted = formatNumberInput(e.target.value);
                  const numericValue = parseNumberInput(formatted);
                  onChange(talhao.id, 'areaPropria', numericValue);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder=""
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Área em Propriedade Arrendada (ha)
              </label>
              <input
                type="text"
                value={talhao.areaArrendada === 0 ? '' : formatNumberInput(talhao.areaArrendada.toString())}
                onChange={(e) => {
                  const formatted = formatNumberInput(e.target.value);
                  const numericValue = parseNumberInput(formatted);
                  onChange(talhao.id, 'areaArrendada', numericValue);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder=""
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cultura
              </label>
              <select
                value={talhao.cultura}
                onChange={(e) => onChange(talhao.id, 'cultura', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="soja">Soja</option>
                <option value="milho">Milho</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Região / Qualidade
              </label>
              <select
                value={talhao.regiao}
                onChange={(e) => onChange(talhao.id, 'regiao', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="boa">Boa (70 sc/ha)</option>
                <option value="medio">Médio (60 sc/ha)</option>
                <option value="baixa">Baixa (50 sc/ha)</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
