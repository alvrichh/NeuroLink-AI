import { DetailPage } from "@/components/DetailPage";
import { buildMetadata } from "@/components/SiteDocument";
export const metadata = buildMetadata("es", "dreams");
export default function Page() { return <DetailPage locale="es" page="dreams" />; }
