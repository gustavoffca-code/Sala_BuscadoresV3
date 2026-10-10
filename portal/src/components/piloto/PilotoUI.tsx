"use client";

import {
  ArrowRight,
  Bell,
  Bookmark,
  BookOpen,
  Check,
  ChevronRight,
  Compass,
  History,
  LayoutDashboard,
  Library,
  Menu,
  Moon,
  PanelLeftClose,
  Sun,
  X,
} from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import type { SalaResumo } from "@/data/repositorio";
import { CardSala } from "../ds/CardSala";
import { DialogoContextual } from "../ds/DialogoContextual";
import {
  AvisoContextual,
  CarregamentoSala,
  EstadoSecao,
  IconeVolume,
  ProgressoReal,
} from "../ds/EstadosInterface";
import { IconeInterface } from "../ds/IconeInterface";
import { useFocoPreso } from "../ds/useFocoPreso";
import styles from "./piloto.module.css";

type Estado = "atividade" | "salvos" | "busca" | "carregando" | "erro" | "salas";
const nav = [
  { nome: "Visão geral", icon: LayoutDashboard, estado: "atividade" as const },
  { nome: "Explorar salas", icon: Compass, estado: "salas" as const },
  { nome: "Minha biblioteca", icon: Library, estado: "salvos" as const },
  { nome: "Atividade recente", icon: History, estado: "atividade" as const },
];
const mensagens = {
  atividade: {
    simbolo: "historico" as const,
    titulo: "Sua jornada começa com uma descoberta",
    descricao:
      "Nenhuma atividade por aqui ainda. Explore uma sala e encontre um tema que desperte sua curiosidade.",
    botao: "Explorar salas",
  },
  salvos: {
    simbolo: "pasta" as const,
    titulo: "Um lugar para suas próximas leituras",
    descricao:
      "Você ainda não salvou conteúdos. Guarde o que fizer sentido para continuar a explorar depois.",
    botao: "Encontrar conteúdos",
  },
  busca: {
    simbolo: "busca" as const,
    titulo: "Ainda não encontramos esse caminho",
    descricao:
      "Nenhum resultado para esta busca. Experimente outra palavra ou volte a explorar todas as salas.",
    botao: "Limpar busca",
  },
  erro: {
    simbolo: "alerta" as const,
    titulo: "Não foi possível abrir esta sala",
    descricao: "O conteúdo não carregou desta vez. Tente novamente para continuar sua leitura.",
    botao: "Tentar novamente",
  },
};

export function PilotoUI({ salas }: { salas: (SalaResumo & { imagem?: string })[] }) {
  const [escuro, setEscuro] = useState(false);
  const [estado, setEstado] = useState<Estado>("atividade");
  const [ativo, setAtivo] = useState("Visão geral");
  const [menu, setMenu] = useState(false);
  const [recolhida, setRecolhida] = useState(false);
  const [busca, setBusca] = useState("");
  const [termo, setTermo] = useState("");
  const [etapas, setEtapas] = useState([true, false, false]);
  const [salaEscolhida, setSalaEscolhida] = useState("");
  const [aviso, setAviso] = useState("");
  const [dialogoAberto, setDialogoAberto] = useState(false);
  const sidebar = useRef<HTMLDivElement>(null);
  const abrirMenu = useRef<HTMLButtonElement>(null);
  const fecharMenu = useRef<HTMLButtonElement>(null);
  useFocoPreso(sidebar, menu);
  useEffect(() => {
    if (!menu) return;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focoInicial = requestAnimationFrame(() => fecharMenu.current?.focus());
    const fecharComEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    const telaGrande = window.matchMedia("(min-width: 801px)");
    const fecharEmDesktop = () => {
      if (telaGrande.matches) setMenu(false);
    };
    document.addEventListener("keydown", fecharComEscape);
    telaGrande.addEventListener("change", fecharEmDesktop);
    return () => {
      cancelAnimationFrame(focoInicial);
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", fecharComEscape);
      telaGrande.removeEventListener("change", fecharEmDesktop);
      abrirMenu.current?.focus();
    };
  }, [menu]);
  const count = etapas.filter(Boolean).length;
  const navegar = (nome: string, modo: Estado) => {
    setAtivo(nome);
    setEstado(modo);
    setTermo("");
    setBusca("");
    setMenu(false);
    setAviso("");
  };
  const pesquisar = (e: FormEvent) => {
    e.preventDefault();
    setTermo(busca.trim());
    setEstado(busca.trim() ? "busca" : "salas");
    setAtivo("Explorar salas");
    setAviso("");
  };
  const encontrados = salas.filter((s) =>
    s.nome
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes(
        termo
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase(),
      ),
  );
  const mostrarSalas = estado === "salas" || (estado === "busca" && termo && encontrados.length > 0);
  const abrirSala = (nome: string) => {
    setSalaEscolhida(nome);
    setDialogoAberto(true);
  };
  const vazio =
    estado !== "carregando" && !mostrarSalas ? mensagens[estado as keyof typeof mensagens] : undefined;

  return (
    <div className={styles.pilot} data-theme={escuro ? "solido-escuro" : "solido-claro"}>
      <div className={styles.reviewBar} inert={menu}>
        <span>
          <span className={styles.reviewDot} />
          BIBLIOTECA ATUALIZADA <b>Versão 1.1</b>
        </span>
        <div>
          <label htmlFor="estado-piloto">Visualizar</label>
          <select
            id="estado-piloto"
            aria-label="Visualizar estado do piloto"
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value as Estado);
              setTermo("");
              setBusca("");
              setAviso("");
            }}
          >
            <option value="atividade">Sem atividade</option>
            <option value="salvos">Biblioteca vazia</option>
            <option value="busca">
              {estado === "busca" && termo && encontrados.length > 0
                ? "Resultado da busca"
                : "Busca sem resultado"}
            </option>
            <option value="carregando">Sala carregando</option>
            <option value="erro">Falha de carregamento</option>
            <option value="salas">Salas disponíveis</option>
          </select>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setEscuro(!escuro)}
            aria-label={escuro ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            {escuro ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
      <div className={`${styles.shell} ${recolhida ? styles.collapsed : ""}`}>
        {menu && (
          <button
            type="button"
            className={styles.scrim}
            aria-label="Fechar navegação"
            tabIndex={-1}
            onClick={() => setMenu(false)}
          />
        )}
        <div
          ref={sidebar}
          id="piloto-navegacao"
          className={`${styles.sidebar} ${menu ? styles.sidebarOpen : ""}`}
          {...(menu
            ? { role: "dialog", "aria-modal": true, "aria-label": "Menu de navegação" }
            : { role: "complementary" })}
        >
          <div className={styles.brand}>
            <span className={styles.brandMark}>
              <span />
            </span>
            <strong>
              A Sala dos
              <br />
              Buscadores
            </strong>
            <button
              type="button"
              className={styles.collapseButton}
              aria-label={recolhida ? "Expandir navegação" : "Recolher navegação"}
              aria-expanded={!recolhida}
              onClick={() => setRecolhida(!recolhida)}
            >
              <PanelLeftClose size={17} />
            </button>
            <button
              type="button"
              className={styles.mobileClose}
              ref={fecharMenu}
              aria-label="Fechar menu"
              onClick={() => setMenu(false)}
            >
              <X size={18} />
            </button>
          </div>
          <p className={styles.navLabel}>SEU ESPAÇO</p>
          <nav aria-label="Navegação do piloto">
            {nav.map((item) => (
              <button
                type="button"
                key={item.nome}
                title={item.nome}
                className={styles.navItem}
                aria-current={ativo === item.nome ? "page" : undefined}
                onClick={() => navegar(item.nome, item.estado)}
              >
                <item.icon size={19} strokeWidth={1.7} />
                <span>{item.nome}</span>
                {item.nome === "Minha biblioteca" && <small>0</small>}
              </button>
            ))}
          </nav>
          <div className={styles.sidebarNote}>
            <BookOpen size={20} strokeWidth={1.5} />
            <p>
              O conhecimento se amplia
              <br />a cada nova perspectiva.
            </p>
            <span>Explore no seu ritmo.</span>
          </div>
          <div className={styles.profile}>
            <span>GB</span>
            <div>
              <strong>Olá, buscador</strong>
              <small>Seu espaço de descobertas</small>
            </div>
          </div>
        </div>
        <div className={styles.workspace} inert={menu}>
          <header className={styles.topbar}>
            <div>
              <button
                type="button"
                className={styles.mobileMenu}
                ref={abrirMenu}
                aria-label="Abrir menu"
                aria-expanded={menu}
                aria-controls="piloto-navegacao"
                onClick={() => setMenu(true)}
              >
                <Menu size={20} />
              </button>
              <span>Meu espaço</span>
              <ChevronRight size={14} />
              <strong>{ativo}</strong>
            </div>
            <form className={styles.search} onSubmit={pesquisar}>
              <IconeInterface simbolo="busca" tamanho={17} />
              <input
                aria-label="Buscar salas"
                placeholder="O que você quer descobrir?"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
              <button type="submit" aria-label="Pesquisar">
                <ArrowRight size={16} />
              </button>
            </form>
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Ver notificações"
              onClick={() => setAviso("Você está em dia. Nenhuma notificação nova.")}
            >
              <Bell size={19} strokeWidth={1.7} />
            </button>
          </header>
          <main className={styles.main} id="conteudo">
            <div className={styles.heading}>
              <div>
                <p className={styles.eyebrow}>A CURIOSIDADE ABRE CAMINHOS</p>
                <h1>Um espaço para buscar.</h1>
                <p>Explore ideias, encontre conexões e construa sua própria jornada.</p>
              </div>
              <span className={styles.edition}>
                O SEU PORTAL
                <br />
                <b>de novas perspectivas</b>
              </span>
            </div>
            {aviso && (
              <div className={styles.inlineStatus} role="status">
                <Check size={16} />
                {aviso}
                <button type="button" aria-label="Dispensar mensagem" onClick={() => setAviso("")}>
                  <X size={16} />
                </button>
              </div>
            )}
            <div className={styles.sectionHeader}>
              <div>
                <h2>
                  {estado === "salvos"
                    ? "Minha biblioteca"
                    : mostrarSalas || estado === "busca"
                      ? "Explore as salas"
                      : estado === "carregando" || estado === "erro"
                        ? "Conteúdo da sala"
                        : "Sua atividade"}
                </h2>
                <p>
                  {estado === "salvos"
                    ? "O que você quer manter por perto."
                    : "Cada descoberta encontra seu lugar aqui."}
                </p>
              </div>
              <span className={styles.sectionIcon}>
                <History size={17} />
              </span>
            </div>
            {vazio && (
              <EstadoSecao
                simbolo={vazio.simbolo}
                titulo={vazio.titulo}
                descricao={
                  termo
                    ? `Nenhum resultado para “${termo}”. Tente outra palavra ou explore todas as salas.`
                    : vazio.descricao
                }
                acao={{
                  rotulo: vazio.botao,
                  executar: () => {
                    navegar("Explorar salas", "salas");
                    if (estado === "erro") setAviso("Conteúdo de demonstração recuperado. Escolha uma sala.");
                  },
                }}
              />
            )}
            {estado === "carregando" && <CarregamentoSala />}
            {mostrarSalas && (
              <div className={styles.roomGrid}>
                {(estado === "busca" ? encontrados : salas).map((s) => (
                  <CardSala key={s.slug} sala={s} imagem={s.imagem} />
                ))}
              </div>
            )}
            <div className={styles.lowerGrid}>
              <section className={styles.panel}>
                <div className={styles.panelHeading}>
                  <h2>Uma descoberta de cada vez</h2>
                  <BookOpen size={18} />
                </div>
                <p>Marque suas etapas de estudo nesta prévia.</p>
                <ProgressoReal concluidos={count} total={etapas.length} rotulo="Sua trilha de introdução" />
                <div className={styles.checklist}>
                  {[
                    "Conhecer a proposta do portal",
                    "Explorar uma sala",
                    "Escolher uma primeira leitura",
                  ].map((label, i) => (
                    <label key={label}>
                      <input
                        type="checkbox"
                        checked={etapas[i]}
                        onChange={() => setEtapas((a) => a.map((v, j) => (j === i ? !v : v)))}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </section>
              <section className={styles.panel}>
                <div className={styles.panelHeading}>
                  <h2>Espaço para todas as perspectivas</h2>
                  <Bookmark size={18} />
                </div>
                <AvisoContextual titulo="Sua busca, seu ritmo">
                  As salas apresentam diferentes tradições. Você escolhe o caminho que deseja explorar.
                </AvisoContextual>
                <button type="button" className={styles.textButton} onClick={() => abrirSala("Nag Hammadi")}>
                  Ver exemplo de diálogo <ArrowRight size={16} />
                </button>
              </section>
            </div>
            <section className={styles.iconGallery}>
              <div>
                <p className={styles.eyebrow}>UMA LINGUAGEM, DOIS NÍVEIS</p>
                <h2>Discretos ao navegar. Expressivos ao orientar.</h2>
              </div>
              <div className={styles.iconRows}>
                <div>
                  <span>Navegação e busca</span>
                  {(["busca", "inicio", "biblioteca", "historico", "ajustes"] as const).map((simbolo) => (
                    <IconeInterface key={simbolo} simbolo={simbolo} tamanho={18} />
                  ))}
                </div>
                <div>
                  <span>Mensagens e estados</span>
                  {(["pasta", "livro", "busca", "alerta", "sucesso"] as const).map((s) => (
                    <IconeVolume key={s} simbolo={s} pequeno />
                  ))}
                </div>
              </div>
            </section>
            <footer className={styles.footer}>
              A Sala dos Buscadores <span>Prévia interativa · dados de demonstração</span>
            </footer>
          </main>
        </div>
      </div>
      <DialogoContextual
        aberto={dialogoAberto}
        onFechar={() => setDialogoAberto(false)}
        titulo={`Conheça ${salaEscolhida}`}
        subtitulo="UMA NOVA PERSPECTIVA"
        acao={{
          rotulo: "Quero explorar",
          executar: () => {
            setDialogoAberto(false);
            setAviso(`Interesse em ${salaEscolhida} registrado apenas nesta prévia.`);
          },
        }}
      >
        Uma sala para ler, ouvir e comparar ideias. Esta prévia apresenta o novo padrão de diálogo do portal.
      </DialogoContextual>
    </div>
  );
}
