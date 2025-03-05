import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1a1625]">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <section className="pt-20 sm:pt-32 pb-16 sm:pb-20 px-4 text-center bg-gradient-to-b from-[#1a1625] via-[#6b21a8] to-black">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          About <span className="text-[#a855f7]">BlockViz</span>
        </h1>
        <p className="text-gray-200 max-w-2xl mx-auto text-sm sm:text-base">
          We are on a mission to make blockchain data accessible, understandable, and actionable for everyone
        </p>
      </section>

      {/* Our Story Section */}
      <section className="px-4 py-12 sm:py-16 bg-black">
        <Card className="max-w-4xl mx-auto bg-[#1a1625] border-none text-white">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Our Story</h2>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              Founded in 2023, <span className="text-[#6B46C1]">BlockViz</span> emerged from a simple observation: while
              blockchain technology was revolutionizing the world, understanding its data remained a challenge for many.
              Our team of blockchain enthusiasts and data visualization experts came together with a shared vision - to
              create the most intuitive and <span className="text-[#6B46C1]">powerful</span> blockchain analytics
              platform.
            </p>
            <p className="text-gray-300 text-sm sm:text-base">
              Today, we&apos;re proud to serve thousands of users worldwide, from individual investors to large institutions,
              helping them make sense of blockchain data through beautiful, interactive visualizations
            </p>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mt-8 sm:mt-12">
          <Card className="bg-[#1a1625] border-none text-white">
            <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-[#6B46C1] mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">User-Centric</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Everything we build starts with our user. We&apos;re committed to creating tools that are both powerful and
                intuitive.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1625] border-none text-white">
            <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-[#6B46C1] mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                We&apos;re constantly pushing the boundaries of what&apos;s possible in blockchain data visualization.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1625] border-none text-white">
            <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#6B46C1] mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Community</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                We believe in the power of community and actively contribute to the blockchain ecosystem.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="px-4 py-12 sm:py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Leadership</h2>
          <p className="text-gray-300 mb-8 sm:mb-12 text-sm sm:text-base">
            Meet the team behind <span className="text-[#6B46C1]">BlockViz</span>, bringing together expertise in
            blockchain, data science, and product design
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {["Arlene Phuong Brown", "Le Hoang Long", "Le Nguyen Thai Son"]
              .map((name) => (
                <div key={name} className="text-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-700 rounded-full mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-medium mb-1 text-sm sm:text-base">{name}</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Team Member</p>
                </div>
              ))}
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="px-4 py-12 sm:py-16 bg-black">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: "Founded", value: "2023" },
            { label: "Active Users", value: "10K+" },
            { label: "Blockchain Networks", value: "50+" },
            { label: "In Funding", value: "$5M+" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-[#1a1625] border-none text-white">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-[#6B46C1] text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
