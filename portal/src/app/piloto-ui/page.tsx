import type { Metadata } from "next";
import { PilotoUI } from "@/components/piloto/PilotoUI";
import { listarSalas } from "@/data/repositorio";
import { imagem } from "@/server/imagens";
import { membroAtual, redirecionarParaEntrar } from "@/server/sessao";

export const metadata: Metadata = { title: "Piloto de componentes", robots: { index: false, follow: false } };

export default async function PaginaPiloto() {
  if (!(await membroAtual())) await redirecionarParaEntrar();
  const salas = (await listarSalas()).map((sala) => ({
    ...sala,
    imagem: imagem("salas", sala.slug),
  }));
  return <PilotoUI salas={salas} />;
}
