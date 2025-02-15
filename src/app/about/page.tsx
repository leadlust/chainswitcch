// "use client";

// import { motion } from "framer-motion";
// import { Activity, Users, Target, Rocket, Award, Heart } from "lucide-react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// export default function AboutPage() {
//   return (
//     <main className="min-h-screen relative">
//     <Navbar/>
//       {/* Hero Section */}
//       <section className="h-screen flex flex-col items-center justify-center pt-32 pb-16 px-4 hero-gradient">
//         <div className="max-w-7xl mx-auto text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-5xl md:text-7xl font-bold mb-6"
//           >
//             About <span className="gradient-text">BlockViz</span>
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
//           >
//             We're on a mission to make blockchain data accessible, understandable, and actionable for everyone.
//           </motion.p>
//         </div>
//       </section>

//       {/* Story Section */}
//       <section className="py-20 px-4 bg-[#a855f7]">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="glass-panel p-8 mb-12"
//           >
//             <div className="flex items-center space-x-3 mb-6">
//               <Activity className="w-8 h-8 text-purple-500" />
//               <h2 className="text-3xl font-bold">Our Story</h2>
//             </div>
//             <p className="text-gray-300 leading-relaxed mb-6">
//               Founded in 2023, <span className="gradient-text">BlockViz</span> emerged from a simple observation: while blockchain technology was revolutionizing the world, understanding its data remained a challenge for many. Our team of blockchain enthusiasts and data visualization experts came together with a shared vision - to create the most <span className="gradient-text">intuitive</span> and <span className="gradient-text">powerful</span> blockchain analytics platform.
//             </p>
//             <p className="text-gray-300 leading-relaxed">
//               Today, we're proud to serve thousands of users worldwide, from individual investors to large institutions, helping them make sense of blockchain data through beautiful, interactive visualizations.
//             </p>
//           </motion.div>

//           {/* Values Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="glass-panel p-6"
//             >
//               <Users className="w-12 h-12 text-purple-500 mb-4" />
//               <h3 className="text-xl font-semibold mb-3">User-Centric</h3>
//               <p className="text-gray-300">
//                 Everything we build starts with our users. We're committed to creating tools that are both powerful and intuitive.
//               </p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="glass-panel p-6"
//             >
//               <Target className="w-12 h-12 text-purple-500 mb-4" />
//               <h3 className="text-xl font-semibold mb-3">Innovation</h3>
//               <p className="text-gray-300">
//                 We're constantly pushing the boundaries of what's possible in blockchain data visualization.
//               </p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="glass-panel p-6"
//             >
//               <Heart className="w-12 h-12 text-purple-500 mb-4" />
//               <h3 className="text-xl font-semibold mb-3">Community</h3>
//               <p className="text-gray-300">
//                 We believe in the power of community and actively contribute to the blockchain ecosystem.
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-20 px-4 bg-black/20">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-3xl font-bold mb-4">Our Leadership</h2>
//             <p className="text-gray-300 max-w-2xl mx-auto">
//               Meet the team behind <span className="gradient-text">BlockViz</span>, bringing together expertise in blockchain, data science, and product design.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-4 gap-8">
//             {[
//               {
//                 name: "Arlene Phuong Brown",
//                 role: "Team Member",
//                 image: "https://images.unsplash.com/photo-1611267254323-4db7b39c732c?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//               },
//               {
//                 name: "Meow",
//                 role: "Team Member",
//                 image: "https://plus.unsplash.com/premium_photo-1675848495392-6b9a3b962df0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D",
//               },
//               {
//                 name: "Meow",
//                 role: "Team Member",
//                 image: "https://images.unsplash.com/photo-1578339850459-76b0ac239aa2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGN1dGUlMjBjYXR8ZW58MHx8MHx8fDA%3D",
//               },
//               {
//                 name: "Meow",
//                 role: "Team Member",
//                 image: "https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGN1dGUlMjBjYXR8ZW58MHx8MHx8fDA%3D",
//               }
//             ].map((member, index) => (
//               <motion.div
//                 key={member.name}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.7 + index * 0.1 }}
//                 className="glass-panel p-6 text-center"
//               >
//                 <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
//                   <img
//                     src={member.image}
//                     alt={member.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
//                 <p className="text-gray-400">{member.role}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Achievement Section */}
//       <section className="py-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//             className="glass-panel p-8"
//           >
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//               <div>
//                 <Award className="w-12 h-12 text-purple-500 mx-auto mb-4" />
//                 <h4 className="text-2xl font-bold gradient-text mb-2">2023</h4>
//                 <p className="text-gray-300">Founded</p>
//               </div>
//               <div>
//                 <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
//                 <h4 className="text-2xl font-bold gradient-text mb-2">10K+</h4>
//                 <p className="text-gray-300">Active Users</p>
//               </div>
//               <div>
//                 <Target className="w-12 h-12 text-purple-500 mx-auto mb-4" />
//                 <h4 className="text-2xl font-bold gradient-text mb-2">50+</h4>
//                 <p className="text-gray-300">Blockchain Networks</p>
//               </div>
//               <div>
//                 <Rocket className="w-12 h-12 text-purple-500 mx-auto mb-4" />
//                 <h4 className="text-2xl font-bold gradient-text mb-2">$5M+</h4>
//                 <p className="text-gray-300">In Funding</p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//       <Footer/>
//     </main>
//   );
// }
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
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

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {["Arlene Phong Brown", "Le Hoang Long", "Le Nguyen Thai Son", "Minh Duc"].map((name) => (
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
