import clsx from 'clsx';
import { AlertCircle, CheckCircle, AlertTriangle } from './icons';

interface IndicatorBadgeProps {
  status: 'aprovado' | 'atencao' | 'reprovado';
  label: string;
  value: number | string;
  tooltip?: string;
}

export function IndicatorBadge({ status, label, value, tooltip }: IndicatorBadgeProps) {
  const statusConfig = {
    aprovado: {
      color: 'bg-green-100 text-green-800 border-green-300',
      icon: CheckCircle,
      iconColor: 'text-green-600',
    },
    atencao: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
    },
    reprovado: {
      color: 'bg-red-100 text-red-800 border-red-300',
      icon: AlertCircle,
      iconColor: 'text-red-600',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-4 px-8 py-5 rounded-lg border-2 font-medium w-full max-w-md',
        config.color
      )}
      title={tooltip}
    >
      <div className="flex items-center gap-3">
        <Icon className={clsx('w-8 h-8 flex-shrink-0', config.iconColor)} />
        <span className="text-sm font-semibold whitespace-nowrap">{label}</span>
      </div>
      <span className="text-3xl font-bold whitespace-nowrap ml-auto">{value}</span>
    </div>
  );
}
