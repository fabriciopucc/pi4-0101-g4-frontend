# Quem Resolve — código-fonte

Abra a pasta `quem-resolve` no VS Code. O projeto atual usa React/TypeScript, Vinext/Vite e um backend TypeScript para Cloudflare Workers. A migração para Java ainda será feita.

Leia primeiro `MIGRACAO-JAVA.md`: contém os arquivos de entrada e saída, todos os endpoints, exemplos JSON, regras de sessão, entidades e o protocolo WebSocket.

## Execução do projeto atual

O `package.json` exige Node >=22.13.0 e usa pnpm. Instale as dependências antes de executar o projeto. Se pnpm estiver disponível:

```powershell
pnpm install
pnpm build
pnpm exec wrangler d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_wonderful_white_queen.sql
pnpm dev
```

Aplique o SQL apenas na primeira criação do banco local; não reaplique em banco já inicializado. A construção gera a configuração usada pelo comando de banco. Abra o endereço informado no terminal. O banco local não é o banco do site publicado.

Se não tiver pnpm, instale-o conforme seu ambiente antes desses comandos. O script `install:ci` é destinado a Linux e não deve ser usado no PowerShell.

## Conteúdo

- `app/`: interface React e estilos.
- `lib/api.ts`: backend atual e contratos HTTP.
- `build/sites-worker.ts`: entrada HTTP e WebSocket.
- `db/` e `drizzle/`: esquema e migrações.
- `public/`: favicon e recursos públicos.
- Demais arquivos: dependências e configuração do projeto.

O ZIP não inclui node_modules, builds, caches, sessões, banco com usuários nem credenciais. Inclui o código-fonte versionado da versão publicada e estes dois guias. A identificação de hospedagem em `.openai/hosting.json` pertence ao site original; não a use para publicar outro projeto por engano. Não é necessário publicar para trabalhar no backend Java.

Os perfis de exemplo são dados ilustrativos no frontend; não são profissionais reais nem registros inseridos no banco.
