# Sistema de Usuários - Admin e Usuário Comum

## 🔐 Tipos de Usuários

O sistema AgriCredit agora possui dois tipos de usuários com diferentes permissões:

### 👑 Administrador (Admin)
- **Permissões completas:**
  - Acesso total ao sistema de análise de crédito
  - Gerenciamento de usuários (adicionar, editar, deletar)
  - Visualização de todos os usuários cadastrados
  - Acesso à página de gerenciamento (`/admin/users`)

### 👤 Usuário Comum
- **Permissões limitadas:**
  - Acesso ao sistema de análise de crédito
  - Pode criar e visualizar análises
  - Acesso ao histórico de análises
  - **NÃO** pode gerenciar outros usuários

## 🚀 Credenciais Padrão

### Administrador Inicial
```
Email: admin@agricredit.com
Senha: admin123
```

> ⚠️ **Importante:** Este é o usuário administrador padrão criado automaticamente no primeiro acesso ao sistema.

## 📋 Funcionalidades do Sistema

### Para Administradores

#### 1. Gerenciar Usuários
- **Acessar:** Clique no botão "Gerenciar Usuários" no header
- **URL:** `/admin/users`

#### 2. Adicionar Novo Usuário
1. Na página de gerenciamento, clique em "Adicionar Usuário"
2. Preencha os dados:
   - Nome completo
   - Email (único no sistema)
   - Senha (mínimo 4 caracteres)
   - Tipo (Admin ou Usuário)
3. Clique em "Adicionar"

#### 3. Editar Usuário
1. Na lista de usuários, clique em "Editar"
2. Modifique os dados necessários
3. Para alterar a senha, digite uma nova (deixe em branco para manter a atual)
4. Clique em "Salvar"

#### 4. Deletar Usuário
1. Na lista de usuários, clique em "Deletar"
2. Confirme a ação

> ⚠️ **Proteção:** Não é possível deletar o último administrador do sistema.

### Para Todos os Usuários

- ✅ Realizar análises de crédito agrícola
- ✅ Visualizar histórico de análises
- ✅ Exportar relatórios em PDF
- ✅ Fazer logout do sistema

## 🎨 Interface

### Diferenças Visuais

**Administrador:**
- Badge "ADMIN" roxo ao lado do nome no header
- Botão "Gerenciar Usuários" visível no header
- Acesso à página de gerenciamento de usuários

**Usuário Comum:**
- Sem badge especial
- Botão de gerenciamento não aparece
- Redirecionado para home se tentar acessar `/admin/users`

## 🔒 Segurança

### Validações Implementadas

1. **Email único:** Não permite emails duplicados
2. **Senha mínima:** 4 caracteres
3. **Proteção de admin:** Não permite deletar o último administrador
4. **Verificação de role:** Apenas admins acessam páginas administrativas
5. **Persistência segura:** Dados salvos em localStorage

### Fluxo de Autenticação

```
Login → Verificação de credenciais → 
→ Se Admin: Acesso completo + Gerenciamento
→ Se Usuário: Acesso ao sistema apenas
```

## 📊 Estrutura de Dados

### Interface User

```typescript
interface User {
  id: string;              // ID único gerado automaticamente
  name: string;            // Nome completo do usuário
  email: string;           // Email (único)
  password: string;        // Senha (em produção, deve ser hash)
  role: 'admin' | 'user';  // Tipo de usuário
  createdAt: string;       // Data de criação (ISO)
}
```

## 🛠️ Arquivos Modificados/Criados

```
src/
├── utils/
│   └── userStorage.ts                 ✨ NOVO - Gerenciamento de usuários
├── contexts/
│   └── AuthContext.tsx                🔄 ATUALIZADO - Suporte a roles
├── components/
│   └── Header.tsx                     🔄 ATUALIZADO - Badge admin + botão
├── app/
│   ├── login/
│   │   └── page.tsx                   🔄 ATUALIZADO - Credenciais de teste
│   └── admin/
│       └── users/
│           └── page.tsx               ✨ NOVO - Gerenciamento de usuários
```

## 📝 Como Usar

### 1. Iniciar o Sistema

```bash
cd agricredit
npm run dev
```

### 2. Fazer Login como Admin

1. Acesse `http://localhost:3001`
2. Use as credenciais do admin:
   - Email: `admin@agricredit.com`
   - Senha: `admin123`

### 3. Criar Primeiro Usuário Comum

1. No header, clique em "Gerenciar Usuários"
2. Clique em "Adicionar Usuário"
3. Preencha:
   ```
   Nome: João Silva
   Email: joao@email.com
   Senha: joao123
   Tipo: Usuário
   ```
4. Clique em "Adicionar"

### 4. Testar com Usuário Comum

1. Faça logout
2. Faça login com:
   - Email: `joao@email.com`
   - Senha: `joao123`
3. Observe que o botão "Gerenciar Usuários" não aparece

## 🔄 Funcionalidades Futuras

- [ ] Hash de senhas (bcrypt)
- [ ] Recuperação de senha via email
- [ ] Logs de ações administrativas
- [ ] Permissões granulares (visualização, edição, exclusão)
- [ ] Exportação de lista de usuários
- [ ] Filtros e busca na lista de usuários
- [ ] Auditoria de alterações
- [ ] Integração com backend/API

## ⚠️ Observações Importantes

1. **Desenvolvimento:** Atualmente usa localStorage (não recomendado para produção)
2. **Senhas:** Armazenadas em texto plano (implementar hash em produção)
3. **Validação:** Validação básica implementada (expandir conforme necessário)
4. **Último Admin:** Sistema protege contra remoção do último administrador

## 🆘 Solução de Problemas

### Não consigo fazer login
- Verifique se as credenciais estão corretas
- Limpe o localStorage e recarregue a página
- Use as credenciais padrão do admin

### Botão de gerenciar usuários não aparece
- Verifique se você está logado como admin
- Confira o badge "ADMIN" ao lado do seu nome

### Erro ao adicionar usuário
- Email já pode estar cadastrado
- Senha deve ter pelo menos 4 caracteres
- Todos os campos são obrigatórios

### Como resetar o sistema
Execute no console do navegador (F12):
```javascript
localStorage.removeItem('agricredit_users');
localStorage.removeItem('currentUser');
location.reload();
```

## 📞 Suporte

Para questões técnicas ou sugestões, consulte a equipe de desenvolvimento.

---

**Versão:** 2.0.0  
**Data:** Outubro de 2025  
**Sistema:** AgriCredit - Análise de Crédito Agrícola
