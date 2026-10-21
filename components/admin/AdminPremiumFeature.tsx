"use client";

import { motion } from "framer-motion";
import { Crown, Sparkles, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

interface AdminPremiumFeatureProps {
  featureName: string;
  description?: string;
}

export default function AdminPremiumFeature({
  featureName,
  description = "This premium feature is only available in the paid version of ShopCart Pro.",
}: AdminPremiumFeatureProps) {
  const upgradeUrl =
    process.env.NEXT_PUBLIC_PAID_VERION ||
    "https://www.buymeacoffee.com/noor_Mohammad";

  const premiumFeatures = [
    "Advanced Analytics Dashboard",
    "Review Management System",
    "Subscription Management",
    "Customer Insights & Reports",
    "Export Data to Excel/CSV",
    "Email Marketing Integration",
    "Custom Admin Branding",
    "Priority Support & Updates",
  ];

  return (
    <div className="min-h-[600px] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        {/* Premium Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-linear-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg">
            <Lock className="w-5 h-5" />
            <span className="font-semibold">Premium Feature</span>
          </div>
        </motion.div>

        {/* Main Card */}
        <div className="bg-linear-to-br from-purple-50 via-white to-indigo-50 rounded-3xl shadow-2xl border-2 border-purple-200/50 overflow-hidden">
          {/* Animated Background */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-purple-300/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-300/30 rounded-full blur-3xl"
            />

            {/* Content */}
            <div className="relative p-12">
              {/* Icon and Title */}
              <div className="text-center mb-8">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-purple-600 via-indigo-600 to-purple-700 rounded-3xl shadow-2xl mb-6"
                >
                  <Crown className="w-12 h-12 text-yellow-300" />
                </motion.div>

                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  {featureName}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {premiumFeatures.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href={upgradeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-indigo-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-200" />
                  <div className="relative bg-linear-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-xl flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    <span>Get Paid Version</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  href="/admin"
                  className="px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back to Dashboard
                </Link>
              </div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-center"
              >
                <div className="inline-flex items-center gap-2 bg-purple-100/50 px-6 py-3 rounded-full">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-purple-900 font-medium">
                    One-time payment • Lifetime access • All future updates
                    included
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
