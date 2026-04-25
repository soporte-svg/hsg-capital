import type { ReactNode } from 'react'

type IconProps = { className?: string }

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 2.7C8.65 2.7 2.7 8.66 2.7 16c0 2.33.6 4.51 1.66 6.4L3 29l6.82-1.28a13.2 13.2 0 0 0 6.18 1.52h0c7.35 0 13.3-5.96 13.3-13.3S23.35 2.7 16 2.7Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M16 4.9c6.13 0 11.1 4.97 11.1 11.1S22.13 27.1 16 27.1c-2.1 0-4.08-.58-5.78-1.6l-.41-.24-4.06.76.78-3.95-.27-.43A10.98 10.98 0 0 1 4.9 16C4.9 9.87 9.87 4.9 16 4.9Z"
        fill="currentColor"
      />
      <path
        d="M12.83 10.66c-.25-.55-.5-.56-.73-.57h-.63c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.64s1.13 3.07 1.29 3.28c.16.21 2.19 3.5 5.41 4.76 2.67 1.04 3.22.83 3.8.78.58-.05 1.87-.76 2.14-1.5.26-.74.26-1.38.18-1.5-.08-.13-.29-.21-.6-.37-.31-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.32-.81 1.03-.99 1.24-.18.21-.36.24-.68.08-.31-.16-1.3-.48-2.48-1.54-.92-.82-1.54-1.84-1.72-2.15-.18-.32-.02-.49.14-.65.14-.14.31-.37.47-.55.16-.18.21-.32.31-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.78-.98-2.33Z"
        fill="white"
      />
    </svg>
  )
}

export function StepIcon({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
      {children}
    </div>
  )
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

