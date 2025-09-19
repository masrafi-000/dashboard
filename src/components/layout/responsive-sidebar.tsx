"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, FileText, Users,  LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/useMobile"
import { slideInLeft, staggerContainer, fadeInUp, hoverScale, tapScale } from "@/lib/animations"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Posts", href: "/posts", icon: FileText },
  { name: "Users", href: "/users", icon: Users },
]



export function ResponsiveSidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = () => {
    router.push("/auth/login")
  }

  const sidebarContent = (
    <motion.div
      variants={slideInLeft}
      initial="hidden"
      animate="visible"
      className="w-full h-full bg-card border-r border-border flex flex-col"
    >
      <motion.div variants={fadeInUp} className="p-4 sm:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-foreground">Zettabyte</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Dashboard</p>
          </div>
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="lg:hidden">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </motion.div>

      <nav className="flex-1 p-3 sm:p-4">
        <motion.ul variants={staggerContainer} initial="hidden" animate="visible" className="space-y-1 sm:space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <motion.li key={item.name} variants={fadeInUp}>
                <motion.div whileHover={hoverScale} whileTap={tapScale}>
                  <Link
                    href={item.href}
                    onClick={() => isMobile && setIsOpen(false)}
                    className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              </motion.li>
            )
          })}
        </motion.ul>
      </nav>

      <motion.div variants={fadeInUp} className="p-3 sm:p-4 border-t border-border" onClick={ handleSignOut}>
        <motion.div whileHover={hoverScale} whileTap={tapScale}>
          <Button variant="ghost" className="w-full justify-start text-sm sm:text-base" size="sm">
            <LogOut className="h-4 w-4 mr-2 flex-shrink-0" />
            Sign Out
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )

  if (isMobile) {
    return (
      <>
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="xl:hidden fixed top-5 left-4 z-50 bg-background/80 backdrop-blur-sm border"
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 h-full w-80 max-w-[85vw] z-50 lg:hidden"
              >
                {sidebarContent}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Desktop sidebar
  return <div className="hidden lg:block w-64 xl:w-72 flex-shrink-0">{sidebarContent}</div>
}
