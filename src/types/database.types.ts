// Database types matching Supabase schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          auth_provider: 'email' | 'google' | 'apple' | 'github'
          preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          auth_provider?: 'email' | 'google' | 'apple' | 'github'
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          auth_provider?: 'email' | 'google' | 'apple' | 'github'
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      account_connections: {
        Row: {
          id: string
          user_id: string
          provider: string
          connection_type: 'oauth' | 'email' | 'manual' | 'card'
          status: 'active' | 'inactive' | 'error' | 'pending'
          encrypted_token: string | null
          last_sync_at: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider: string
          connection_type: 'oauth' | 'email' | 'manual' | 'card'
          status?: 'active' | 'inactive' | 'error' | 'pending'
          encrypted_token?: string | null
          last_sync_at?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider?: string
          connection_type?: 'oauth' | 'email' | 'manual' | 'card'
          status?: 'active' | 'inactive' | 'error' | 'pending'
          encrypted_token?: string | null
          last_sync_at?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          account_connection_id: string | null
          service_name: string
          plan_name: string | null
          price: number
          currency: string
          cadence: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual'
          next_bill_date: string
          status: 'active' | 'paused' | 'cancelled' | 'trial'
          payment_method_id: string | null
          category: string | null
          logo_url: string | null
          website_url: string | null
          notes: string | null
          raw_metadata: Json | null
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          account_connection_id?: string | null
          service_name: string
          plan_name?: string | null
          price: number
          currency?: string
          cadence: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual'
          next_bill_date: string
          status?: 'active' | 'paused' | 'cancelled' | 'trial'
          payment_method_id?: string | null
          category?: string | null
          logo_url?: string | null
          website_url?: string | null
          notes?: string | null
          raw_metadata?: Json | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          account_connection_id?: string | null
          service_name?: string
          plan_name?: string | null
          price?: number
          currency?: string
          cadence?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual'
          next_bill_date?: string
          status?: 'active' | 'paused' | 'cancelled' | 'trial'
          payment_method_id?: string | null
          category?: string | null
          logo_url?: string | null
          website_url?: string | null
          notes?: string | null
          raw_metadata?: Json | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      payment_methods: {
        Row: {
          id: string
          user_id: string
          type: 'card' | 'bank' | 'paypal' | 'other'
          masked_details: string
          provider: string | null
          encrypted_token: string | null
          is_default: boolean
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'card' | 'bank' | 'paypal' | 'other'
          masked_details: string
          provider?: string | null
          encrypted_token?: string | null
          is_default?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'card' | 'bank' | 'paypal' | 'other'
          masked_details?: string
          provider?: string | null
          encrypted_token?: string | null
          is_default?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          user_id: string
          action: string
          source: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          source: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          source?: string
          metadata?: Json | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'renewal_reminder' | 'trial_ending' | 'price_increase' | 'duplicate_found' | 'sync_error'
          title: string
          message: string
          subscription_id: string | null
          read: boolean
          sent_at: string | null
          scheduled_for: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'renewal_reminder' | 'trial_ending' | 'price_increase' | 'duplicate_found' | 'sync_error'
          title: string
          message: string
          subscription_id?: string | null
          read?: boolean
          sent_at?: string | null
          scheduled_for?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'renewal_reminder' | 'trial_ending' | 'price_increase' | 'duplicate_found' | 'sync_error'
          title?: string
          message?: string
          subscription_id?: string | null
          read?: boolean
          sent_at?: string | null
          scheduled_for?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
