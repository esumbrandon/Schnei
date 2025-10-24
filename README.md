# Schnei - Subscription Management Platform

A comprehensive subscription management platform built with Next.js, TypeScript, Supabase, and Tailwind CSS. Track, manage, and optimize all your recurring subscriptions in one beautiful dashboard.

## 🚀 Features Implemented

### ✅ Phase 1: Core Platform (MVP)

#### Landing Page

- ✅ Responsive hero section with CTAs
- ✅ "How It Works" section (Connect, Consolidate, Control)
- ✅ Features showcase grid
- ✅ Social proof section with stats
- ✅ Pricing plans (Free, Pro, Business)
- ✅ Footer with links
- ✅ Analytics tracking integrated

#### Authentication

- ✅ Email/password authentication via Supabase
- ✅ OAuth support (Google, GitHub, Apple)
- ✅ Login and signup pages
- ✅ Protected routes middleware
- ✅ Auth callback handler
- ✅ Session management

#### Dashboard

- ✅ Responsive dashboard layout with sidebar
- ✅ Main dashboard with statistics
- ✅ Monthly/annual spend tracking
- ✅ Active subscriptions count
- ✅ Upcoming renewals widget
- ✅ Smart insights and tips

#### Subscription Management

- ✅ List all subscriptions with filtering
- ✅ Search functionality
- ✅ Status filtering (active, paused, cancelled, trial)
- ✅ Manual subscription entry form
- ✅ Quick add popular services
- ✅ Edit subscription details
- ✅ Delete subscriptions
- ✅ Subscription cards with billing info

#### Database & Types

- ✅ Complete PostgreSQL schema
- ✅ TypeScript type definitions
- ✅ Row Level Security (RLS) policies
- ✅ Database triggers and functions
- ✅ Proper indexing
- ✅ Foreign key relationships

#### Analytics & Tracking

- ✅ PostHog integration
- ✅ Event tracking (CTAs, sign-ups, logins)
- ✅ Page view tracking
- ✅ User identification
- ✅ Subscription events tracking

#### UI Components

- ✅ Reusable Button component
- ✅ Input component
- ✅ Card components
- ✅ Toast notifications (Sonner)
- ✅ Loading states
- ✅ Responsive design
- ✅ Mobile menu

### 🔄 Phase 2: Advanced Features (Partially Implemented)

#### API Routes

- ✅ GET /api/subscriptions
- ✅ POST /api/subscriptions
- ✅ PUT /api/subscriptions
- ✅ DELETE /api/subscriptions

#### Utilities

- ✅ Currency formatting
- ✅ Date formatting
- ✅ Days until calculation
- ✅ Monthly/annual spend calculation
- ✅ Utility functions (cn, truncate, getInitials)

### 🚧 Phase 3: To Be Implemented

#### Onboarding Wizard

- 📋 Multi-step onboarding flow
- 📋 Account connection prompts
- 📋 Permission requests for email parsing

#### OAuth Integrations

- 📋 Spotify OAuth connector
- 📋 Netflix integration
- 📋 Generic OAuth framework
- 📋 Token encryption/storage

#### Invoice Parsing

- 📋 File upload interface
- 📋 Email invoice parsing
- 📋 Regex-based extraction
- 📋 Confirmation workflow

#### Notifications

- 📋 Email notification templates
- 📋 Notification preferences
- 📋 Renewal reminders
- 📋 Trial ending alerts
- 📋 Price increase notifications

#### Background Jobs

- 📋 BullMQ/Redis setup
- 📋 Sync jobs for OAuth providers
- 📋 Notification scheduling
- 📋 Data refresh workers

#### Settings

- 📋 Profile management
- 📋 Connected accounts page
- 📋 Notification preferences
- 📋 Privacy settings
- 📋 Data export
- 📋 Account deletion

#### Legal & Privacy

- 📋 Privacy Policy page
- 📋 Terms of Service page
- 📋 Cookie consent
- 📋 GDPR compliance tools

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **Analytics**: PostHog
- **Background Jobs**: BullMQ + Redis
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📦 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (for future billing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Redis (for background jobs)
REDIS_URL=redis://localhost:6379

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in Supabase Dashboard
3. Run the migration file: `supabase/migrations/001_initial_schema.sql`

This will create:

- All necessary tables
- Row Level Security policies
- Indexes for performance
- Triggers and functions
- Sample data (optional)

### 4. Supabase Auth Configuration

In your Supabase Dashboard:

1. **Authentication > Providers**

   - Enable Email provider
   - Enable OAuth providers (Google, GitHub, Apple)
   - Add OAuth credentials for each provider

2. **Authentication > URL Configuration**

   - Site URL: `http://localhost:3000`
   - Redirect URLs: Add `http://localhost:3000/auth/callback`

3. **Authentication > Email Templates**
   - Customize email templates if desired

### 5. PostHog Setup

1. Create account at [posthog.com](https://posthog.com)
2. Get your Project API Key
3. Add to `.env.local`

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
schnei/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── api/
│   │   │   └── subscriptions/
│   │   ├── auth/
│   │   │   └── callback/
│   │   ├── dashboard/
│   │   │   ├── subscriptions/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── landing/
│   │   │   └── landing-page.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── middleware.ts
│   │   ├── analytics.tsx
│   │   └── utils.ts
│   ├── types/
│   │   ├── database.types.ts
│   │   └── index.ts
│   └── middleware.ts
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── .env.example
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Key Features Usage

### Adding a Subscription

1. Navigate to Dashboard
2. Click "Add Subscription"
3. Either:
   - Quick add from popular services
   - Manually fill in details
   - (Future) Connect via OAuth
   - (Future) Upload invoice

### Viewing Statistics

The dashboard shows:

- Monthly recurring cost
- Annual projected cost
- Number of active subscriptions
- Upcoming renewals (next 7 days)
- Potential savings opportunities

### Managing Subscriptions

- **Search**: Find subscriptions by name
- **Filter**: By status (active, paused, cancelled, trial)
- **Edit**: Update subscription details
- **Delete**: Remove subscriptions

## 🔐 Security Features

- ✅ Row Level Security (RLS) on all tables
- ✅ Authentication required for all protected routes
- ✅ Secure session management
- ✅ HTTPS enforced in production
- ✅ Environment variables for sensitive data
- 📋 Encrypted token storage (to implement)
- 📋 GDPR compliance tools (to implement)

## 📊 Analytics Events Tracked

- Page views
- CTA clicks (with location)
- User sign-ups (by method)
- User logins (by method)
- Subscriptions added (by method)
- Subscriptions cancelled
- Onboarding completion
- Account connections

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to update:

- `NEXT_PUBLIC_APP_URL` to your production URL
- `NEXT_PUBLIC_SUPABASE_URL` and keys
- OAuth callback URLs in provider settings
- Supabase redirect URLs

## 🔧 Development

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Type Check

```bash
npx tsc --noEmit
```

## 📝 Next Steps

### High Priority

1. Implement onboarding wizard
2. Add OAuth integrations (Spotify, Netflix)
3. Build notification system
4. Create settings page
5. Add data export functionality

### Medium Priority

1. Invoice parsing system
2. Background sync workers
3. Advanced analytics dashboard
4. Duplicate detection
5. Savings recommendations

### Low Priority

1. Mobile app
2. Team features
3. API for third-party integrations
4. Advanced reporting

## 🐛 Known Issues

- TypeScript types for Supabase queries need regeneration after schema changes
- Some API routes bypass TypeScript validation (using workarounds)

## 📄 License

This project is private and proprietary.

## 👥 Support

For support and questions, contact: [your-email@example.com]

---

Built with ❤️ using Next.js and Supabase
