'use client';

import { useEffect, useRef } from 'react';

/** Accessible modal built on the native <dialog>: focus trap, Escape to close and backdrop click come for free. */
export function Dialog({ open, onClose, label, children }: { open: boolean; onClose: () => void; label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      data-lenis-prevent
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto max-h-[92svh] w-[min(64rem,94vw)] overflow-y-auto rounded-[6px] bg-white p-0 text-navy backdrop:bg-navy-deep/80"
    >
      {open && (
        <div className="relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white transition-colors hover:bg-green hover:text-navy"
          >
            <svg viewBox="0 0 20 20" width="16" height="16" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M4 4l12 12M16 4 4 16" />
            </svg>
          </button>
          {children}
        </div>
      )}
    </dialog>
  );
}
