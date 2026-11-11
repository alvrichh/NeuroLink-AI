import type { ReactNode } from "react";
import { buildMetadata, SiteDocument } from "@/components/SiteDocument";

export { viewport } from "@/components/SiteDocument";
export const metadata = buildMetadata("en");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
