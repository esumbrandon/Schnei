'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { formatCurrency, formatDate, getDaysUntil } from '@/lib/utils'
import { Search, Filter, PlusCircle, Edit, Trash2, CreditCard } from 'lucide-react'
import { toast } from 'sonner'
import type { Subscription } from '@/types'

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [filteredSubs, setFilteredSubs] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const supabase = createClient()

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  useEffect(() => {
    filterSubscriptions()
  }, [subscriptions, searchQuery, filterStatus])

  const fetchSubscriptions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('next_bill_date', { ascending: true })

      if (error) throw error
      setSubscriptions(data || [])
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
      toast.error('Failed to load subscriptions')
    } finally {
      setLoading(false)
    }
  }

  const filterSubscriptions = () => {
    let filtered = subscriptions

    if (searchQuery) {
      filtered = filtered.filter(sub =>
        sub.service_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.plan_name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(sub => sub.status === filterStatus)
    }

    setFilteredSubs(filtered)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscription?')) return

    try {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Subscription deleted successfully')
      fetchSubscriptions()
    } catch (error) {
      console.error('Error deleting subscription:', error)
      toast.error('Failed to delete subscription')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-gray-600 mt-2">Manage all your recurring subscriptions</p>
        </div>
        <Button variant="primary" asChild>
          <Link href="/dashboard/subscriptions/add">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Subscription
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search subscriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-500 text-gray-900 font-medium bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="cancelled">Cancelled</option>
              <option value="trial">Trial</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions List */}
      {filteredSubs.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery || filterStatus !== 'all' ? 'No subscriptions found' : 'No subscriptions yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Add your first subscription to get started'}
            </p>
            {!searchQuery && filterStatus === 'all' && (
              <Button variant="primary" asChild>
                <Link href="/dashboard/subscriptions/add">Add Subscription</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredSubs.map((subscription) => {
            const daysUntil = getDaysUntil(subscription.next_bill_date)
            const isUpcoming = daysUntil <= 7 && daysUntil >= 0

            return (
              <Card key={subscription.id} className={isUpcoming ? 'border-orange-200 bg-orange-50/30' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        {subscription.logo_url ? (
                          <img src={subscription.logo_url} alt={subscription.service_name} className="w-8 h-8" />
                        ) : (
                          <CreditCard className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{subscription.service_name}</h3>
                          {subscription.verified && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                              Verified
                            </span>
                          )}
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded capitalize ${
                              subscription.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : subscription.status === 'paused'
                                ? 'bg-yellow-100 text-yellow-700'
                                : subscription.status === 'trial'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {subscription.status}
                          </span>
                        </div>
                        {subscription.plan_name && (
                          <p className="text-sm text-gray-600">{subscription.plan_name}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>Next billing: {formatDate(subscription.next_bill_date)}</span>
                          {isUpcoming && (
                            <span className="text-orange-600 font-medium">
                              {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          {formatCurrency(subscription.price, subscription.currency)}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">/{subscription.cadence}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/subscriptions/${subscription.id}/edit`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(subscription.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {subscription.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">{subscription.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
