"use client";

import { Button } from "./Button";
import { Activity, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed w-full z-50 top-0 px-4 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-6 py-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-6 h-6 text-purple-500" />
          <span className="text-xl font-bold">BlockViz</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
          <a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a>
          <a href="/search" className="text-gray-300 hover:text-white transition-colors">Search Address</a>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Launch App
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}