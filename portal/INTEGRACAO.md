# Integrar a biblioteca 1.1 ao portal V1

Esta pasta contém **apenas arquivos novos e alterados**. Use como base o projeto completo `Sala_Dos_Buscadores.V1-main` fornecido pela equipe. Não execute o portal diretamente a partir desta atualização parcial.

1. Incorpore a pasta `design-system/` deste repositório ao projeto completo.
2. Incorpore os arquivos desta pasta `portal/` à pasta `portal/` existente, conciliando alterações mais recentes da equipe em configurações, layout, piloto e dependências.
3. Mantenha `design-system/` e `portal/` como pastas irmãs. O sincronizador e os caminhos dos estilos dependem dessa estrutura.
4. Se tiver aplicado o piloto anterior, retire o antigo `src/components/piloto/Estados.tsx` depois de conferir que não há importações dele. Os componentes compartilhados agora estão em `src/components/ds/`.
5. No portal completo, instale as dependências com o gerenciador adotado pela equipe, sincronize os estilos e execute as verificações.

```sh
cd portal
npm ci
npm run ds:sync
npm run ds:check
npm run dev
```

A prévia fica em `/piloto-ui` e preserva a autenticação existente do portal. Os cards usam o `CardSala` original e os dados de salas do projeto completo.

## Fontes compartilhadas

- Edite `../design-system/components/EstadosInterface/estados-interface.css`; `src/design-system/estados-interface.css` é a cópia gerada.
- Os componentes React mantêm estado, eventos e foco no React. Não carregue os runtimes HTML `bundle.js`, `refined.js` ou `estados-interface.js` sobre a interface React.
- `EstadoSecao`, `IconeVolume`, `ProgressoReal`, `CarregamentoSala` e `AvisoContextual` são exportados por `src/components/ds/EstadosInterface.tsx`.
- `DialogoContextual` e `IconeInterface` ficam em arquivos próprios na mesma pasta.

O [guia React](src/components/ds/README.md) descreve a biblioteca do **portal completo**, incluindo componentes existentes que não precisam ser substituídos por esta atualização.
