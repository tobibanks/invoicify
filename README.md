
# Invoicify - Modern Invoice Management System

A professional invoicing application built with Next.js 14, featuring Stripe payments, email notifications, and organization management.

## Core Features

- 🔐 Authentication & Organizations with [Clerk](https://clerk.com)
- 💳 Payment processing with [Stripe](https://stripe.com)
- 📧 Email notifications using [Resend](https://resend.com)
- 🎨 UI components from [shadcn/ui](https://ui.shadcn.com)
- 🗃️ PostgreSQL database with [Xata](https://xata.io)
- 📊 Database migrations with [Drizzle ORM](https://orm.drizzle.team)
- 🔄 Real-time status updates
- 📱 Responsive design with [Tailwind CSS](https://tailwindcss.com)

## Tech Stack

### Frontend

- **Next.js 14**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Re-usable components built with Radix UI
- **Lucide React**: Beautiful icons
- **React Email**: Email template components

### Backend

- **Clerk**: Authentication & organization management
- **Stripe**: Payment processing
- **Xata**: PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database queries
- **Resend**: Email delivery service

## Getting Started

1. Clone and install dependencies:

```bash
git clone <repository-url>
cd invoicify
npm install
```

2. Set up environment variables:

```env
# Authentication - Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

# Database - Xata
XATA_DATABASE_URL=
XATA_API_KEY=

# Payments - Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Email - Resend
RESEND_API_KEY=
```

3. Initialize the database:

```bash
npm run db:push
```

4. Start the development server:

```bash
npm run dev
```

## Key Features

### Authentication & Organizations

- User authentication with Clerk
- Organization management
- Role-based access control

### Invoice Management

- Create and edit invoices
- Attach to organizations
- Status tracking
- PDF generation

### Payments

- Stripe Checkout integration
- Multiple payment methods
- Automatic status updates
- Payment history

### Email Notifications

- React Email templates
- Payment confirmations
- Invoice reminders
- Status updates

## Project Structure

```
invoicify/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── db/              # Database schema and migrations
│   ├── emails/          # Email templates
│   ├── lib/             # Utility functions
│   └── styles/          # Global styles
├── public/              # Static assets
└── drizzle/            # Database migrations
```

## API Routes

- `/api/webhooks/stripe`: Stripe webhook endpoint
- `/api/webhooks/clerk`: Clerk webhook endpoint
- `/api/invoices`: Invoice management
- `/api/organizations`: Organization management

## Development

```bash
# Run development server
npm run dev

# Type check
npm run type-check

# Format code
npm run format

# Lint code
npm run lint

# Run tests
npm run test

# Create database migration
npm run db:generate

# Push database changes
npm run db:push
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
