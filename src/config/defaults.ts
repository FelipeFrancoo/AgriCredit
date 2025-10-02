import { Config } from '@/types';

export const defaultConfig: Config = {
  rendimentos: {
    boa: 70,      // sc/ha
    medio: 60,    // sc/ha
    baixa: 50,    // sc/ha
  },
  thresholds: {
    custeio: {
      aprovado: 0.2,    // <= 0.2 aprovado
      atencao: 0.5,     // 0.2-0.5 atenção, > 0.5 reprovado
    },
    investimento: {
      aprovado: 0.5,    // < 0.5 aprovado
      atencao: 0.7,     // 0.5-0.7 atenção, > 0.7 reprovado
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
