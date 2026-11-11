import type { ReactNode } from "react";
import { buildMetadata, SiteDocument } from "@/components/SiteDocument";

export { viewport } from "@/components/SiteDocument";
export const metadata = buildMetadata("es");

export default function SpanishLayout({ children }: { children: ReactNode }) {
  return <SiteDocument locale="es">{children}</SiteDocument>;
}
