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
        'inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium',
        config.color
      )}
      title={tooltip}
    >
      <Icon className={clsx('w-5 h-5', config.iconColor)} />
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-wide">{label}</span>
        <span className="text-lg font-bold">{value}</span>
      </div>
    </div>
  );
}
