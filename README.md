# Via Paris Site

Site organizado em pastas para facilitar manutencao.

## Estrutura

- `index.html`: estrutura principal do site
- `diretoria-menu/index.html`: cardapio em URL separada (para QR Code)
- `diretoria-admin/index.html`: painel admin em URL separada
- `assets/css/style.css`: visual e responsividade
- `assets/js/app.js`: menu, galeria e interacoes
- `assets/images/`: logo e fotos
- `vercel.json`: configuracao de publicacao na Vercel

## Como gerenciar

1. Trocar logo:
- Substitua `assets/images/logo.png` (cabecalho)
- Opcional: troque `assets/images/logo-alt.png` (rodape)

2. Gerenciar menu (somente via URL dedicada):
- Abra `diretoria-menu/index.html`
- Compartilhe apenas essa URL no QR Code do cardapio

3. Gerenciar admin (somente via URL dedicada):
- Abra `diretoria-admin/index.html`
- Login com PIN (padrao: `1234`)
- Agora os flyers e fotos podem ser enviados por `arrastar/soltar` ou selecionando arquivo (upload)

4. Contato e reserva:
- No `index.html`, procure por links de `WhatsApp` e `tel:` e ajuste para seu numero

## Publicacao rapida

- Abra `index.html` no navegador para testar localmente.
- Para publicar na Vercel:
- Instale a CLI: `npm i -g vercel`
- No terminal, dentro da pasta do projeto: `vercel`
- Faça login na conta Vercel e confirme os prompts
- Para publicar em producao: `vercel --prod`

## URLs apos publicar

- Site principal: `https://seu-dominio/`
- Menu (QR Code): `https://seu-dominio/diretoria-menu`
- Admin: `https://seu-dominio/diretoria-admin`
