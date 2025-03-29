import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";

interface InvoiceCreatedEmailProps {
  invoiceId: number;
  amount?: number;
  dueDate?: string;
  companyName?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const InvoiceCreatedEmail = ({
  invoiceId,
  amount = 0,
  dueDate = "Not specified",
  companyName = "Invoicify",
}: InvoiceCreatedEmailProps) => (
  <Html>
    <Head />
    <Preview>New Invoice #{invoiceId.toString()} - Action Required</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={logo}>Invoicify</Heading>
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={heading}>Invoice #{invoiceId}</Heading>
          <Text style={paragraph}>
            A new invoice has been created for your attention.
          </Text>

          {/* Invoice Details */}
          <Section style={detailsContainer}>
            <Row>
              <Column>
                <Text style={detailLabel}>Amount Due</Text>
                <Text style={detailValue}>${(amount / 100).toFixed(2)}</Text>
              </Column>
              <Column>
                <Text style={detailLabel}>Due Date</Text>
                <Text style={detailValue}>{dueDate}</Text>
              </Column>
            </Row>
          </Section>

          {/* CTA Button */}
          <Section style={buttonContainer}>
            <Button style={button} href={`${baseUrl}/invoices/${invoiceId}/payment`}>
              View and Pay Invoice
            </Button>
          </Section>

          {/* Security Note */}
          <Text style={securityNote}>
            For security reasons, this payment link will expire in 72 hours.
          </Text>

          <Hr style={hr} />

          {/* Footer */}
          <Text style={footer}>
            This invoice was sent by {companyName} using{" "}
            <Link href={baseUrl} style={link}>
              Invoicify
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

InvoiceCreatedEmail.PreviewProps = {
  invoiceId: 1234,
  amount: 29900,
  dueDate: "March 30, 2024",
  companyName: "Acme Inc",
} as InvoiceCreatedEmailProps;

export default InvoiceCreatedEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 0",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "8px 8px 0 0",
  borderBottom: "1px solid #eaeaea",
};

const logo = {
  color: "#000000",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "32px",
  borderRadius: "0 0 8px 8px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "bold",
  color: "#1f2937",
  padding: "0",
  margin: "0 0 24px",
};

const paragraph = {
  margin: "0 0 24px",
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#374151",
};

const detailsContainer = {
  padding: "24px",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  margin: "0 0 24px",
};

const detailLabel = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "0 0 4px",
};

const detailValue = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#1f2937",
  margin: "0",
};

const buttonContainer = {
  padding: "24px 0",
};

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "6px",
  fontWeight: "bold",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
};

const securityNote = {
  fontSize: "14px",
  color: "#6b7280",
  fontStyle: "italic",
  textAlign: "center" as const,
  margin: "16px 0 0",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0 24px",
};

const footer = {
  fontSize: "14px",
  color: "#6b7280",
  textAlign: "center" as const,
  margin: "0",
};

const link = {
  color: "#3b82f6",
  textDecoration: "none",
};