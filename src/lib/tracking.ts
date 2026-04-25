type EventData = Record<string, unknown>

export function trackEvent(eventType: string, eventData: EventData = {}) {
  // TODO: Connect to Supabase `landing_events`
  // TODO: Connect to PostHog
  // TODO: Connect to Plausible
  // Keep this very lightweight; avoid blocking UX.
  console.log('[tracking]', eventType, eventData)
}

