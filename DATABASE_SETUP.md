# 🗄️ Banco de Dados com Prisma + PostgreSQL

## ✅ Implementação Concluída!

O AgriCredit agora usa **Prisma ORM** com **PostgreSQL** para armazenamento de dados em nuvem.

## 🎯 O que mudou?

### Antes (localStorage):
- ❌ Dados apenas no navegador
- ❌ Não compartilhado entre dispositivos
- ❌ Pode ser apagado ao limpar cache
- ❌ Sem segurança real

### Agora (Prisma + PostgreSQL):
- ✅ Dados no banco de dados em nuvem
- ✅ Compartilhado entre TODOS os dispositivos
- ✅ Persistente e seguro
- ✅ Senhas criptografadas com bcrypt
- ✅ Type-safe com TypeScript

## 📊 Estrutura do Banco de Dados

### Tabela: `users`
```sql
- id          (String, UUID)
- name        (String)
- email       (String, unique)
- password    (String, hashed)
- role        (ADMIN | USER)
- createdAt   (DateTime)
- updatedAt   (DateTime)
```

### Tabela: `analises_credito`
```sql
- id                  (String, UUID)
- userId              (String, FK -> users.id)
- nomeProprietario    (String)
- cpf                 (String)
- areaPropria         (Float)
- areaArrendada       (Float)
- talhoes             (JSON)
- custos              (JSON)
- dividas             (JSON)
- resultados          (JSON)
- createdAt           (DateTime)
- updatedAt           (DateTime)
```

## 🔐 Credenciais Padrão

**Admin criado automaticamente:**
- **Email:** `admin@agricredit.com`
- **Senha:** `admin123`

⚠️ **IMPORTANTE:** Altere a senha padrão em produção!

## 🛠️ Comandos Disponíveis

### Desenvolvimento

```bash
# Rodar o projeto
npm run dev

# Ver banco de dados visualmente (Prisma Studio)
npm run db:studio

# Criar uma nova migração
npm run db:migrate

# Popular banco com usuário admin
npm run db:seed

# Push schema sem criar migração (desenvolvimento)
npm run db:push
```

### Produção

```bash
# Gerar o Prisma Client
npx prisma generate

# Aplicar migrações
npx prisma migrate deploy
```

## 🌐 APIs Disponíveis

### Autenticação

#### POST `/api/auth/login`
Faz login no sistema

**Request:**
```json
{
  "email": "admin@agricredit.com",
  "password": "admin123"
}
```

**Response (Success):**
```json
{
  "id": "clxxx...",
  "name": "Administrador",
  "email": "admin@agricredit.com",
  "role": "ADMIN"
}
```

### Usuários

#### GET `/api/users`
Lista todos os usuários (sem senha)

**Response:**
```json
[
  {
    "id": "clxxx...",
    "name": "Administrador",
    "email": "admin@agricredit.com",
    "role": "ADMIN",
    "createdAt": "2025-01-05T00:00:00.000Z",
    "updatedAt": "2025-01-05T00:00:00.000Z"
  }
]
```

#### POST `/api/users`
Cria novo usuário

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123",
  "role": "user"
}
```

#### PUT `/api/users`
Atualiza usuário

**Request:**
```json
{
  "id": "clxxx...",
  "name": "João Silva Atualizado",
  "email": "joao.novo@example.com",
  "password": "novaSenha123",
  "role": "admin"
}
```

#### DELETE `/api/users?id=xxx`
Deleta usuário

## 🔒 Segurança

### Senhas
- ✅ **Hashed com bcrypt** (10 rounds)
- ✅ Nunca retornadas nas APIs
- ✅ Validação de força pode ser adicionada

### Proteções
- ✅ Não pode deletar o último admin
- ✅ Email único (não permite duplicados)
- ✅ Validação de campos obrigatórios
- ✅ Tratamento de erros completo

## 📁 Arquivos Criados/Modificados

### Novos Arquivos:
```
prisma/
  ├── schema.prisma          # Schema do banco de dados
  ├── seed.ts                # Script para popular banco
  └── migrations/            # Histórico de migrações

src/
  ├── lib/
  │   └── prisma.ts          # Cliente Prisma configurado
  └── app/
      └── api/
          ├── auth/
          │   └── login/
          │       └── route.ts  # API de autenticação
          └── users/
              └── route.ts      # API de usuários (reescrita)
```

### Arquivos Modificados:
```
.env                         # Conexão do banco
package.json                 # Scripts adicionados
src/contexts/AuthContext.tsx # Usa nova API
```

## 🚀 Deploy no Vercel

### Variáveis de Ambiente

Adicione no Vercel Dashboard:

```env
DATABASE_URL="postgres://f5d9cc121931a6d9a1d1a88cb81177aae0e2da9d27f8e55e330c0d63334a8eef:sk_xe6kLeoGD34cnMWVD4rPk@db.prisma.io:5432/postgres?sslmode=require"

NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="https://seu-dominio.vercel.app"
```

### Build Commands

O Vercel vai executar automaticamente:
```bash
npx prisma generate  # Gera o client
npm run build        # Build do Next.js
```

### Post-Deploy

Após o primeiro deploy, rode uma vez:
```bash
npx prisma migrate deploy  # Aplica migrações
npx prisma db seed         # Cria admin padrão
```

## 🎨 Prisma Studio

Veja e edite seus dados visualmente:

```bash
npm run db:studio
```

Abre em: http://localhost:5555

## 📚 Próximos Passos

### Implementar API de Análises

```typescript
// src/app/api/analises/route.ts
// Salvar análises no banco de dados
```

### Adicionar Relacionamentos

```typescript
// Buscar usuário com suas análises
const userWithAnalises = await prisma.user.findUnique({
  where: { id },
  include: {
    analises: {
      orderBy: { createdAt: 'desc' },
      take: 10,
    },
  },
});
```

### Melhorias de Segurança

- [ ] JWT tokens para sessões
- [ ] Rate limiting nas APIs
- [ ] Validação de senha forte
- [ ] 2FA (autenticação de dois fatores)
- [ ] Logs de auditoria

## 🆘 Problemas Comuns

### Erro: "Can't reach database server"

**Solução:**
1. Verifique a `DATABASE_URL` no `.env`
2. Confirme que o banco está acessível
3. Teste a conexão: `npx prisma db pull`

### Erro: "PrismaClient is not configured"

**Solução:**
```bash
npx prisma generate
```

### Migrações fora de sincronia

**Solução:**
```bash
npx prisma migrate reset  # ⚠️ APAGA TODOS OS DADOS
npx prisma migrate dev
npm run db:seed
```

## 📖 Documentação

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**Sistema implementado com sucesso!** 🎉

Agora todos os usuários que acessarem o sistema verão os mesmos dados, independente do dispositivo!
