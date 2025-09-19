"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import Header from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loadingSpinner"
import { useFetch } from "@/hooks/useFetch"
import React from "react"
import PageTransition from "@/components/layout/pageTransition"
import { ResponsiveSidebar } from "@/components/layout/responsive-sidebar"

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface User {
  id: number
  name: string
  username: string
  email: string
}

interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export default function PostDetailPage() {
  const params = useParams()
  const postId = params.id as string

  const {
    data: post,
    loading: postLoading,
    error: postError,
  } = useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`)

  const { data: user, loading: userLoading } = useFetch<User>(
    post ? `https://jsonplaceholder.typicode.com/users/${post.userId}` : "",
    { immediate: false },
  )

  const { data: comments, loading: commentsLoading } = useFetch<Comment[]>(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
  )

  // Fetch user data when post is loaded
  React.useEffect(() => {
    if (post && !user && !userLoading) {
      // This will trigger the user fetch
    }
  }, [post, user, userLoading])

  if (postLoading) {
    return (
      <div className="flex h-screen bg-background">
        <ResponsiveSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner size="lg" />
              <span className="ml-3 text-muted-foreground">Loading post...</span>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (postError || !post) {
    return (
      <div className="flex h-screen bg-background">
        <ResponsiveSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <Card className="max-w-md mx-auto">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">❌</div>
                  <h3 className="text-lg font-semibold mb-2">Post not found</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {postError || "The post you're looking for doesn't exist."}
                  </p>
                  <Link
                    href="/posts"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    ← Back to Posts
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <ResponsiveSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <PageTransition>
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <Link
                  href="/posts"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                  ← Back to Posts
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="mb-8">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-2xl text-balance">{post.title}</CardTitle>
                      <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full ml-4 flex-shrink-0">
                        Post #{post.id}
                      </span>
                    </div>
                    {user && (
                      <CardDescription className="flex items-center gap-2 mt-3">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-muted-foreground">(@{user.username})</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{user.email}</span>
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-pretty leading-relaxed">{post.body}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Comments Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-4">Comments {comments && `(${comments.length})`}</h2>

                {commentsLoading && (
                  <div className="flex justify-center items-center py-8">
                    <LoadingSpinner />
                    <span className="ml-3 text-muted-foreground">Loading comments...</span>
                  </div>
                )}

                {comments && (
                  <div className="space-y-4">
                    {comments.map((comment, index) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">{comment.name}</CardTitle>
                              <span className="text-xs text-muted-foreground">{comment.email}</span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-pretty leading-relaxed">{comment.body}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  )
}
