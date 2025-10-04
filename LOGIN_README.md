# Sistema de Login - AgriCredit

## 📋 Descrição

Sistema de autenticação minimalista e centralizado para o AgriCredit. A tela de login foi desenvolvida com React, Next.js e Tailwind CSS, proporcionando uma experiência visual limpa e moderna.

## ✨ Características

- **Design Minimalista**: Interface limpa e focada na experiência do usuário
- **Centralizado**: Layout responsivo que se adapta a diferentes tamanhos de tela
- **Proteção de Rotas**: Todas as páginas principais estão protegidas por autenticação
- **Persistência**: O estado de login é mantido usando localStorage
- **Header Personalizado**: Exibe informações do usuário e opção de logout

## 🚀 Como Usar

### 1. Iniciar o servidor de desenvolvimento

```bash
cd agricredit
npm run dev
```

### 2. Acessar o sistema

Abra o navegador em `http://localhost:3000`

### 3. Fazer Login

Na tela de login, você pode usar qualquer email válido e senha com no mínimo 4 caracteres.

**Exemplo:**
- Email: `usuario@agricredit.com`
- Senha: `1234` (ou qualquer senha com 4+ caracteres)

## 🔐 Funcionalidades de Autenticação

### Login
- Validação de email
- Validação de senha (mínimo 4 caracteres)
- Feedback visual de erros
- Estado de carregamento durante o login

### Proteção de Rotas
- Páginas protegidas automaticamente redirecionam para `/login`
- Usuários não autenticados não podem acessar o sistema

### Logout
- Botão de logout disponível no header
- Limpa os dados de autenticação
- Redireciona para a página de login

## 📁 Estrutura de Arquivos

```
src/
├── contexts/
│   └── AuthContext.tsx          # Contexto de autenticação
├── components/
│   ├── ProtectedRoute.tsx       # Componente de proteção de rotas
│   └── Header.tsx               # Header com informações do usuário
├── app/
│   ├── login/
│   │   └── page.tsx             # Página de login
│   ├── page.tsx                 # Página principal (protegida)
│   └── historico/
│       └── page.tsx             # Página de histórico (protegida)
```

## 🎨 Design

O sistema de login apresenta:

- **Gradiente de fundo**: Verde e azul suave
- **Card centralizado**: Com sombras e bordas arredondadas
- **Ícone personalizado**: Representando usuários
- **Campos de entrada**: Com efeitos de foco e transições suaves
- **Botão de ação**: Com estados de hover e loading
- **Mensagens de erro**: Com feedback visual claro

## 🔄 Fluxo de Autenticação

1. **Usuário acessa o sistema** → Redirecionado para `/login` se não autenticado
2. **Usuário faz login** → Credenciais validadas
3. **Login bem-sucedido** → Redirecionado para página principal
4. **Navegação protegida** → Todas as páginas verificam autenticação
5. **Logout** → Dados limpos e redirecionamento para login

## 🛠️ Personalização

Para modificar o comportamento do login, edite o arquivo:
- `src/contexts/AuthContext.tsx`

Para modificar a aparência da tela de login, edite:
- `src/app/login/page.tsx`

## 📝 Observações

- O sistema atual usa autenticação **local** (localStorage)
- Para produção, considere implementar:
  - Autenticação com API backend
  - Tokens JWT
  - Refresh tokens
  - Autenticação com NextAuth.js

## 🔜 Melhorias Futuras

- [ ] Integração com API de autenticação real
- [ ] Recuperação de senha
- [ ] Cadastro de novos usuários
- [ ] Autenticação de dois fatores (2FA)
- [ ] Login com redes sociais (OAuth)
- [ ] Diferentes níveis de permissão (admin/usuário)

## 📞 Suporte

Para questões ou sugestões, entre em contato com a equipe de desenvolvimento.

---

**Versão:** 1.0.0  
**Data:** Outubro de 2025
