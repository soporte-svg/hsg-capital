import type { Lang } from '../i18n'
import { useEffect } from 'react'

export function LandingDesignPage({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className="h-[100dvh] w-full bg-white">
      <iframe
        title="HSG Investment Landing (design)"
        src="/landing-design/index.html"
        className="h-full w-full border-0"
      />
    </div>
  )
}

