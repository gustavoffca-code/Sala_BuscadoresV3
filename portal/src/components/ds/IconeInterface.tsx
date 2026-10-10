import {
  ArrowRight,
  Bell,
  BookOpen,
  Compass,
  History,
  LayoutDashboard,
  Library,
  type LucideIcon,
  Search,
  Settings2,
} from "lucide-react";

const simbolos = {
  busca: Search,
  inicio: LayoutDashboard,
  biblioteca: Library,
  salas: Compass,
  historico: History,
  ajustes: Settings2,
  notificacoes: Bell,
  livro: BookOpen,
  seta: ArrowRight,
} satisfies Record<string, LucideIcon>;

export type SimboloInterface = keyof typeof simbolos;

/** Primeiro nível: traço Lucide simples, sem volume. O controle fornece o nome acessível. */
export function IconeInterface({ simbolo, tamanho = 20 }: { simbolo: SimboloInterface; tamanho?: number }) {
  const Glyph = simbolos[simbolo];
  return (
    <Glyph
      className="sdb-ui-interface-icon"
      size={tamanho}
      style={{ width: tamanho, height: tamanho }}
      strokeWidth={1.7}
      aria-hidden="true"
      focusable="false"
    />
  );
}
