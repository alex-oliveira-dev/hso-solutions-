# HSO Solutions

Aplicação web desenvolvida com Next.js, React, TypeScript e TailwindCSS, focada em soluções tecnológicas inovadoras para negócios. Inclui formulário de contato com envio de e-mail via Nodemailer.

## Visão Geral
- **Frontend:** Next.js, React, TypeScript
- **Estilização:** TailwindCSS
- **Envio de E-mail:** API com Nodemailer
- **Componentização:** Radix UI, componentes customizados

## Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repo>
   cd Site- HSO-SOLUTIONS
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   pnpm install
   ```
3. **Configuração das variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz com as seguintes variáveis:
   ```env
   SMTP_USER=seu_email@provedor.com
   SMTP_PASSWORD=sua_senha
   SMTP_HOST=smtp.provedor.com
   SMTP_PORT=587
   ```
4. **Execute o projeto em modo desenvolvimento:**
   ```bash
   npm run dev
   ```
   O site estará disponível em `http://localhost:3000`.

## Estrutura de Pastas
- `app/` — Páginas, layout e API (inclui o endpoint de envio de e-mail)
- `components/` — Componentes reutilizáveis (UI, formulários, etc)
- `hooks/` — Hooks customizados
- `lib/` — Funções utilitárias
- `public/` — Imagens e arquivos estáticos
- `styles/` — Estilos globais (Tailwind)

## Envio de E-mail
O formulário de contato envia dados para `/api/send-email`, que utiliza Nodemailer para encaminhar a mensagem ao e-mail configurado nas variáveis de ambiente.

## Scripts
- `npm run dev` — Executa em modo desenvolvimento
- `npm run build` — Gera build de produção
- `npm run start` — Inicia build de produção
- `npm run lint` — Analisa o código com linter

## Tecnologias Principais
- Next.js
- React
- TypeScript
- TailwindCSS
- Nodemailer
- Radix UI

## Documentação para Manutenção

### Atualização de Dependências
- Utilize `npm update` ou `pnpm update` para atualizar pacotes.
- Verifique o `package.json` para dependências principais.

### Adição de Novos Componentes
- Crie novos arquivos em `components/`.
- Siga o padrão de importação e exportação dos componentes existentes.

### Estilização
- Utilize classes utilitárias do Tailwind.
- Para temas, ajuste as variáveis em `app/globals.css` e `tailwind.config.ts`.

### API de E-mail
- Endpoint: `app/api/send-email/route.js`
- Para alterar o provedor SMTP, ajuste as variáveis de ambiente e a configuração do Nodemailer.
- Logs de debug estão presentes para facilitar troubleshooting.

### Boas Práticas
- Mantenha o código tipado (TypeScript).
- Utilize componentes reutilizáveis.
- Documente funções e componentes complexos.
- Teste o formulário de contato após alterações na API.

### Deploy
- Gere o build com `npm run build`.
- Suba os arquivos para o servidor de sua escolha (Vercel, Netlify, etc).
- Garanta que as variáveis de ambiente estejam configuradas no ambiente de produção.

## Fluxo de Atualização

### 1. Atualização de Dependências
1. Verifique dependências desatualizadas:
   ```bash
   npm outdated
   # ou
   pnpm outdated
   ```
2. Atualize as dependências:
   ```bash
   npm update
   # ou
   pnpm update
   ```
3. Para atualizar dependências específicas (exemplo: Next.js):
   ```bash
   npm install next@latest
   # ou
   pnpm add next@latest
   ```
4. Após atualizar, rode o projeto localmente para garantir que tudo funciona:
   ```bash
   npm run dev
   ```

### 2. Atualização do Código
- Crie uma nova branch para alterações:
  ```bash
  git checkout -b update/descricao-da-mudanca
  ```
- Implemente as mudanças necessárias (componentes, páginas, hooks, etc).
- Adicione comentários e documentação para facilitar futuras manutenções.
- Faça commit das alterações:
  ```bash
  git add .
  git commit -m "Descrição clara da atualização"
  git push origin update/descricao-da-mudanca
  ```

### 3. Testes
- Teste manualmente as principais funcionalidades (formulário, navegação, envio de e-mail, etc).
- Se possível, adicione ou atualize testes automatizados.
- Verifique se não há erros no console do navegador e do servidor.

### 4. Revisão de Código
- Peça para outro desenvolvedor revisar o código (se aplicável).
- Garanta que o padrão de código e boas práticas estão sendo seguidos.

### 5. Deploy
- Gere o build de produção:
  ```bash
  npm run build
  ```
- Faça o deploy no ambiente de produção (Vercel, Netlify, servidor próprio, etc).
- Garanta que as variáveis de ambiente estejam atualizadas no ambiente de produção.

### 6. Pós-Deploy
- Teste novamente as principais funcionalidades em produção.
- Monitore logs e erros (principalmente do endpoint de e-mail).
- Documente as mudanças realizadas no README ou em um CHANGELOG.

### 7. Checklist Rápido
- [ ] Dependências atualizadas
- [ ] Código revisado e testado
- [ ] Build gerado sem erros
- [ ] Deploy realizado
- [ ] Funcionalidades testadas em produção
- [ ] Documentação atualizada

---

Desenvolvido por HSO Solutions — Soluções em Software.
