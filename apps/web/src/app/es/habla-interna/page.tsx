import { DetailPage } from "@/components/DetailPage";
import { buildMetadata } from "@/components/SiteDocument";
export const metadata = buildMetadata("es", "innerSpeech");
export default function Page() { return <DetailPage locale="es" page="innerSpeech" />; }
