# Contagem regressiva + livro de mensagens do casamento

Site para **17 de outubro de 2026, às 18h**, com contagem regressiva e um livro de mensagens compartilhado entre todos os convidados.

## Como funciona o livro de mensagens

O site continua estático no Render, mas as mensagens são gravadas em um banco PostgreSQL no **Supabase**. Assim, uma mensagem enviada por um convidado aparece também para os demais visitantes.

A integração usa apenas uma chave pública/publishable no navegador. A tabela possui **Row Level Security (RLS)** e concede aos visitantes somente `SELECT` e `INSERT`; o site não recebe permissão para editar ou apagar registros.

## Arquivos importantes

- `index.html` — página, layout, contagem regressiva e integração com o livro.
- `couple-v2.jpg` — fotografia usada no site.
- `guestbook-config.js` — URL e chave pública do projeto Supabase.
- `supabase.sql` — cria a tabela e as regras de segurança.
- `render.yaml` — configuração do site estático no Render.

## Ativação do livro de mensagens

### 1. Crie um projeto no Supabase

Acesse o Supabase, crie um projeto e aguarde o banco ficar disponível.

### 2. Crie a tabela e as políticas

No painel do projeto, abra **SQL Editor**, copie todo o conteúdo de `supabase.sql` e execute.

Isso cria `public.guestbook_messages`, ativa RLS e libera apenas leitura e inserção públicas.

### 3. Copie a URL e a chave pública

No painel do Supabase, encontre a **Project URL** e a chave **Publishable** (ou `anon`, em projetos que ainda usam esse nome).

Abra `guestbook-config.js` e substitua:

```js
window.GUESTBOOK_CONFIG = {
  supabaseUrl: "COLE_AQUI_A_URL_DO_SEU_PROJETO",
  supabaseAnonKey: "COLE_AQUI_A_CHAVE_PUBLISHABLE_OU_ANON"
};
```

A chave usada aqui deve ser a chave pública/publishable. **Nunca coloque a `service_role` ou uma secret key no site.**

### 4. Envie os arquivos ao GitHub

Substitua os arquivos do repositório pelos desta pasta e faça commit/push. O Render continuará publicando automaticamente.

## Moderação

As novas mensagens ficam visíveis automaticamente. Se precisar ocultar alguma, abra a tabela `guestbook_messages` no Supabase e altere `is_visible` para `false`. Como a política de leitura só retorna linhas com `is_visible = true`, ela desaparecerá do site.

## Observação sobre spam

O formulário inclui um campo honeypot para bots simples, limites de tamanho no navegador e também `CHECK` constraints no banco. Para uma proteção forte contra spam automatizado, seria possível adicionar CAPTCHA/Turnstile ou um pequeno backend com rate limiting posteriormente.
