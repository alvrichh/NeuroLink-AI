import type { SVGProps } from "react";
import type { SectionId } from "@/content";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 18, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Navigation glyphs: one small, literal mark per section. */
export const sectionIcons: Record<SectionId, (p: IconProps) => React.JSX.Element> = {
  overview: (p) => (
    <Base {...p}>
      <circle cx="10" cy="10" r="6.75" />
      <circle cx="10" cy="10" r="1.6" fill="currentColor" stroke="none" />
    </Base>
  ),
  vision: (p) => (
    <Base {...p}>
      <path d="M4.75 4.5h10.5a2 2 0 0 1 2 2v5.25a2 2 0 0 1-2 2H10.5l-3.75 3v-3h-2a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z" />
      <path d="M7.25 9.15h.01M10 9.15h.01M12.75 9.15h.01" strokeWidth={1.9} />
    </Base>
  ),
  privacy: (p) => (
    <Base {...p}>
      <path d="M10 2.75 16 5v4.6c0 3.6-2.4 6.3-6 7.65-3.600-1.35-6-4.050-6-7.650V5l6-2.250Z" />
      <path d="M10 8.4v2.7" />
      <circle cx="10" cy="8.1" r="0.35" fill="currentColor" />
    </Base>
  ),
  research: (p) => (
    <Base {...p}>
      <circle cx="8.75" cy="8.750" r="5.250" />
      <path d="m12.6 12.6 4.15 4.15" />
      <path d="M6.6 8.75h4.3" />
    </Base>
  ),
  technology: (p) => (
    <Base {...p}>
      <rect x="5.5" y="5.5" width="9" height="9" rx="1.75" />
      <path d="M8 2.75V5.500M12 2.750V5.500M8 14.5v2.75M12 14.500v2.750M2.75 8H5.500M2.750 12H5.500M14.5 8h2.75M14.500 12h2.750" />
    </Base>
  ),
  exchange: (p) => (
    <Base {...p}>
      <path d="M3.5 7.250h12.250M12.5 4l3.25 3.250L12.5 10.500" />
      <path d="M16.5 12.750H4.250M7.5 9.5l-3.250 3.250L7.500 16" />
    </Base>
  ),
  roadmap: (p) => (
    <Base {...p}>
      <path d="M4.25 15.75V4.250" />
      <path d="M4.25 4.750h9.500l-2 2.750 2 2.750h-9.500" />
    </Base>
  ),
  open: (p) => (
    <Base {...p}>
      <circle cx="5.75" cy="4.750" r="1.750" />
      <circle cx="5.75" cy="15.250" r="1.750" />
      <circle cx="14.25" cy="7.250" r="1.750" />
      <path d="M5.75 6.500v7M14.250 9c0 2.5-2.250 3.250-4.250 3.500-1.750.250-3.250.500-4.250 1" />
    </Base>
  ),
};

export function ArrowRight(p: IconProps) {
  return (
    <Base size={16} {...p}>
      <path d="M4 10h12M11.500 5.500 16 10l-4.500 4.500" />
    </Base>
  );
}

export function ArrowDown(p: IconProps) {
  return (
    <Base size={16} {...p}>
      <path d="M10 4v12M5.500 11.500 10 16l4.500-4.500" />
    </Base>
  );
}

export function ArrowUpRight(p: IconProps) {
  return (
    <Base size={14} {...p}>
      <path d="M6 14 14 6M7.500 6H14v6.500" />
    </Base>
  );
}

export function LockIcon({ open = false, ...p }: IconProps & { open?: boolean }) {
  return (
    <Base {...p}>
      <rect x="4.5" y="9" width="11" height="8" rx="2.250" />
      <path
        d={open ? "M7.250 9V6.250a2.750 2.750 0 0 1 5.400-.750" : "M7.250 9V6.500a2.750 2.750 0 0 1 5.500 0V9"}
      />
      <path d="M10 12.250v1.750" />
    </Base>
  );
}

export function SunIcon(p: IconProps) {
  return (
    <Base size={16} {...p}>
      <circle cx="10" cy="10" r="3.250" />
      <path d="M10 2.750v1.500M10 15.750v1.500M2.750 10h1.500M15.750 10h1.500M4.870 4.870l1.060 1.060M14.070 14.070l1.060 1.060M4.870 15.130l1.060-1.060M14.070 5.930l1.060-1.060" />
    </Base>
  );
}

export function MoonIcon(p: IconProps) {
  return (
    <Base size={16} {...p}>
      <path d="M16.250 11.600A6.750 6.750 0 0 1 8.400 3.750a6.750 6.750 0 1 0 7.850 7.850Z" />
    </Base>
  );
}

export function GitHubIcon({ size = 18, ...p }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...p}
    >
      <path d="M10 1.667a8.333 8.333 0 0 0-2.635 16.240c.417.077.570-.180.570-.402 0-.198-.008-.853-.011-1.548-2.318.504-2.808-.983-2.808-.983-.379-.963-.925-1.219-.925-1.219-.756-.517.057-.507.057-.507.836.059 1.276.859 1.276.859.743 1.273 1.950.905 2.425.692.075-.538.291-.906.529-1.114-1.851-.210-3.797-.925-3.797-4.118 0-.910.325-1.653.858-2.236-.086-.211-.372-1.058.081-2.205 0 0 .700-.224 2.292.854a7.970 7.970 0 0 1 4.176 0c1.591-1.078 2.290-.854 2.290-.854.454 1.147.168 1.994.082 2.205.534.583.857 1.326.857 2.236 0 3.201-1.949 3.906-3.805 4.112.299.258.566.766.566 1.544 0 1.115-.010 2.013-.010 2.287 0 .224.150.483.573.401A8.335 8.335 0 0 0 10 1.667Z" />
    </svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <Base size={16} {...p}>
      <path d="m4.500 10.500 3.500 3.500 7.500-8" />
    </Base>
  );
}

export function CloseIcon(p: IconProps) {
  return (
    <Base size={16} {...p}>
      <path d="m5 5 10 10M15 5 5 15" />
    </Base>
  );
}
