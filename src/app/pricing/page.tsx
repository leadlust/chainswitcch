import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface PricingTierProps {
  name: string;
  price: number;
  features: string[];
  isPopular: boolean;
}
interface FAQItemProps {
    question: string;
    answer: string;
  }
const PricingTier = ({
  name,
  price,
  features,
  isPopular,
}: PricingTierProps) => (
  <Card
    className={`bg-gray-900/50 border-gray-800 text-white ${
      isPopular ? "border-purple-500" : ""
    }`}
  >
    <CardHeader>
      <CardTitle className="text-xl sm:text-2xl font-bold">{name}</CardTitle>
      <div className="text-3xl sm:text-4xl font-bold mt-2">
        ${price}
        <span className="text-lg font-normal">/mo</span>
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-5 w-5 text-purple-500 mr-2" />
            <span className="text-sm sm:text-base">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        className={`w-full ${
          isPopular
            ? "bg-purple-600 hover:bg-purple-700"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
      >
        {isPopular ? "Start Free Trial" : "Choose Plan"}
      </Button>
    </CardContent>
  </Card>
);

const FAQItem = ({ question, answer }: FAQItemProps) => (
  <AccordionItem value={question}>
    <AccordionTrigger className="text-left text-sm sm:text-base text-white">
      {question}
    </AccordionTrigger>
    <AccordionContent className="text-gray-400 text-sm">
      {answer}
    </AccordionContent>
  </AccordionItem>
);

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "Basic",
      price: 29,
      features: [
        "Up to 100 wallet lookups/day",
        "Basic transaction history",
        "Email support",
      ],
      isPopular: false,
    },
    {
      name: "Pro",
      price: 99,
      features: [
        "Unlimited wallet lookups",
        "Advanced analytics",
        "API access",
        "Priority support",
      ],
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: 299,
      features: [
        "Custom solutions",
        "Dedicated account manager",
        "On-premise deployment option",
        "24/7 phone support",
      ],
      isPopular: false,
    },
  ];

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and cryptocurrency payments including Bitcoin and Ethereum.",
    },
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial for our Pro plan. No credit card is required to start your trial.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We offer email support for all plans, with priority support and dedicated account managers for higher-tier plans.",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center px-4 py-12 sm:py-16 md:py-24 bg-gradient-to-b from-[#1a1625] via-[#6b21a8] to-black">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Simple, Transparent <span className="text-purple-400">Pricing</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Choose the plan that&apos;s right for you and start exploring
          blockchain data like never before
        </p>
      </section>

      {/* Pricing Tiers */}
      <section className="px-4 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 sm:py-16 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            All Plans Include
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              "Real-time data",
              "User-friendly dashboard",
              "Mobile app access",
              "Data export",
              "Regular updates",
              "Community forum",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-gray-800/50 rounded-lg p-4"
              >
                <Check className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-sm sm:text-base text-white">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 sm:py-16 bg-gradient-to-b from-black to-[#1a1625] text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Ready to get started?
        </h2>
        <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-2xl mx-auto">
          Join thousands of users who are already leveraging BlockViz to gain
          insights from blockchain data.
        </p>
        <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3">
          Start Your Free Trial
        </Button>
      </section>

      <Footer />
    </div>
  );
}
