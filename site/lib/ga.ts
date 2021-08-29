export interface GoogleAnalyticsEvent {
  action: string
  params?: unknown
}

export const pageView = (url: string) => {
  (window as any).gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })
}

export const event = ({ action, params }: GoogleAnalyticsEvent) => {
  (window as any).gtag('event', action, params)
}
