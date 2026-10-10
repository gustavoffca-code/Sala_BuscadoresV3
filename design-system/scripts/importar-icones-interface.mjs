// Atualiza os SVGs da referência HTML a partir da dependência do portal.
// Executar após atualizar lucide-react, antes de build.mjs.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(resolve(root, "../portal/package.json"));
const { createElement } = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const icons = require("lucide-react");
const names = {
  pasta: "FolderOpen", historico: "History", busca: "Search", livro: "BookOpen",
  alerta: "TriangleAlert", sucesso: "Check", escudo: "ShieldCheck", inicio: "LayoutDashboard",
  biblioteca: "Library", salas: "Compass", ajustes: "Settings2", notificacoes: "Bell",
  seta: "ArrowRight", voltar: "ArrowLeft", fechar: "X",
};
const data = Object.fromEntries(Object.entries(names).map(([name, component]) => [
  name, renderToStaticMarkup(createElement(icons[component], {
    size: 24, strokeWidth: 1.7, "aria-hidden": true, focusable: false,
  })),
]));
writeFileSync(resolve(root, "components/EstadosInterface/icones.json"), JSON.stringify(data, null, 2) + "\n");
const packageDir = dirname(require.resolve("lucide-react/package.json"));
writeFileSync(resolve(root, "components/EstadosInterface/LICENCA-LUCIDE.txt"), readFileSync(resolve(packageDir, "LICENSE")));
console.log("Ícones de interface importados do lucide-react.");
