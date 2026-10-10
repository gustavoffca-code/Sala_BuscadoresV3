# Iconografia

Dois níveis aprovados na versão 1.1: Lucide simples para navegação e pesquisa; ícones neutros com volume e sombra para estados, avisos e diálogos.

- Primeiro nível em React: `<IconeInterface simbolo="busca" tamanho={20} />`, de `@/components/ds/IconeInterface`. Símbolos: busca, inicio, biblioteca, salas, historico, ajustes, notificacoes, livro e seta.
- Primeiro nível em HTML: `<span data-ui-icon="busca"></span>`, com o CSS e runtime de EstadosInterface.
- Segundo nível: consulte [IconeVolume](../IconeVolume/README.md).
- Ambos são decorativos; controles precisam de rótulo visível ou `aria-label`. Não use volume em ícones repetidos da navegação.
- Os glifos especializados existentes abaixo continuam preservados para marca e proveniência.

- `<span data-icon="busca"></span>` + `SalaBuscadores.hydrate()`, ou `SalaBuscadores.icon("busca")`. Herdam `currentColor`.
- 16 px em texto, 20 px padrão, 24 px isolado. Dentro de discos (`.sdb-alert__icon`, `.sdb-toast__icon`, `.sdb-palette__lead`) use 17–18 px.
- Ícones de proveniência reservados: `fontePrimaria`, `curado`, `especialista`, `comunidade`, `ia`.
- Sem emoji. Sem símbolos de tradição como ícone de interface: a marca de uma Sala é o arco.
