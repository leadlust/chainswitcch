"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, BarChart2, Search, Wallet } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, FormEvent } from "react";
import WalletDetails from "../components/WalletDetails";
import { motion } from "framer-motion";
export interface Transaction {
  hash: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  timestamp: string;
  from: string;
  to: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface WalletData {
  address: string;
  balance: number;
  transactions: {
    incoming: number;
    outgoing: number;
    firstTx: string;
    lastTx: string;
    history: Transaction[];
  };
}
const fetchWalletData = async (address: string): Promise<WalletData> => {
  try {
    // Generate random number of transactions (1-5)
    const numTransactions = Math.floor(Math.random() * 5) + 1;
    
    // Generate mock transactions
    const mockTransactions: Transaction[] = Array.from({ length: numTransactions }, () => {
      const isIncoming = Math.random() > 0.5;
      const amount = +(Math.random() * 2).toFixed(4);
      const timestamp = new Date(Date.now() - Math.random() * 10000000000).toISOString();
      const statuses: ('completed' | 'pending' | 'failed')[] = ['completed', 'pending', 'failed'];
      
      return {
        hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
        type: isIncoming ? 'incoming' : 'outgoing',
        amount,
        timestamp,
        from: isIncoming 
          ? `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`
          : address,
        to: isIncoming 
          ? address 
          : `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
        status: statuses[Math.floor(Math.random() * statuses.length)]
      };
    });

    // Sort transactions by timestamp (newest first)
    mockTransactions.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    const mockData: WalletData = {
      address: address,
      balance: +(Math.random() * 10).toFixed(4),
      transactions: {
        incoming: Math.floor(Math.random() * 100),
        outgoing: Math.floor(Math.random() * 100),
        firstTx: new Date(Date.now() - Math.random() * 10000000000).toLocaleString(),
        lastTx: new Date().toLocaleString(),
        history: mockTransactions
      }
    };

    return mockData;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    throw error;
  }
};

export default function Page() {
  const [address, setAddress] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  ]);

  const isValidAddress = (address: string): boolean => {
    // Basic Ethereum address validation
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValidAddress(address)) {
      alert("Please enter a valid Ethereum address");
      return;
    }

    setIsValidating(true);
    try {
      const data = await fetchWalletData(address);
      setWalletData(data);

      // Update recent searches
      if (!recentSearches.includes(address)) {
        setRecentSearches((prev) => [address, ...prev.slice(0, 2)]);
      }
    } catch {
      alert("Error fetching wallet data");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="bg-gradient-to-b from-[#1a1625] via-[#6b21a8] to-black">
        {/* Hero Section */}
        <div className="text-center px-4 py-12 sm:py-16 md:py-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Explore <span className="text-purple-400">Blockchain</span> Data
          </h1>
          <p className="text-sm sm:text-base text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Enter any blockchain address to visualize its transactions,
            connections, and analytics
          </p>
          {/* Search Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSearch}
            className="max-w-3xl mx-auto"
          >
            <div className="glass-panel p-2 sm:p-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Enter blockchain address (0x...)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10 bg-black/20 border-gray-700 text-white placeholder:text-gray-400 h-12 w-full"
                />
              </div>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 h-12 px-4 sm:px-8 w-full sm:w-auto"
                disabled={isValidating}
              >
                {isValidating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Validating
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Search <ArrowRight className="ml-2 w-5 h-5" />
                  </div>
                )}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* Wallet Details */}
      <WalletDetails walletData={walletData} isLoading={isValidating} />

      {/* Feature Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-4 pt-12 sm:pt-16 mb-12 sm:mb-16">
        <Card className="bg-gray-900/50 border-gray-800 text-white">
          <CardHeader className="space-y-1">
            <Wallet className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
            <h3 className="text-base sm:text-lg font-semibold">
              Wallet Analysis
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-gray-300">
              Deep dive into wallet activities, token holdings, transaction
              patterns.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800 text-white">
          <CardHeader className="space-y-1">
            <BarChart2 className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
            <h3 className="text-base sm:text-lg font-semibold">
              Visual Analysis
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-gray-300">
              Interactive charts and graphs to visualize transaction flows and
              patterns.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800 text-white">
          <CardHeader className="space-y-1">
            <svg
              className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12h-3m3 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path d="M12 7v5l3 3" />
            </svg>
            <h3 className="text-base sm:text-lg font-semibold">
              Historical Data
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-gray-300">
              Access complete transaction and historical balance changes.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Searches */}
      <div className="max-w-4xl mx-auto px-4 mb-12 sm:mb-16">
        <Card className="bg-gray-900/50 border-gray-800 text-white">
          <CardHeader>
            <h3 className="text-lg sm:text-xl font-semibold">
              Recent Searches
            </h3>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentSearches.map((address) => (
              <div
                key={address}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-800/50"
              >
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded bg-purple-500" />
                <code className="text-xs sm:text-sm text-gray-300">
                  {address}
                </code>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Search Tips */}
      <div className="max-w-4xl mx-auto px-4 mb-12 sm:mb-16">
        <Card className="bg-gray-900/50 border-gray-800 text-white">
          <CardHeader>
            <h3 className="text-lg sm:text-xl font-semibold">Search Tips</h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li>
                • Enter a complete Ethereum address starting with &apos;0x&apos;
              </li>
              <li>• You can search for ENS domains (e.g., vitalik.eth)</li>
              <li>• Contract addresses are also supported for analysis</li>
              <li>
                • Use the search history to quickly access previously analyzed
                addresses
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
