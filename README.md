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

## Conectar com Supabase (salvar dados online)

O projeto ja esta preparado para sincronizar os dados de eventos/mesas/reservas/fotos no Supabase.

1. Crie um projeto em `https://supabase.com`.
2. No SQL Editor, rode:

```sql
create table if not exists public.app_state (
	id text primary key,
	state_json jsonb not null,
	updated_at timestamptz not null default now()
);

grant usage on schema public to anon;
grant select, insert, update on table public.app_state to anon;

alter table public.app_state enable row level security;

drop policy if exists "public read app_state" on public.app_state;
create policy "public read app_state"
on public.app_state
for select
to anon
using (true);

drop policy if exists "public insert app_state" on public.app_state;
create policy "public insert app_state"
on public.app_state
for insert
to anon
with check (true);

drop policy if exists "public update app_state" on public.app_state;
create policy "public update app_state"
on public.app_state
for update
to anon
using (true)
with check (true);
```

3. Abra `assets/js/supabase-config.js` e preencha:
- `url`: Project URL do Supabase
- `anonKey`: chave anon/publica do Supabase

4. Faça deploy novamente na Vercel.

Observacao: com essa configuracao, qualquer pessoa que conheca sua URL pode gravar dados na tabela. Para seguranca forte, o ideal e proteger gravacao com autenticacao ou Edge Function.

## URLs apos publicar

- Site principal: `https://seu-dominio/`
- Menu (QR Code): `https://seu-dominio/diretoria-menu`
- Admin: `https://seu-dominio/diretoria-admin`
