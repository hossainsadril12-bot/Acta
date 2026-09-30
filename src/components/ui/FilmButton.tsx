"use client";

import { useRef } from "react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";

// "Watch the film" ghost link that opens a native <dialog> (MASTER 6.7). The dialog gives
// Esc-to-close and focus return for free; the trigger only renders when a film URL exists.
export function FilmButton({ label, url, closeLabel }: { label: string; url: string; closeLabel: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const isFile = /\.(mp4|webm|mov)(\?|$)/i.test(url);

  return (
    <>
      <button type="button" className="btn btn-ghost btn-lg" onClick={() => dialog.current?.showModal()}>
        {label}
      </button>
      <dialog
        ref={dialog}
        className="film"
        aria-label={label}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="pnl">
          {isFile ? (
            <video className="vid" src={url} controls playsInline preload="none" />
          ) : (
            <iframe className="vid" src={url} title={label} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
          )}
          <div className="cap">
            <button type="button" className="icon-btn" aria-label={closeLabel} onClick={() => dialog.current?.close()}>
              <XIcon className="i" />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
