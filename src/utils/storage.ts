import { AnaliseCompleta } from '@/types';

const HISTORY_KEY = 'agricredit-history';
const MAX_HISTORY_SIZE = 10;

export function saveToHistory(analise: AnaliseCompleta): void {
  if (typeof window === 'undefined') return;
  
  try {
    const history = getHistory();
    history.unshift(analise);
    
    // Manter apenas os últimos itens
    if (history.length > MAX_HISTORY_SIZE) {
      history.splice(MAX_HISTORY_SIZE);
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Erro ao salvar no histórico:', error);
    throw new Error('Não foi possível salvar no histórico');
  }
}

export function getHistory(): AnaliseCompleta[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (!saved) return [];
    
    return JSON.parse(saved);
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Erro ao limpar histórico:', error);
    throw new Error('Não foi possível limpar o histórico');
  }
}

export function deleteFromHistory(index: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    const history = getHistory();
    history.splice(index, 1);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Erro ao deletar do histórico:', error);
    throw new Error('Não foi possível deletar do histórico');
  }
}
