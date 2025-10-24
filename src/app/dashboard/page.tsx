'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  AlertCircle,
  ArrowRight,
  CreditCard
} from 'lucide-react'
import { formatCurrency, getDaysUntil, calculateMonthlySpend } from '@/lib/utils'
import type { Subscription } from '@/types'

export default function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')

      if (error) throw error
      setSubscriptions(data || [])
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  const monthlySpend = calculateMonthlySpend(subscriptions)
  const annualSpend = monthlySpend * 12
  const upcomingRenewals = subscriptions
    .filter(sub => getDaysUntil(sub.next_bill_date) <= 7)
    .sort((a, b) => new Date(a.next_bill_date).getTime() - new Date(b.next_bill_date).getTime())

  const stats = [
    {
      title: 'Monthly Spend',
      value: formatCurrency(monthlySpend),
      description: `${formatCurrency(annualSpend)}/year`,
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Subscriptions',
      value: subscriptions.length,
      description: `${subscriptions.filter(s => s.verified).length} verified`,
      icon: CreditCard,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Upcoming Renewals',
      value: upcomingRenewals.length,
      description: 'In the next 7 days',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Potential Savings',
      value: formatCurrency(0),
      description: 'No duplicates found',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your subscription portfolio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Welcome message for new users */}
      {subscriptions.length === 0 && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle>Welcome to Schnei! 🎉</CardTitle>
            <CardDescription className="text-gray-700">
              Let's get started by adding your first subscription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                You can add subscriptions in three ways:
              </p>
              <ul className="text-sm text-gray-600 space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Manually enter your subscription details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Connect your accounts via OAuth (Spotify, Netflix, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Upload and parse invoices from your email</span>
                </li>
              </ul>
              <Button variant="primary" className="mt-4" asChild>
                <Link href="/dashboard/subscriptions/add">Add Your First Subscription</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Renewals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Renewals</CardTitle>
              <Link 
                href="/dashboard/subscriptions" 
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <CardDescription>Subscriptions renewing in the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingRenewals.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No upcoming renewals</p>
            ) : (
              <div className="space-y-4">
                {upcomingRenewals.slice(0, 5).map((subscription) => {
                  const daysUntil = getDaysUntil(subscription.next_bill_date)
                  return (
                    <div key={subscription.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{subscription.service_name}</p>
                          <p className="text-sm text-gray-500">
                            {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(subscription.price, subscription.currency)}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">{subscription.cadence}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity / Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Smart Insights</CardTitle>
            <CardDescription>Ways to optimize your subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Review your subscriptions</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Check if you're still using all your active subscriptions
                  </p>
                </div>
              </div>

              {subscriptions.length > 0 && (
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Great start!</p>
                    <p className="text-sm text-gray-600 mt-1">
                      You've added {subscriptions.length} subscription{subscriptions.length !== 1 ? 's' : ''}. 
                      Keep tracking to maximize savings.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Set up reminders</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Enable email notifications to never miss a renewal date
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2 text-purple-600 hover:text-purple-700" asChild>
                    <Link href="/dashboard/settings">Configure notifications</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
