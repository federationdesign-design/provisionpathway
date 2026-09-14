type IconProps = { className?: string };

export function CareIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 9.2c1-1.6 3.9-1.5 3.9.8 0 1.7-2.3 3.3-3.9 4.3-1.6-1-3.9-2.6-3.9-4.3 0-2.3 2.9-2.4 3.9-.8Z"
        fill="currentColor"
      />
      <path
        d="M3 13.4c1.3-1.1 2.6-.6 3.6.3M21 13.4c-1.3-1.1-2.6-.6-3.6.3M4.6 15.1c2 2.3 4.5 3.6 7.4 3.6s5.4-1.3 7.4-3.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PeopleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8.3" cy="8.4" r="2.9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.4" cy="9.2" r="2.3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M2.8 17.8c.6-2.6 2.8-4.2 5.5-4.2s4.9 1.6 5.5 4.2M15 13.9c2.6-.5 5.1.9 6 3.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 12h16m0 0-5.4-5.4M19.5 12l-5.4 5.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TriangleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 11 14" fill="none" aria-hidden="true">
      <path d="M1.5 1.8v10.4L9.4 7 1.5 1.8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function TickIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      <path
        d="M5.9 10.3 8.6 13l5.4-5.6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
