"use client";

import {
  ArrowRight,
  BookOpen,
  Check,
  FolderOpen,
  History,
  type LucideIcon,
  Search,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { type ReactNode, useId } from "react";

export type SimboloVolume = "pasta" | "historico" | "busca" | "livro" | "alerta" | "sucesso" | "escudo";
const simbolos: Record<SimboloVolume, LucideIcon> = {
  pasta: FolderOpen,
  historico: History,
  busca: Search,
  livro: BookOpen,
  alerta: TriangleAlert,
  sucesso: Check,
  escudo: ShieldCheck,
};

/** Camadas vetoriais e CSS: leve, escalável e independente de imagens raster. */
export function IconeVolume({ simbolo, pequeno = false }: { simbolo: SimboloVolume; pequeno?: boolean }) {
  const Glyph = simbolos[simbolo];
  return (
    <span
      className={`sdb-ui-volume ${pequeno ? "sdb-ui-volume-small" : ""}`}
      data-symbol={simbolo}
      aria-hidden="true"
    >
      <span className="sdb-ui-volume-back" />
      <span className="sdb-ui-volume-sheet">
        <i />
        <i />
      </span>
      <span className="sdb-ui-volume-front">
        <Glyph size={27} strokeWidth={1.65} />
      </span>
      <span className="sdb-ui-volume-seal">
        <span />
      </span>
    </span>
  );
}

export function EstadoSecao({
  simbolo,
  titulo,
  descricao,
  acao,
  compacto = false,
}: {
  simbolo: SimboloVolume;
  titulo: string;
  descricao: string;
  acao?: { rotulo: string; executar: () => void };
  compacto?: boolean;
}) {
  const id = useId();
  return (
    <section className={`sdb-ui-empty ${compacto ? "sdb-ui-empty-compact" : ""}`} aria-labelledby={id}>
      <IconeVolume simbolo={simbolo} />
      <h3 id={id}>{titulo}</h3>
      <p>{descricao}</p>
      {acao && (
        <button className="sdb-ui-primary" type="button" onClick={acao.executar}>
          {acao.rotulo}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      )}
    </section>
  );
}

/** Determinado somente por dados: nenhum timer fabrica porcentagens. */
export function ProgressoReal({
  concluidos,
  total,
  rotulo,
}: {
  concluidos: number;
  total: number;
  rotulo: string;
}) {
  const disponivel = Number.isFinite(total) && total > 0 && Number.isFinite(concluidos);
  const valor = disponivel ? Math.max(0, Math.min(concluidos, total)) : 0;
  const percentual = disponivel ? Math.round((valor / total) * 100) : 0;
  return (
    <div className="sdb-ui-progress">
      <div>
        <span>{rotulo}</span>
        <strong>{disponivel ? `${percentual}%` : "—"}</strong>
      </div>
      {disponivel ? (
        <progress value={valor} max={total} aria-label={rotulo}>
          {percentual}%
        </progress>
      ) : (
        <p>O progresso aparecerá quando houver etapas definidas.</p>
      )}
      {disponivel && (
        <small>
          {valor} de {total} etapas concluídas
        </small>
      )}
    </div>
  );
}

export function CarregamentoSala() {
  return (
    <div
      className="sdb-ui-loading sdb-ui-loading-panel"
      role="status"
      aria-label="Carregando conteúdo da sala"
      aria-busy="true"
    >
      <div aria-hidden="true">
        <div className="sdb-ui-skeleton-hero" />
        <div className="sdb-ui-skeleton-title" />
        <div className="sdb-ui-skeleton-line" />
        <div className="sdb-ui-skeleton-grid">
          {[1, 2, 3].map((n) => (
            <div key={n}>
              <span />
              <i />
              <i />
            </div>
          ))}
        </div>
      </div>
      <p>Preparando o conteúdo da sala…</p>
    </div>
  );
}

export function AvisoContextual({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="sdb-ui-notice">
      <IconeVolume simbolo="escudo" pequeno />
      <div>
        <strong>{titulo}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}
