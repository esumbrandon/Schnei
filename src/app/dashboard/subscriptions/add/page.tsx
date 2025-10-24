'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { analytics } from '@/lib/analytics'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AddSubscriptionPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    service_name: '',
    plan_name: '',
    price: '',
    currency: 'USD',
    cadence: 'monthly',
    next_bill_date: '',
    category: '',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_name: formData.service_name,
          plan_name: formData.plan_name || null,
          price: parseFloat(formData.price),
          currency: formData.currency,
          cadence: formData.cadence,
          next_bill_date: formData.next_bill_date,
          category: formData.category || null,
          notes: formData.notes || null,
          status: 'active',
          verified: false,
        }),
      })

      const result = await response.json()

      if (!response.ok) throw new Error(result.error || 'Failed to add subscription')

      analytics.trackSubscriptionAdded('manual')
      toast.success('Subscription added successfully!')
      router.push('/dashboard/subscriptions')
    } catch (error: any) {
      console.error('Error adding subscription:', error)
      toast.error(error.message || 'Failed to add subscription')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const popularServices = [
    { name: 'Netflix', category: 'Entertainment' },
    { name: 'Spotify', category: 'Music' },
    { name: 'Amazon Prime', category: 'Shopping' },
    { name: 'Disney+', category: 'Entertainment' },
    { name: 'Apple Music', category: 'Music' },
    { name: 'YouTube Premium', category: 'Entertainment' },
    { name: 'Adobe Creative Cloud', category: 'Software' },
    { name: 'Microsoft 365', category: 'Software' },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/subscriptions"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to subscriptions
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add Subscription</h1>
        <p className="text-gray-600 mt-2">Manually add a new subscription to track</p>
      </div>

      {/* Quick Add - Popular Services */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Services</CardTitle>
          <CardDescription>Quick add from commonly used subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {popularServices.map((service) => (
              <button
                key={service.name}
                onClick={() =>
                  setFormData({
                    ...formData,
                    service_name: service.name,
                    category: service.category,
                  })
                }
                className="p-3 border border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium text-gray-700"
              >
                {service.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Manual Form */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Details</CardTitle>
          <CardDescription>Enter the details of your subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="service_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name <span className="text-red-600">*</span>
                </label>
                <Input
                  id="service_name"
                  name="service_name"
                  type="text"
                  placeholder="Netflix, Spotify, etc."
                  value={formData.service_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="plan_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Name
                </label>
                <Input
                  id="plan_name"
                  name="plan_name"
                  type="text"
                  placeholder="Premium, Pro, etc."
                  value={formData.plan_name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select category</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Music">Music</option>
                  <option value="Software">Software</option>
                  <option value="Shopping">Shopping</option>
                  <option value="News">News</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Education">Education</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price <span className="text-red-600">*</span>
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="9.99"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD ($)</option>
                  <option value="AUD">AUD ($)</option>
                </select>
              </div>

              <div>
                <label htmlFor="cadence" className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Period <span className="text-red-600">*</span>
                </label>
                <select
                  id="cadence"
                  name="cadence"
                  value={formData.cadence}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>

              <div>
                <label htmlFor="next_bill_date" className="block text-sm font-medium text-gray-700 mb-2">
                  Next Billing Date <span className="text-red-600">*</span>
                </label>
                <Input
                  id="next_bill_date"
                  name="next_bill_date"
                  type="date"
                  value={formData.next_bill_date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  placeholder="Add any notes about this subscription..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <Button type="submit" variant="primary" disabled={loading} className="flex-1">
                {loading ? 'Adding...' : 'Add Subscription'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Other Methods */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle>Other Ways to Add Subscriptions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-600 font-semibold text-sm">1</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Connect via OAuth</h4>
              <p className="text-sm text-gray-600">
                Link your accounts from services like Spotify or Netflix to automatically import subscriptions
              </p>
              <Button variant="ghost" size="sm" className="mt-2 text-blue-600" asChild>
                <Link href="/dashboard/connections">Manage Connections</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-600 font-semibold text-sm">2</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Upload Invoice</h4>
              <p className="text-sm text-gray-600">
                Parse subscription details from email invoices or receipts
              </p>
              <Button variant="ghost" size="sm" className="mt-2 text-blue-600" disabled>
                Coming Soon
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
