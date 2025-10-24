# Schnei - Quick Start Guide

Get your Schnei subscription management platform up and running in 15 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A PostHog account (free tier works)
- Git installed

## Step-by-Step Setup

### 1. Install Dependencies (2 minutes)

```bash
npm install
```

### 2. Set Up Supabase (5 minutes)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be ready (2-3 minutes)
3. Go to **Settings > API** and copy:

   - Project URL
   - `anon` public key
   - `service_role` secret key (for server-side)

4. Go to **SQL Editor** and run the migration:

   - Open `supabase/migrations/001_initial_schema.sql`
   - Copy all content
   - Paste in SQL Editor
   - Click "Run"

5. Configure Authentication:

   - Go to **Authentication > Providers**
   - Enable **Email** provider
   - (Optional) Enable **Google**, **GitHub**, or **Apple**
   - For OAuth providers, add your credentials from:
     - Google: [console.cloud.google.com](https://console.cloud.google.com)
     - GitHub: [github.com/settings/developers](https://github.com/settings/developers)
     - Apple: [developer.apple.com](https://developer.apple.com)

6. Add Redirect URLs:
   - Go to **Authentication > URL Configuration**
   - Site URL: `http://localhost:3000`
   - Redirect URLs: Add `http://localhost:3000/auth/callback`

### 3. Set Up PostHog (2 minutes)

1. Go to [posthog.com](https://posthog.com) and sign up
2. Create a new project
3. Copy your **Project API Key**
4. That's it!

### 4. Configure Environment Variables (1 minute)

Create `.env.local` in the project root:

```bash
# Copy from .env.example
cp .env.example .env.local
```

Edit `.env.local` and fill in:

```env
# From Supabase (Step 2)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# From PostHog (Step 3)
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional (for later)
REDIS_URL=redis://localhost:6379
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

### 5. Start Development Server (1 minute)

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## What You'll See

### Landing Page (/)

- Hero section with "Start Free Trial" CTA
- How It Works section
- Features showcase
- Pricing plans
- All CTAs track analytics

### Sign Up (/signup)

- Email/password registration
- OAuth options (if configured)
- Account creation

### Login (/login)

- Email/password login
- OAuth login options
- Forgot password link

### Dashboard (/dashboard)

- Overview with statistics
- Monthly spend tracking
- Upcoming renewals
- Smart insights

### Add Subscription (/dashboard/subscriptions/add)

- Manual entry form
- Quick add from popular services
- Category selection
- Billing configuration

## Quick Test Flow

1. **Sign Up**: Go to `/signup` and create an account
2. **Add First Subscription**:
   - Click "Add Subscription"
   - Quick select "Netflix"
   - Fill in price: 15.99
   - Set billing date: Pick a date
   - Click "Add Subscription"
3. **View Dashboard**: See your subscription appear in stats
4. **Manage**: Go to "Subscriptions" to see the full list

## Troubleshooting

### "Network Error" when signing up

- Check that Supabase URL and keys are correct in `.env.local`
- Ensure you ran the database migration
- Check Supabase dashboard for errors

### OAuth not working

- Verify redirect URLs are configured correctly
- Check OAuth credentials in Supabase dashboard
- Make sure callback URL matches: `http://localhost:3000/auth/callback`

### Analytics not tracking

- Check PostHog key is correct
- Open browser console to see if events are being sent
- Verify PostHog host URL

### Subscriptions not saving

- Check browser console for errors
- Verify API route is accessible: Try `fetch('http://localhost:3000/api/subscriptions')`
- Check Supabase RLS policies are applied

## Next Steps

### Customize the App

1. **Update Branding**:

   - Edit colors in `src/app/globals.css`
   - Change "Schnei" text throughout
   - Add your logo

2. **Add More Subscription Categories**:

   - Edit `src/app/dashboard/subscriptions/add/page.tsx`
   - Add to the category dropdown

3. **Customize Popular Services**:
   - Edit the `popularServices` array in add subscription page

### Deploy to Production

See `README.md` for deployment instructions with Vercel.

### Add More Features

Check `IMPLEMENTATION_GUIDE.md` for:

- Onboarding wizard
- OAuth integrations (Spotify, Netflix)
- Email notifications
- Invoice parsing
- Background workers

## File Structure Quick Reference

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── (auth)/
│   │   ├── login/page.tsx         # Login page
│   │   └── signup/page.tsx        # Signup page
│   ├── dashboard/
│   │   ├── page.tsx               # Dashboard home
│   │   ├── layout.tsx             # Dashboard layout
│   │   └── subscriptions/
│   │       ├── page.tsx           # List subscriptions
│   │       └── add/page.tsx       # Add subscription
│   └── api/
│       └── subscriptions/route.ts # API endpoints
├── components/
│   ├── landing/
│   │   └── landing-page.tsx       # Landing components
│   └── ui/                         # Reusable components
├── lib/
│   ├── supabase/                   # Supabase clients
│   ├── analytics.tsx               # PostHog setup
│   └── utils.ts                    # Helper functions
└── types/
    ├── database.types.ts           # Database types
    └── index.ts                    # App types
```

## Support & Resources

- **Documentation**: See `README.md`
- **Implementation Details**: See `IMPLEMENTATION_GUIDE.md`
- **Database Schema**: See `supabase/migrations/001_initial_schema.sql`
- **Environment Variables**: See `.env.example`

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Testing
npx tsc --noEmit        # Type check
```

## Keyboard Shortcuts

In the dashboard:

- `Cmd/Ctrl + K` (future): Quick command palette
- `Cmd/Ctrl + B` (future): Toggle sidebar

## Tips

1. **Use Popular Services**: Click on Netflix, Spotify, etc. to auto-fill the service name
2. **Set Reminders**: The system will show subscriptions renewing in the next 7 days
3. **Track Everything**: Even free trials - mark them as "trial" status
4. **Add Notes**: Use the notes field to remember why you subscribed
5. **Regular Reviews**: Check your dashboard monthly to spot unused subscriptions

---

🎉 **You're all set!** Start tracking your subscriptions and take control of your recurring expenses.

Need help? Check the full `README.md` or `IMPLEMENTATION_GUIDE.md` for detailed information.
