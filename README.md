# A Sala dos Buscadores · Biblioteca de interface

Versão **1.1** da biblioteca aprovada para o portal, com **69 componentes**, quatro temas e exemplos interativos. Os cards de salas mantêm o desenho original do design system.

## Abrir o catálogo

Abra [`design-system/catalogo.html`](design-system/catalogo.html) no navegador após baixar ou clonar este repositório. O catálogo funciona por arquivo local ou por um servidor HTTP estático.

```sh
git clone https://github.com/gustavoffca-code/Sala_BuscadoresV3.git
cd Sala_BuscadoresV3
python -m http.server 3114 --directory design-system
```

Acesse `http://localhost:3114/catalogo.html`. Para visualizar o catálogo, não é necessário instalar dependências JavaScript.

## O que foi atualizado

- **EstadoSecao:** container comum para seções vazias, busca sem resultados e falhas, com ícone, mensagem e ação contextuais.
- **CarregamentoSala:** estrutura da página durante o carregamento.
- **ProgressoReal:** barra em degradê baseada em etapas concluídas e total conhecido.
- **IconeInterface e IconeVolume:** ícones Lucide simples nos controles e ícones em camadas neutras, com sombra e detalhes da marca, nos estados e diálogos.
- **AvisoContextual e DialogoContextual:** componentes reutilizáveis de orientação.
- **Navegação lateral:** cantos de 8 px e seleção em degradê horizontal.

`CardSala` e suas variantes preservam o design original. A adoção dos novos estados nas demais telas do produto fica disponível aos desenvolvedores; esta entrega não migra todo o dashboard.

## Organização

| Pasta | Conteúdo |
| --- | --- |
| [`design-system/`](design-system/README.md) | Biblioteca completa em HTML, CSS e JavaScript, com fontes, tokens, componentes, documentação e catálogo. |
| [`portal/`](portal/INTEGRACAO.md) | Arquivos novos e alterados para integrar a versão 1.1 ao portal V1 existente, incluindo os componentes React e a tela `/piloto-ui`. É uma atualização parcial, não uma aplicação independente. |

Consulte as [diretrizes de interface](design-system/DIRETRIZES.md), o [guia dos componentes React](portal/src/components/ds/README.md) e as [instruções de integração](portal/INTEGRACAO.md).

## Gerar e conferir a biblioteca

Com Node.js instalado:

```sh
node design-system/scripts/build.mjs
node design-system/scripts/build.mjs --check
node design-system/scripts/contraste.mjs
```

Edite as fontes dos componentes e `tokens.json`. O gerador atualiza o catálogo, os exemplos e os arquivos derivados. Os novos estilos têm uma fonte única em `design-system/components/EstadosInterface/estados-interface.css`.

Os SVGs Lucide já estão incluídos e têm [licença própria](design-system/components/EstadosInterface/LICENCA-LUCIDE.txt). Regenerá-los com `importar-icones-interface.mjs` exige o portal completo e suas dependências instaladas na pasta irmã `portal`.

## Validação da entrega

O catálogo e a sincronização dos estilos passaram nas verificações de geração. No portal V1 integrado, TypeScript e a análise dos arquivos alterados passaram; os testes existentes de navegação e diálogos passaram (7 testes). Estados, progresso, quatro temas, diálogos, cards originais e comportamento do catálogo em tela de 390 px foram conferidos no navegador.

O verificador de contraste aprovou os pares de texto dos tokens nos quatro temas. O build de produção do portal não foi executado nesta rodada.
