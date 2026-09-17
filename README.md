# Contagem regressiva para o casamento

Site estático com contagem regressiva para **17 de outubro de 2026, às 18h**, no horário de Brasília.

## Arquivos

- `index.html`: página completa, estilos e contagem regressiva.
- `couple-v2.jpg`: fotografia usada no site (nome versionado para evitar cache da imagem anterior).
- `render.yaml`: configuração para publicação automática no Render.

## 1. Publicar no GitHub

1. Acesse [github.com/new](https://github.com/new).
2. Crie um repositório, por exemplo: `contagem-regressiva-casamento`.
3. Abra o repositório e selecione **Add file → Upload files**.
4. Envie todos os arquivos desta pasta, inclusive `render.yaml`.
5. Clique em **Commit changes**.

Também é possível publicar pelo terminal:

```bash
git init
git add .
git commit -m "Publica contagem regressiva do casamento"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/contagem-regressiva-casamento.git
git push -u origin main
```

## 2. Publicar no Render

### Opção recomendada: Blueprint

1. Acesse o painel do [Render](https://dashboard.render.com/).
2. Selecione **New → Blueprint**.
3. Conecte o repositório criado no GitHub.
4. O Render reconhecerá o arquivo `render.yaml`.
5. Confirme a criação do serviço.

### Opção manual: Static Site

1. No Render, selecione **New → Static Site**.
2. Conecte o repositório do GitHub.
3. Use estes valores:
   - **Build Command:** `echo "Site estático pronto"`
   - **Publish Directory:** `.`
4. Clique em **Create Static Site**.

Quando a publicação terminar, o Render fornecerá um endereço público terminado em `.onrender.com`. Os visitantes não precisarão de conta nem de login para acessar o site.

Cada novo commit enviado para a branch principal será publicado automaticamente.
