"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";

type Link = { label: string; href: string };

// Mobile menu (MASTER 6.2): a full-width sheet under the header with 52px rows.
// Esc and outside click close it, and focus returns to the menu button.
export function MobileMenu({
  items,
  cta,
  openLabel,
  closeLabel,
  navLabel,
}: {
  items: Link[];
  cta?: Link;
  openLabel: string;
  closeLabel: string;
  navLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const sheetId = useId();

  useEffect(() => {
    if (!open) return;
    const close = (restoreFocus: boolean) => {
      setOpen(false);
      if (restoreFocus) button.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close(true);
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!sheet.current?.contains(t) && !button.current?.contains(t)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    sheet.current?.querySelector("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        className="icon-btn menu-btn"
        aria-expanded={open}
        aria-controls={sheetId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="swap" aria-hidden="true">
          <ListIcon className={`i${open ? " off" : ""}`} />
          <XIcon className={`i${open ? "" : " off"}`} />
        </span>
      </button>
      <div ref={sheet} id={sheetId} className="menu-sheet" hidden={!open}>
        <nav aria-label={navLabel}>
          <ul>
            {items.map((item) => (
              <li key={item.href + item.label}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {cta && (
            <a className="btn btn-primary btn-lg" href={cta.href} onClick={() => setOpen(false)}>
              {cta.label}
            </a>
          )}
        </nav>
      </div>
    </>
  );
}
