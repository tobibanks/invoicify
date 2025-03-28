
# Invoicipedia - Next.js Invoicing Application

A modern invoicing application built with Next.js, allowing users to create and manage invoices with features like payment processing and email notifications.

## Features

- 🔐 Authentication with [Clerk](https://clerk.com)
- 💳 Payment processing with [Stripe](https://stripe.com)
- 📧 Email notifications using [React Email](https://react.email)
- 🎨 UI components with [shadcn/ui](https://ui.shadcn.com)
- 🗃️ PostgreSQL database with [Drizzle ORM](https://orm.drizzle.team)
- 🔄 Real-time status updates
- 📱 Responsive design with Tailwind CSS

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Drizzle ORM](https://orm.drizzle.team) - Database ORM
- [Clerk](https://clerk.com) - Authentication
- [Stripe](https://stripe.com) - Payment processing
- [React Email](https://react.email) - Email templates

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd invoicing-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
XATA_DATABASE_URL=
STRIPE_API_SECRET=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
```

4. Set up the database:

```bash
npm run migrate
# or
yarn migrate
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/src/app` - App router pages and layouts
- `/src/components` - Reusable React components
- `/src/db` - Database schema and migrations
- `/src/emails` - Email templates
- `/src/lib` - Utility functions
- `/src/data` - Constants and data types

## Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run Biome linter
- `format` - Format code with Biome
- `generate` - Generate Drizzle migrations
- `migrate` - Run database migrations
- `email` - Start email preview server

## License

This project is licensed under the MIT License.
