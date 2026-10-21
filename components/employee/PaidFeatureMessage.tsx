"use client";

import { motion } from "framer-motion";
import { Lock, ExternalLink, Crown, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PaidFeatureMessage() {
  const paidVersionUrl =
    process.env.NEXT_PUBLIC_PAID_VERION || "https://buymeacoffee.com/reactbd";

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="border-2 border-purple-200 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-20 h-20 bg-linear-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg"
            >
              <Crown className="w-10 h-10 text-white" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              Employee Management
            </CardTitle>
            <p className="text-lg text-purple-600 font-semibold">
              Premium Feature
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Main Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                <Lock className="w-6 h-6 text-purple-600 mt-1 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Unlock Advanced Employee Features
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    The Employee Management System is available exclusively in
                    the{" "}
                    <span className="font-semibold text-purple-600">
                      paid version
                    </span>{" "}
                    of ShopCart. Upgrade to access powerful tools for managing
                    your team.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <h4 className="font-semibold text-gray-900 mb-3">
                Premium Features Include:
              </h4>
              {[
                "Employee Dashboard with Performance Metrics",
                "Order Processing & Management",
                "Call Center Order Confirmation",
                "Packing & Warehouse Operations",
                "Delivery Management System",
                "Employee Performance Tracking",
                "Role-based Access Control",
                "Real-time Order Updates",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-4"
            >
              <Link
                href={paidVersionUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="w-full h-14 text-lg font-semibold bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-300 transition-all duration-300"
                  size="lg"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Get Paid Version
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center text-sm text-gray-500 pt-2"
            >
              <p>One-time purchase • Lifetime updates • Premium support</p>
            </motion.div>
          </CardContent>
        </Card>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6"
        >
          <Link
            href="/"
            className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
