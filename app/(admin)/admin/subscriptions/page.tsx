import AdminPremiumFeature from "@/components/admin/AdminPremiumFeature";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter Subscriptions - Admin Panel",
  description: "Manage newsletter subscriptions",
};

export default function SubscriptionsPage() {
  return (
    <AdminPremiumFeature
      featureName="Subscription Management"
      description="Manage newsletter subscriptions, segment your audience, and send targeted campaigns with our premium subscription management tools."
    />
  );
}
