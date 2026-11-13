import { DetailPage } from "@/components/DetailPage";
import { buildMetadata } from "@/components/SiteDocument";
export const metadata = buildMetadata("en", "innerSpeech");
export default function Page() { return <DetailPage locale="en" page="innerSpeech" />; }
