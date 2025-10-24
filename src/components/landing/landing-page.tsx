'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { analytics } from '@/lib/analytics'
import { 
  CreditCard, 
  Bell, 
  TrendingDown, 
  Shield, 
  Zap, 
  Check,
  Star,
  DollarSign,
  Calendar,
  PieChart
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Schnei
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Log in
            </Link>
            <Button 
              variant="primary"
              onClick={() => analytics.trackCTAClick('Get Started - Header', 'header')}
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Take control of your
            <span className="text-blue-600"> subscriptions</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Schnei aggregates all your recurring subscriptions in one dashboard. 
            Track, manage, and optimize your spending effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => analytics.trackCTAClick('Get Started - Hero', 'hero')}
              asChild
            >
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              asChild
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 14-day free trial
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Schnei Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to financial clarity
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Connect</h3>
              <p className="text-gray-600">
                Link your accounts or add subscriptions manually. We support OAuth, email parsing, and manual entry.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Consolidate</h3>
              <p className="text-gray-600">
                See all your subscriptions in one beautiful dashboard with insights and analytics.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Control</h3>
              <p className="text-gray-600">
                Get reminders, find duplicates, and optimize your spending to save money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage subscriptions
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow">
                <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Trusted by thousands of users
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$2.5M+</div>
              <div className="text-gray-600">Saved by users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Active users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-gray-600 flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you're ready
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-xl border-2 ${
                  plan.featured 
                    ? 'border-blue-600 shadow-xl scale-105' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.featured && (
                  <div className="text-blue-600 font-semibold text-sm mb-2">MOST POPULAR</div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-600">/{plan.period}</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Button 
                  variant={plan.featured ? 'primary' : 'outline'}
                  className="w-full mb-6"
                  onClick={() => analytics.trackCTAClick(`Get Started - ${plan.name}`, 'pricing')}
                  asChild
                >
                  <Link href="/signup">{plan.cta}</Link>
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to take control?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users saving money every month
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => analytics.trackCTAClick('Get Started - CTA Section', 'cta')}
            asChild
          >
            <Link href="/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Schnei</h3>
              <p className="text-sm">
                Take control of your subscriptions and save money.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/integrations" className="hover:text-white">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Schnei. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    icon: DollarSign,
    title: 'Track Spending',
    description: 'See your monthly and annual recurring costs at a glance with detailed analytics.',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Get notified before renewals, trial endings, and price increases.',
  },
  {
    icon: Calendar,
    title: 'Renewal Calendar',
    description: 'Never miss a billing date with our comprehensive renewal calendar.',
  },
  {
    icon: TrendingDown,
    title: 'Find Savings',
    description: 'Discover duplicate subscriptions and unused services to cut costs.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Bank-level encryption and complete data privacy. Your data belongs to you.',
  },
  {
    icon: Zap,
    title: 'Auto-Discovery',
    description: 'Automatically detect subscriptions from your email and payment methods.',
  },
]

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: null,
    description: 'Perfect for getting started',
    cta: 'Get Started',
    featured: false,
    features: [
      'Up to 10 subscriptions',
      'Manual entry',
      'Basic analytics',
      'Email reminders',
    ],
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'month',
    description: 'For serious subscription managers',
    cta: 'Start Free Trial',
    featured: true,
    features: [
      'Unlimited subscriptions',
      'OAuth integrations',
      'Advanced analytics',
      'Invoice parsing',
      'Priority support',
      'Export data',
    ],
  },
  {
    name: 'Business',
    price: '$29',
    period: 'month',
    description: 'For teams and businesses',
    cta: 'Contact Sales',
    featured: false,
    features: [
      'Everything in Pro',
      'Multi-user accounts',
      'Team management',
      'API access',
      'Custom integrations',
      'Dedicated support',
    ],
  },
]
