"use client"

import { motion } from "framer-motion"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "@/hooks/useMobile"
import { slideInRight, hoverScale, tapScale } from "@/lib/animations"

export function SimpleHeader() {
  const isMobile = useIsMobile()

  return (
    <motion.header
      variants={slideInRight}
      initial="hidden"
      animate="visible"
      className="bg-background border-b border-border px-4 sm:px-6 py-3 sm:py-4"
    >
      <div className="flex items-center justify-between gap-4">
        <motion.div
          className="flex items-center gap-2 sm:gap-4 flex-1 max-w-xs sm:max-w-md lg:max-w-lg"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            <Input
              placeholder={isMobile ? "Search..." : "Search dashboard..."}
              className="pl-7 sm:pl-10 text-sm sm:text-base h-8 sm:h-10"
            />
          </div>
        </motion.div>

        <div className="flex items-center gap-1 sm:gap-2">
          <motion.div whileHover={hoverScale} whileTap={tapScale}>
            <Button variant="ghost" size={isMobile ? "sm" : "default"} className="relative">
              <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
          </motion.div>

          <motion.div whileHover={hoverScale} whileTap={tapScale} className="hidden sm:block">
            <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">U</span>
              </div>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
