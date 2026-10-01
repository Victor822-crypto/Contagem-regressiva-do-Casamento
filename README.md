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


## Envio de fotos para o Google Drive

O site agora possui uma aba **Fotos** com nome do convidado e seleção de imagem. As fotos são enviadas para a pasta do Google Drive dos noivos por meio de um pequeno Google Apps Script.

1. Acesse https://script.google.com e crie um novo projeto.
2. Copie o conteúdo de `google-apps-script.gs` para o editor.
3. Em **Configurações do projeto**, ajuste o fuso horário para **(GMT-03:00) Brasília**.
4. Clique em **Implantar > Nova implantação > Aplicativo da Web**.
5. Em **Executar como**, escolha **Eu**.
6. Em **Quem pode acessar**, escolha **Qualquer pessoa**.
7. Autorize o acesso ao Google Drive quando solicitado e conclua a implantação.
8. Copie a URL do aplicativo da Web, que termina em `/exec`.
9. Abra `photo-upload-config.js` e substitua `COLE_AQUI_A_URL_DO_WEB_APP` pela URL copiada.
10. Faça commit/push dos arquivos atualizados.

A pasta usada no script é a pasta informada para receber as fotos. O arquivo salvo recebe o nome do convidado, data/hora e o nome original do arquivo. O limite configurado é de **15 MB por foto**.

> Importante: o link público da pasta do Drive, sozinho, não permite que um site estático envie arquivos automaticamente. O Apps Script funciona como a ponte autorizada entre o site e a pasta dos noivos.
