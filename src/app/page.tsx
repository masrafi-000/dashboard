"use client"

import { motion } from "framer-motion"
import { ResponsiveSidebar } from "@/components/layout/responsive-sidebar"
import { SimpleHeader } from "@/components/layout/simple-header"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { useIsMobile } from "@/hooks/use-mobile"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

export default function DashboardPage() {
  const isMobile = useIsMobile()

  return (
    <div className="flex h-screen bg-background">
      <ResponsiveSidebar />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <SimpleHeader />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto space-y-4 sm:space-y-6"
          >
            <motion.div variants={itemVariants}>
              <div className="mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2">
                  Welcome back
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {isMobile ? "Your dashboard overview" : "Here's what's happening with your dashboard today."}
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatsGrid />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ActivityChart />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
