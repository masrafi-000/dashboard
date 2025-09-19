"use client";

import PageTransition from "@/components/layout/pageTransition";
import { ResponsiveSidebar } from "@/components/layout/responsive-sidebar";
import { SimpleHeader } from "@/components/layout/simple-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";
import { RetryButton } from "@/components/ui/retryButton";
import { useFetch } from "@/hooks/useFetch";
import { useIsMobile } from "@/hooks/useMobile";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function PostsPage() {
  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts");
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen bg-background">
      <ResponsiveSidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <SimpleHeader />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          <PageTransition>
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 sm:mb-8"
              >
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Posts</h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {isMobile
                    ? "Browse community posts"
                    : "Browse through all available posts from our community."}
                </p>
              </motion.div>

              {loading && (
                <div className="flex justify-center items-center h-48 sm:h-64">
                  <LoadingSpinner size={isMobile ? "md" : "lg"} />
                  <span className="ml-3 text-sm sm:text-base text-muted-foreground">
                    Loading posts...
                  </span>
                </div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 sm:py-12"
                >
                  <Card className="max-w-md mx-auto border-destructive/20">
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                        ⚠️
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2 text-destructive">
                        Failed to load posts
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                        {error}
                      </p>
                      <RetryButton onRetry={refetch} />
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {posts && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                >
                  {posts.map((post) => (
                    <motion.div key={post.id} variants={itemVariants}>
                      <Link href={`/posts/${post.id}`}>
                        <Card className="h-full cursor-pointer transition-all duration-200 hover:shadow-lg">
                          <CardHeader className="pb-3 sm:pb-4">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-base sm:text-lg line-clamp-2 text-balance pr-2">
                                {post.title}
                              </CardTitle>
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full flex-shrink-0">
                                #{post.id}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <CardDescription className="line-clamp-3 text-pretty text-sm">
                              {post.body}
                            </CardDescription>
                            <div className="mt-3 sm:mt-4 flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                User {post.userId}
                              </span>
                              <span className="text-xs text-primary font-medium flex items-center gap-2 ">
                                Read more <ArrowRight size={20} />
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
