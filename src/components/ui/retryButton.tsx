"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface RetryButtonProps {
  onRetry: () => Promise<void> | void
  disabled?: boolean
  className?: string
}

export function RetryButton({ onRetry, disabled = false, className = "" }: RetryButtonProps) {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    setIsRetrying(true)
    try {
      await onRetry()
    } finally {
      setIsRetrying(false)
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        onClick={handleRetry}
        disabled={disabled || isRetrying}
        variant="secondary"
        size="sm"
        className={className}
      >
        {isRetrying ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-3 h-3 border border-current border-t-transparent rounded-full mr-2"
            />
            Retrying...
          </>
        ) : (
          "🔄 Retry"
        )}
      </Button>
    </motion.div>
  )
}
