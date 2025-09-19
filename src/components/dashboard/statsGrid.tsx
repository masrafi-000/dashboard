"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useStats } from "@/hooks/useDashboardData";
import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  FileText,
  Loader2,
  TrendingUp,
  Users,
} from "lucide-react";
// import { useIsMobile } from "@/hooks/useMobile"
import {
  fadeInUp,
  hoverScale,
  scaleIn,
  staggerContainer,
  tapScale,
} from "@/lib/animations";

const iconMap = {
  "Total Users": Users,
  "Active Posts": FileText,
  Engagement: TrendingUp,
  Activity: Activity,
};

const colorMap = {
  "Total Users": "text-blue-600",
  "Active Posts": "text-green-600",
  Engagement: "text-purple-600",
  Activity: "text-orange-600",
};

export function StatsGrid() {
  const { data: stats, isLoading, error, refetch } = useStats();

  if (isLoading) {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div key={index} variants={scaleIn}>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-center h-16 sm:h-20">
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: (t) => t,
                      },
                      scale: {
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: (t) =>
                          t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
                      },
                    }}
                  >
                    <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8"
      >
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-center flex-col gap-3 sm:gap-4">
              <motion.div
                animate={{
                  x: [0, -5, 5, -5, 5, 0],
                  rotate: [0, -2, 2, -2, 2, 0],
                }}
                transition={{ duration: 0.5 }}
              >
                <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-destructive" />
              </motion.div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground mb-1">
                  Failed to load stats
                </p>
                <p className="text-xs text-muted-foreground mb-3 sm:mb-4">
                  Please try again
                </p>
                <motion.div whileHover={hoverScale} whileTap={tapScale}>
                  <Button onClick={() => refetch()} size="sm">
                    Retry
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8"
    >
      {stats?.map((stat, index) => {
        const Icon = iconMap[stat.title as keyof typeof iconMap] || TrendingUp;
        const color =
          colorMap[stat.title as keyof typeof colorMap] || "text-gray-600";

        return (
          <motion.div
            key={stat.title}
            variants={fadeInUp}
            whileHover={hoverScale}
            whileTap={tapScale}
          >
            <Card>
              <CardContent className="p-4 sm:p-6 ">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 truncate">
                      {stat.title}
                    </p>
                    <motion.p
                      className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                    >
                      {stat.value}
                    </motion.p>
                    <motion.p
                      className={`text-xs mt-1 ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
                    >
                      {stat.change}
                    </motion.p>
                  </div>
                  <motion.div
                    className={`p-2 sm:p-3 rounded-lg bg-muted ${color} flex-shrink-0`}
                    animate={{
                      y: [0, -2, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      delay: index * 0.1 + 0.6,
                      duration: 0.6,
                      ease: (t) => t * (2 - t),
                    }}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
