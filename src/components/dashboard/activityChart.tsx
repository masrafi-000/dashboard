"use client"

import { motion } from "framer-motion"
import { Loader2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useActivity } from "@/hooks/useDashboardData"
import { useIsMobile } from "@/hooks/useMobile"
import { fadeInUp, scaleIn, hoverScale, tapScale } from "@/lib/animations"

export function ActivityChart() {
  const { data: activity, isLoading, error, refetch } = useActivity()
  const isMobile = useIsMobile()

  if (isLoading) {
    return (
      <motion.div variants={scaleIn} initial="hidden" animate="visible">
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Activity Overview</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {isMobile ? "Past 7 days" : "Your dashboard activity over the past 7 days"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 sm:h-64 flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
              >
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div variants={scaleIn} initial="hidden" animate="visible">
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Activity Overview</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {isMobile ? "Past 7 days" : "Your dashboard activity over the past 7 days"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 sm:h-64 flex items-center justify-center flex-col gap-3 sm:gap-4">
              <motion.div
                animate={{
                  x: [0, -3, 3, -3, 3, 0],
                  rotate: [0, -1, 1, -1, 1, 0],
                }}
                transition={{ duration: 0.6 }}
              >
                <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-destructive" />
              </motion.div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground mb-1">Failed to load activity data</p>
                <p className="text-xs text-muted-foreground mb-3 sm:mb-4">Please try again</p>
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
    )
  }

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">Activity Overview</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {isMobile ? "Past 7 days" : "Your dashboard activity over the past 7 days"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 sm:h-64 flex items-end justify-center gap-2 sm:gap-4 p-2 sm:p-4">
            {activity?.map((item, index) => (
              <motion.div
                key={item.day}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: `${item.value}%`,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: isMobile ? 1.02 : 1.05,
                  backgroundColor: "hsl(var(--primary) / 0.8)",
                  transition: { duration: 0.2 },
                }}
                className="bg-primary rounded-t-lg flex-1 max-w-8 sm:max-w-12 min-h-2 cursor-pointer"
              />
            ))}
          </div>
          <motion.div
            className="flex justify-between text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-4 px-2 sm:px-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.8,
                },
              },
            }}
          >
            {activity?.map((item) => (
              <motion.span
                key={item.day}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="truncate"
              >
                {isMobile ? item.day.slice(0, 3) : item.day}
              </motion.span>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
