'use client'

import posthog from 'posthog-js'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        capture_pageview: false,
        capture_pageleave: true,
      })
    }
  }, [])

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', {
        $current_url: url,
      })
    }
  }, [pathname, searchParams])

  return <>{children}</>
}

// Analytics tracking functions
export const analytics = {
  track: (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.capture(eventName, properties)
    }
  },

  identify: (userId: string, traits?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.identify(userId, traits)
    }
  },

  page: (name?: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.capture('$pageview', {
        page_name: name,
        ...properties,
      })
    }
  },

  // Specific event tracking
  trackCTAClick: (ctaName: string, location: string) => {
    analytics.track('CTA Clicked', {
      cta_name: ctaName,
      location,
    })
  },

  trackSignup: (method: string) => {
    analytics.track('User Signed Up', {
      method,
    })
  },

  trackLogin: (method: string) => {
    analytics.track('User Logged In', {
      method,
    })
  },

  trackSubscriptionAdded: (method: 'manual' | 'oauth' | 'invoice' | 'import') => {
    analytics.track('Subscription Added', {
      method,
    })
  },

  trackSubscriptionCancelled: (subscriptionName: string) => {
    analytics.track('Subscription Cancelled', {
      subscription_name: subscriptionName,
    })
  },

  trackOnboardingCompleted: (duration: number) => {
    analytics.track('Onboarding Completed', {
      duration_seconds: duration,
    })
  },

  trackConnectionAdded: (provider: string) => {
    analytics.track('Account Connected', {
      provider,
    })
  },
}
