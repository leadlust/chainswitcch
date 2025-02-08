"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Wallet, History, BarChart2, AlertCircle } from "lucide-react";
import { Button } from "../components/Button";
import {Input} from "../components/Input";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SearchPage() {
  const [address, setAddress] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [recentSearches] = useState([
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    // Simulate validation delay
    setTimeout(() => setIsValidating(false), 1000);
  };

  return (
    <main className="min-h-screen relative">
    <Navbar/>
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center pt-32 pb-16 px-4 hero-gradient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Explore <span className="gradient-text">Blockchain</span> Data
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Enter any blockchain address to visualize its transactions, connections, and analytics.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSearch}
            className="max-w-3xl mx-auto"
          >
            <div className="glass-panel p-4 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Enter blockchain address (0x...)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10 bg-black/20 border-gray-700 text-white placeholder:text-gray-400 h-12"
                />
              </div>
              <Button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700 h-12 px-8"
                disabled={isValidating}
              >
                {isValidating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Validating
                  </div>
                ) : (
                  <div className="flex items-center">
                    Search <ArrowRight className="ml-2 w-5 h-5" />
                  </div>
                )}
              </Button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-6"
            >
              <Wallet className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Wallet Analysis</h3>
              <p className="text-gray-300">
                Deep dive into wallet activities, token holdings, and transaction patterns.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6"
            >
              <BarChart2 className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Visual Analytics</h3>
              <p className="text-gray-300">
                Interactive charts and graphs to visualize transaction flows and patterns.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel p-6"
            >
              <History className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Historical Data</h3>
              <p className="text-gray-300">
                Access complete transaction history and historical balance changes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Searches */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass-panel p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <History className="w-6 h-6 mr-2 text-purple-500" />
              Recent Searches
            </h2>
            <div className="space-y-4">
              {recentSearches.map((addr, index) => (
                <motion.div
                  key={addr}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <Wallet className="w-5 h-5 text-purple-500" />
                    <span className="font-mono text-sm md:text-base text-gray-300">{addr}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="glass-panel p-8"
          >
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Search Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Enter a complete Ethereum address starting with "0x"</li>
                  <li>You can search for ENS domains (e.g., "vitalik.eth")</li>
                  <li>Contract addresses are also supported for analysis</li>
                  <li>Use the search history to quickly access previously analyzed addresses</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer/>
    </main>
  );
}