"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Photo } from "@/content/media";
import { cx } from "@/lib/site";

type Props = {
  photo: Photo;
  alt: string;
  caption: string;
  labels: { photograph: string; source: string; unavailable: string; newTab: string };
  className?: string;
  /** CSS aspect-ratio of the frame, e.g. "4 / 3". Defaults to the photo's own. */
  ratio?: string;
  /** Object-position for the crop inside the frame. */
  focus?: string;
  /** Optional floating content rendered over the photograph. */
  children?: ReactNode;
};

/**
 * A third-party photograph, embedded from its original source and always shown
 * with author, licence and what it does *not* depict (docs/VISUAL_STANDARDS.md).
 * Layout space is reserved up front, so loading never shifts the page.
 */
export function PhotoFigure({ photo, alt, caption, labels, className, ratio, focus, children }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    // The image may have settled before hydration attached the handlers.
    const img = ref.current;
    if (img?.complete) setState(img.naturalWidth > 0 ? "ready" : "failed");
  }, []);

  return (
    <figure className={cx("photo", className)}>
      <div
        className="photo__frame"
        data-state={state}
        style={{ aspectRatio: ratio ?? `${photo.width} / ${photo.height}` }}
      >
        <img
          ref={ref}
          src={photo.src}
          alt={alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          style={{ objectPosition: focus }}
          onLoad={() => setState("ready")}
          onError={() => setState("failed")}
        />
        {state === "failed" ? (
          <p className="photo__fallback">
            <span>{labels.unavailable}</span>
            <a href={photo.sourceUrl} target="_blank" rel="noreferrer" className="link">
              {labels.source}
              <span className="sr-only"> ({labels.newTab})</span>
            </a>
          </p>
        ) : null}
        {children}
      </div>
      <figcaption className="photo__caption">
        <span className="photo__credit">
          <span className="photo__kind">{labels.photograph}</span>
          <span>
            {photo.author} ·{" "}
            <a href={photo.licenseUrl} target="_blank" rel="noreferrer license" className="link">
              {photo.license}
              <span className="sr-only"> ({labels.newTab})</span>
            </a>{" "}
            ·{" "}
            <a href={photo.sourceUrl} target="_blank" rel="noreferrer" className="link">
              {labels.source}
              <span className="sr-only"> ({labels.newTab})</span>
            </a>
          </span>
        </span>
        <span className="photo__note">{caption}</span>
      </figcaption>
    </figure>
  );
}
