/*TEAM MEMBERS*/
/*Arlene - SWS00743/104504111*/
/*Long Le - SWS01138/104845140*/
/*Son Le - SWS00890/104991140*/
/*Minh Duc - SWS00108/103810053*/

import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
export default function Page() {
  return (
    <div className="min-h-screen bg-[#1a1625]">
      <Navbar />
      {/* Hero Section */}
      <section className="text-center px-4 sm:px-6 py-16 sm:py-24 md:py-32 bg-gradient-to-b from-[#1a1625] via-[#6b21a8] to-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Visualize <span className="text-[#a855f7]">Blockchain</span> Data
            <br className="hidden sm:inline" />
            Like Never Before
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto mb-6 sm:mb-8 text-base sm:text-lg">
            Powerful analytics and visualization tools to explore blockchain
            networks, track transactions, and analyze on-chain data in real-time
          </p>
          <Button className="bg-[#a855f7] hover:bg-[#9333ea] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg h-auto">
            <Link href="/visualizer">Launch App</Link>
          </Button>
        </div>
      </section>

      {/* What is BlockViz Section */}
      <section className="bg-black py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            What is <span className="text-[#a855f7]">BlockViz</span> ?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            BlockViz is the ultimate blockchain analytics platform, designed to
            transform complex on-chain data into interactive, real-time
            visualizations. With our intuitive tools, you can track wallet
            movements, analyze trends, and uncover hidden patterns across
            blockchain networks effortlessly.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#1a1625]">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-[#2d2640] p-4 sm:p-6 rounded-lg">
            <div className="mb-4">
              <div className="w-12 h-12 bg-[#a855f7]/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#a855f7]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="8" strokeWidth="2" />
                  <path d="M12 8v8" strokeWidth="2" />
                  <path d="M8 12h8" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Real-time Analytics
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Track blockchain metrics and visualize network activity with
              powerful real-time analytics
            </p>
          </div>

          <div className="bg-[#2d2640] p-4 sm:p-6 rounded-lg">
            <div className="mb-4">
              <div className="w-12 h-12 bg-[#a855f7]/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#a855f7]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Experience blazing-fast data processing and visualization with our
              optimized engine.
            </p>
          </div>

          <div className="bg-[#2d2640] p-4 sm:p-6 rounded-lg">
            <div className="mb-4">
              <div className="w-12 h-12 bg-[#a855f7]/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#a855f7]" />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Secure & Reliable
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Built with enterprise-grade security to ensure your data is always
              protected.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-[#1a1625]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#a855f7] mb-1 sm:mb-2">
              1M+
            </div>
            <div className="text-gray-400 text-sm sm:text-base">
              Transactions Analyzed
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#a855f7] mb-1 sm:mb-2">
              50+
            </div>
            <div className="text-gray-400 text-sm sm:text-base">
              Blockchain Networks
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#a855f7] mb-1 sm:mb-2">
              10K+
            </div>
            <div className="text-gray-400 text-sm sm:text-base">
              Active Users
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#a855f7] mb-1 sm:mb-2">
              99%
            </div>
            <div className="text-gray-400 text-sm sm:text-base">Uptime</div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
