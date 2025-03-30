import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ArrowRight,
  CreditCard,
  FileText,
  Mail,
  Wallet,
  Zap
} from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-6xl font-bold tracking-tight text-gray-900 text-center mb-6">
          Invoicify
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl mb-8">
          Create and send professional invoices in seconds. Get paid faster with
          integrated payment processing.
        </p>
        <Button size="lg" asChild className="h-12 px-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Everything you need to manage invoices
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <FileText className="w-10 h-10 text-blue-500 mb-2" />
              <CardTitle>Professional Invoices</CardTitle>
              <CardDescription>
                Create beautiful, customizable invoices in seconds
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="w-10 h-10 text-yellow-500 mb-2" />
              <CardTitle>Fast Payments</CardTitle>
              <CardDescription>
                Accept payments instantly with Stripe integration
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Mail className="w-10 h-10 text-green-500 mb-2" />
              <CardTitle>Automated Sending</CardTitle>
              <CardDescription>
                Send invoices directly to your customers via email
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Flexible Payment Options
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <Card className="w-full md:w-80">
              <CardHeader className="items-center">
                <CreditCard className="w-12 h-12 text-purple-500 mb-2" />
                <CardTitle>Stripe Payments</CardTitle>
                <CardDescription className="text-center">
                  Accept credit cards and more with Stripe's secure payment
                  processing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="w-full md:w-80">
              <CardHeader className="items-center">
                <Wallet className="w-12 h-12 text-gray-400 mb-2" />
                <CardTitle>Coming Soon</CardTitle>
                <CardDescription className="text-center">
                  Paystack integration for additional payment options
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to streamline your invoicing?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of businesses using Invoicify to manage their
            invoices and get paid faster.
          </p>
          <Button size="lg" asChild className="h-12 px-8">
            <Link href="/dashboard">Start Now</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
