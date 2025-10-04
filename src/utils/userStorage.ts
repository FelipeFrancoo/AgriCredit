export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: string;
}

const USERS_STORAGE_KEY = 'agricredit_users';
const DEFAULT_ADMIN: User = {
  id: '1',
  name: 'Administrador',
  email: 'admin@agricredit.com',
  password: 'admin123',
  role: 'admin',
  createdAt: new Date().toISOString(),
};

// Inicializa o sistema com um admin padrão
export function initializeUsers(): void {
  if (typeof window === 'undefined') return;
  
  const users = getUsers();
  if (users.length === 0) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([DEFAULT_ADMIN]));
  }
}

// Obtém todos os usuários
export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    if (!users) {
      return [DEFAULT_ADMIN];
    }
    return JSON.parse(users);
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    return [DEFAULT_ADMIN];
  }
}

// Adiciona um novo usuário
export function addUser(user: Omit<User, 'id' | 'createdAt'>): User {
  const users = getUsers();
  
  // Verifica se o email já existe
  if (users.some(u => u.email === user.email)) {
    throw new Error('Email já cadastrado');
  }
  
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  
  return newUser;
}

// Atualiza um usuário existente
export function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): User {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) {
    throw new Error('Usuário não encontrado');
  }
  
  // Verifica se está tentando alterar email para um já existente
  if (updates.email && users.some(u => u.email === updates.email && u.id !== id)) {
    throw new Error('Email já cadastrado');
  }
  
  users[index] = { ...users[index], ...updates };
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  
  return users[index];
}

// Remove um usuário
export function deleteUser(id: string): void {
  const users = getUsers();
  
  // Não permite deletar o último admin
  const user = users.find(u => u.id === id);
  if (user?.role === 'admin') {
    const adminCount = users.filter(u => u.role === 'admin').length;
    if (adminCount <= 1) {
      throw new Error('Não é possível deletar o último administrador');
    }
  }
  
  const filteredUsers = users.filter(u => u.id !== id);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filteredUsers));
}

// Autentica um usuário
export function authenticateUser(email: string, password: string): User | null {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  return user || null;
}

// Verifica se um usuário é admin
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin';
}
