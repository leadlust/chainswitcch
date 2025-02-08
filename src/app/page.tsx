import { Button } from "./components/Button";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BarChart3, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar/>
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center pt-32 pb-16 px-4 hero-gradient">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Visualize <span className="gradient-text">Blockchain</span> Data
            <br />Like Never Before
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Powerful analytics and visualization tools to explore blockchain networks,
            track transactions, and analyze on-chain data in real-time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6">
              Launch App
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-5xl md:text-4xl font-bold mb-6">
                What is <span className="gradient-text">BlockViz</span> ?
              </h2>

              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                <span className="gradient-text">BlockViz</span> is the ultimate blockchain analytics platform, designed to transform complex on-chain data into interactive, real-time visualizations.
                With our intuitive tools, you can track wallet movements, analyze trends, and uncover hidden patterns across blockchain networks effortlessly.
              </p>
            </div>
      </section>

      {/* Features and Stats Section */}
      <section className="h-screen flex flex-col items-center justify-center hero-gradient">
        <div className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-panel p-6 float-animation" style={{ animationDelay: "0s" }}>
                <BarChart3 className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
                <p className="text-gray-300">
                  Track blockchain metrics and visualize network activity with powerful real-time analytics.
                </p>
              </div>
              
              <div className="glass-panel p-6 float-animation" style={{ animationDelay: "0.2s" }}>
                <Zap className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-gray-300">
                  Experience blazing-fast data processing and visualization with our optimized engine.
                </p>
              </div>

              <div className="glass-panel p-6 float-animation" style={{ animationDelay: "0.4s" }}>
                <Shield className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
                <p className="text-gray-300">
                  Built with enterprise-grade security to ensure your data is always protected.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-4xl font-bold gradient-text mb-2">1M+</h4>
                <p className="text-gray-300">Transactions Analyzed</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold gradient-text mb-2">50+</h4>
                <p className="text-gray-300">Blockchain Networks</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold gradient-text mb-2">10K+</h4>
                <p className="text-gray-300">Active Users</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold gradient-text mb-2">99.9%</h4>
                <p className="text-gray-300">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    <Footer/>
    </main>
  );
}