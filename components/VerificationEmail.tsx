import { Html, Tailwind, Body, Container, Heading, Text, Button, Section } from '@react-email/components';

interface VerificationEmailProps {
  verificationUrl: string;
  appName?: string;
}

export default function VerificationEmail({
  verificationUrl,
  appName = "SceneCraft",
}: VerificationEmailProps) {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-gray-100 text-gray-900">
          <Container className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            {/* Header */}
            <Section className="text-center">
              <Heading className="text-2xl font-bold text-gray-900">
                Verify Your Email
              </Heading>
              <Text className="text-gray-600">
                Welcome to <strong>{appName}</strong>! Click the button below to verify your email.
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="text-center my-6">
              <Button
                href={verificationUrl}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300"
              >
                Verify Email
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="text-center text-gray-600 text-sm">
              <Text>
                If the button above doesn’t work, copy and paste the following link into your browser:
              </Text>
              <Text className="break-words text-blue-500">{verificationUrl}</Text>
            </Section>

            {/* Footer */}
            <Section className="text-center text-gray-500 text-xs mt-6">
              <Text>
                If you didn’t request this email, you can safely ignore it.
              </Text>
              <Text>© {new Date().getFullYear()} {appName}. All rights reserved.</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}