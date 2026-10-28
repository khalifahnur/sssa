import { useId } from 'react';

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  children: (props: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string; className: string }) => React.ReactNode;
}

const CONTROL =
  'w-full rounded-none border-0 border-b-[3px] border-navy/25 bg-transparent px-0 py-3 text-base font-semibold text-navy placeholder:font-normal placeholder:text-navy/40 transition-colors focus:border-green focus:outline-none aria-[invalid=true]:border-alert';

/** Label + control + message wiring, so every form field is announced correctly. */
export function Field({ label, error, hint, children }: FieldProps) {
  const id = useId();
  const msgId = `${id}-msg`;
  return (
    <div>
      <label htmlFor={id} className="text-xs font-extrabold uppercase tracking-label text-teal">
        {label}
      </label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': error || hint ? msgId : undefined, className: CONTROL })}
      {(error || hint) && (
        <p id={msgId} role={error ? 'alert' : undefined} className={`mt-1.5 text-sm ${error ? 'font-semibold text-alert' : 'text-navy/60'}`}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
