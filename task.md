## How Schnei works — product & technical overview

**Goal (short):** Schnei aggregates all of a user's recurring subscriptions (Spotify, Netflix, mobile plans, etc.), shows them in one dashboard, and helps users manage, track, and cancel or optimise subscriptions. The initial landing-page tasks and MVP focus on acquisition and conversion; the sections below describe how the core product will function and how it maps to implementation tasks.

### Core user flows (MVP)
1. **Sign up / onboarding**
   - User signs up via Supabase Auth (email / OAuth).
   - On first login they are guided through onboarding: link accounts (automatic methods below) or add subscriptions manually.
   - Optional: prompt for permission to scan invoices or connect email for automatic discovery (explicit consent required).

2. **Connect & discover subscriptions**
   - **Direct integrations (preferred):** For services offering OAuth or public APIs (e.g., Spotify, some telcos), user connects via OAuth and Schnei reads subscriptions/billing details.
   - **Email invoice parsing (MVP optional):** With user consent, Schnei can read a dedicated mailbox or process uploaded invoices to extract recurring charges.
   - **Manual entry:** Users can add subscriptions manually (service name, renewal date, price, billing period, payment method).
   - **Card-based discovery (future):** Using Stripe Connect or Plaid-like providers to identify recurring charges on users' payment methods (requires third-party partners).

3. **Dashboard & insights**
   - Consolidated list of active subscriptions, next billing date, amount, billing cadence, and linked payment method.
   - Visuals: monthly recurring spend, upcoming renewals, recently added, and “savings opportunities” (e.g., duplicated services).
   - Quick actions: Pause/cancel (via integration or link to service), change payment method, or add a note.

4. **Notifications & reminders**
   - Email and push reminders for upcoming renewals, free-trial expiries, price increases, and suspicious duplicate charges.
   - Analytics events for CTAs tracked with GA/PostHog (landing page CTAs already in tasks). :contentReference[oaicite:1]{index=1}

5. **Billing & payments (future)**
   - For subscription management of microbusinesses (owner-facing), support invoicing and payment collection via Stripe in a later phase.

### Minimal viable data model (high level)
- **User**: id, email (Supabase), auth provider, preferences.
- **AccountConnection**: user_id, provider (spotify/netflix/email/manual), connection_type (oauth/email/manual), last_sync_at, status.
- **Subscription**: id, user_id, provider, service_name, plan_name, price, currency, cadence (monthly/annual), next_bill_date, status (active/paused/cancelled), payment_method_id, raw_metadata.
- **PaymentMethod**: id, user_id, type (card/bank), masked_details, provider_token (encrypted).
- **Event / AuditLog**: user_id, action, source, timestamp.

### Backend architecture (recommended MVP)
- **Frontend**: Next.js + TypeScript + Tailwind (already in tasks). Use client-side pages for dashboard and static / server-side rendering for landing pages (SEO).
- **API**: Node.js / TypeScript or Rust/Axum (you mentioned Rust in other projects). Keep API RESTful or GraphQL with endpoints for:
  - `POST /api/auth` (handled by Supabase)
  - `GET /api/subscriptions` (list)
  - `POST /api/subscriptions` (manual add)
  - `POST /api/connections/oauth` (initiate provider OAuth)
  - `POST /api/parse-invoice` (email/invoice upload)
  - `POST /api/notifications` (scheduling)
- **Data store**: PostgreSQL (good fit for Supabase synergy). Use one schema for user/subscription data and encrypted columns for sensitive tokens.
- **Sync & workers**: A background worker queue (e.g., BullMQ / Redis) to fetch provider data (polling), parse emails, and send notifications.
- **File storage**: S3-compatible for invoice uploads and user assets.
- **Third-party services**:
  - **Auth**: Supabase (already planned).
  - **Payments**: Stripe (for future billing, payouts).
  - **Email processing**: Option A — allow users to forward invoices to a unique email inbox (Mailbox provider + parsing), Option B — let user connect Gmail (OAuth) using a secure, audited flow.
  - **Analytics**: Google Analytics / PostHog (already in tasks). :contentReference[oaicite:2]{index=2}

### Integrations & discovery strategies
- **OAuth-first**: Use official OAuth where available — most streaming services support OAuth for account linking; this yields the cleanest, most reliable data.
- **Email parsing**: Use robust parsers (regex + ML classifier). Only process invoices with user consent; show extracted candidate subscriptions for user confirmation.
- **Manual trust anchors**: Allow user to mark a subscription as “verified” or “imported” for confidence scoring.

### Security & privacy (must-haves)
- **User consent & transparency**: Clear consent screens for email scanning, OAuth access scopes, and storage of billing tokens.
- **Encryption**: Encrypt provider tokens and any PII at rest (e.g., using KMS); use TLS in transit.
- **Least privilege**: Only request minimal OAuth scopes needed to read subscription/billing metadata.
- **Data retention & deletion**: Allow users to delete their account and all stored data. Publish a clear privacy policy and TOS linked in the footer. (Footer tasks exist). :contentReference[oaicite:3]{index=3}
- **Compliance**: Prepare for GDPR/CCPA by design (consent logs, data export).

### MVP scope & recommended prioritization
**Phase 1 (MVP landing → core product):**
- Landing page (complete per tasks). :contentReference[oaicite:4]{index=4}
- User sign-up and simple dashboard.
- Manual subscription entry + basic list view and reminders.
- CSV or invoice upload for importing subscriptions (lightweight parsing).
- Basic analytics events (track CTA clicks).

**Phase 2 (connectors + automation):**
- Add OAuth connectors for 3–5 high-value providers (Spotify, Netflix, Apple subscriptions if possible, telco).
- Email parsing mailbox (opt-in).
- Background sync worker + notification scheduling.

**Phase 3 (scale & monetization):**
- Card-based discovery via payments partners (Plaid-type).
- Premium features: automated cancellation, intelligent duplicate detection, savings recommendations.
- Business features: multi-user accounts for small teams, billing & invoicing via Stripe.

### UX & product recommendations (landing → activation)
- Use the landing page CTAs to funnel to a short onboarding wizard: “Connect accounts” or “Add first subscription”.
- Showcase immediate value in the dashboard: show “You save $X / month” or “3 subscriptions renewing soon”.
- Make manual add frictionless: autofill from a small list of popular providers.
- Provide trust signals on the landing page (testimonials, logos) before asking for email access. Social proof tasks are already planned. :contentReference[oaicite:5]{index=5}

### Metrics to track (initial)
- Landing: CTA click-through rate, sign-up conversion.
- Onboarding: connect-completion rate (OAuth), manual-add completion time.
- Retention: weekly active users, subscriptions imported per user.
- Monetization (future): conversion to paid plan, ARPU.

---

## Notes & next steps
- Add a short “How it works” blurb to the Hero or Solution section on the landing page: 3 bullets (Connect, Consolidate, Control) with a /features anchor. This will improve activation.
- Build the backend data model and worker queue early — connector syncs and parsing will need background jobs.
- Prioritise privacy/consent UI for any email or payment discovery flows; surface the minimum necessary scopes to users.

