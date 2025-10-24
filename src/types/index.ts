import { Database } from './database.types'

// Type aliases for easier use
export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export type AccountConnection = Database['public']['Tables']['account_connections']['Row']
export type AccountConnectionInsert = Database['public']['Tables']['account_connections']['Insert']
export type AccountConnectionUpdate = Database['public']['Tables']['account_connections']['Update']

export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert']
export type SubscriptionUpdate = Database['public']['Tables']['subscriptions']['Update']

export type PaymentMethod = Database['public']['Tables']['payment_methods']['Row']
export type PaymentMethodInsert = Database['public']['Tables']['payment_methods']['Insert']
export type PaymentMethodUpdate = Database['public']['Tables']['payment_methods']['Update']

export type Event = Database['public']['Tables']['events']['Row']
export type EventInsert = Database['public']['Tables']['events']['Insert']

export type Notification = Database['public']['Tables']['notifications']['Row']
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert']
export type NotificationUpdate = Database['public']['Tables']['notifications']['Update']

// Extended types with relationships
export type SubscriptionWithRelations = Subscription & {
  payment_method?: PaymentMethod | null
  account_connection?: AccountConnection | null
}

// Form types
export interface ManualSubscriptionForm {
  service_name: string
  plan_name?: string
  price: number
  currency: string
  cadence: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual'
  next_bill_date: string
  payment_method_id?: string
  category?: string
  notes?: string
}

// Analytics event types
export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: Date
}

// OAuth provider configuration
export interface OAuthProvider {
  id: string
  name: string
  logo: string
  authUrl: string
  scopes: string[]
  enabled: boolean
}

// Notification preferences
export interface NotificationPreferences {
  email_enabled: boolean
  push_enabled: boolean
  renewal_reminders: boolean
  trial_endings: boolean
  price_increases: boolean
  weekly_digest: boolean
  days_before_renewal: number
}

// Dashboard statistics
export interface DashboardStats {
  total_subscriptions: number
  active_subscriptions: number
  monthly_spend: number
  annual_spend: number
  upcoming_renewals: number
  potential_savings: number
}

// Invoice parsing result
export interface ParsedInvoice {
  service_name: string
  amount: number
  currency: string
  date: string
  next_billing_date?: string
  confidence: number
}
