import { Config } from '@/types';

export const defaultConfig: Config = {
  rendimentos: {
    boa: 70,      // sc/ha para soja
    medio: 60,    // sc/ha para soja
    baixa: 50,    // sc/ha para soja
  },
  rendimentosMilho: {
    boa: 120,     // sc/ha para milho
    medio: 100,   // sc/ha para milho
    baixa: 80,    // sc/ha para milho
  },
  thresholds: {
    custeio: {
      aprovado: 0.5,    // < 0.5 aprovado (verde)
      atencao: 0.7,     // 0.5-0.7 atenção (amarelo), > 0.7 reprovado (vermelho)
    },
    investimento: {
      aprovado: 0.5,    // < 0.5 aprovado (verde)
      atencao: 0.7,     // 0.5-0.7 atenção (amarelo), > 0.7 reprovado (vermelho)
    },
  },
};

// Função para carregar config personalizada (do localStorage ou API)
export function loadConfig(): Config {
  if (typeof window === 'undefined') return defaultConfig;
  
  try {
    const saved = localStorage.getItem('agricredit-config');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Erro ao carregar configuração:', error);
  }
  
  return defaultConfig;
}

// Função para salvar config personalizada
export function saveConfig(config: Config): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('agricredit-config', JSON.stringify(config));
  } catch (error) {
    console.error('Erro ao salvar configuração:', error);
  }
}
