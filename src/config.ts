function digitsOnly(input: string) {
  return input.replace(/[^\d]/g, '')
}

export const CONTACT_EMAIL = 'carlos.cuellar@hsgsynergy.com'

// Set in `.env.local` as VITE_WHATSAPP_PHONE="57XXXXXXXXXX" (country code + number).
const DEFAULT_WHATSAPP_PHONE = '0000000000'
export const WHATSAPP_PHONE = digitsOnly(
  import.meta.env.VITE_WHATSAPP_PHONE ?? DEFAULT_WHATSAPP_PHONE,
)

export function getWhatsAppHref(message: string) {
  const phone = WHATSAPP_PHONE
  const text = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${text}`
}

