import type { CSSProperties, ReactNode } from "react";
import type { Dictionary } from "@/content";
import { cx } from "@/lib/site";
import { ArrowUpRight } from "./icons";

export type StatusKind = keyof Dictionary["status"];

/** CSS custom-property helper for staggered reveals: style={stagger(2)} */
export function stagger(index: number): CSSProperties {
  return { ["--i" as string]: index };
}

/**
 * Renders each sentence of a headline on its own line, so short two-sentence
 * titles ("Your mind. Your permission.") never break mid-thought.
 */
export function Sentences({ text }: { text: string }) {
  const parts = text.split(/(?<=[.?!])\s+/);
  if (parts.length < 2) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i} className="block">
          {part}
        </span>
      ))}
    </>
  );
}

/** Numbered section eyebrow, e.g. "02 — Neural Privacy Firewall". */
export function Eyebrow({ index, children }: { index: number; children: ReactNode }) {
  return (
    <p className="t-eyebrow" data-reveal="">
      <b>{String(index).padStart(2, "0")}</b>
      <span aria-hidden="true" className="h-px w-6 bg-navy/20" />
      {children}
    </p>
  );
}

/** Status indicator. The mark's shape, not its colour alone, carries the meaning. */
export function Status({
  kind,
  children,
  className,
}: {
  kind: StatusKind;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cx("status", className)}>
      <i className="status-mark" data-kind={kind} aria-hidden="true" />
      {children}
    </span>
  );
}

/** External text link with a new-tab hint for assistive technology. */
export function ExtLink({
  href,
  children,
  newTab,
  className,
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  newTab: string;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cx("link", className)}>
      {children}
      {arrow ? <ArrowUpRight className="ml-0.5 inline-block align-[-0.1em]" size={13} /> : null}
      <span className="sr-only"> ({newTab})</span>
    </a>
  );
}
