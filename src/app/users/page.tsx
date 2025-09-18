"use client";

import PageTransition from "@/components/layout/pageTransition";
import { ResponsiveSidebar } from "@/components/layout/responsive-sidebar";
import { SimpleHeader } from "@/components/layout/simple-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";
import { Modal } from "@/components/ui/model";
import { useFetch } from "@/hooks/useFetch";
import { useIsMobile } from "@/hooks/useMobile";
import { motion } from "framer-motion";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

const tableVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function UsersPage() {
  const {
    data: users,
    loading,
    error,
  } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const isMobile = useIsMobile();

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

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
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Users</h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {isMobile
                    ? "Manage user information"
                    : "Manage and view user information. Click on any row to see details."}
                </p>
              </motion.div>

              {loading && (
                <div className="flex justify-center items-center h-48 sm:h-64">
                  <LoadingSpinner size={isMobile ? "default" : "lg"} />
                  <span className="ml-3 text-sm sm:text-base text-muted-foreground">
                    Loading users...
                  </span>
                </div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 sm:py-12"
                >
                  <Card className="max-w-md mx-auto">
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                        ⚠️
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2">
                        Failed to load users
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {error}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {users && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader className="pb-3 sm:pb-6">
                      <CardTitle className="text-lg sm:text-xl">
                        User Directory
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {isMobile ? (
                        // Mobile card layout
                        <motion.div
                          variants={tableVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-3 p-4"
                        >
                          {users.map((user) => (
                            <motion.div
                              key={user.id}
                              variants={rowVariants}
                              whileTap={{ scale: 0.98 }}
                              className="bg-muted/50 rounded-lg p-4 cursor-pointer transition-colors hover:bg-muted"
                              onClick={() => handleRowClick(user)}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-medium text-sm">
                                    {user.name}
                                  </h3>
                                  <p className="text-xs text-muted-foreground">
                                    @{user.username}
                                  </p>
                                </div>
                                <span className="text-xs text-primary">
                                  View →
                                </span>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs text-muted-foreground truncate">
                                  {user.email}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {user.company.name}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      ) : (
                        // Desktop table layout
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left p-4 font-medium text-muted-foreground">
                                  Name
                                </th>
                                <th className="text-left p-4 font-medium text-muted-foreground">
                                  Email
                                </th>
                                <th className="text-left p-4 font-medium text-muted-foreground">
                                  Company
                                </th>
                                <th className="text-left p-4 font-medium text-muted-foreground">
                                  Phone
                                </th>
                              </tr>
                            </thead>
                            <motion.tbody
                              variants={tableVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {users.map((user) => (
                                <motion.tr
                                  key={user.id}
                                  variants={rowVariants}
                                  whileHover={{
                                    backgroundColor: "var(--color-muted)",
                                  }}
                                  className="border-b border-border cursor-pointer transition-colors"
                                  onClick={() => handleRowClick(user)}
                                >
                                  <td className="p-4">
                                    <div>
                                      <div className="font-medium">
                                        {user.name}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        @{user.username}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-4 text-sm">{user.email}</td>
                                  <td className="p-4 text-sm">
                                    {user.company.name}
                                  </td>
                                  <td className="p-4 text-sm">{user.phone}</td>
                                </motion.tr>
                              ))}
                            </motion.tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </PageTransition>
        </main>
      </div>

      {/* User Details Modal */}
      <Modal isOpen={!!selectedUser} onClose={closeModal} title="User Details">
        {selectedUser && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                {selectedUser.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                @{selectedUser.username}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <p className="text-sm">{selectedUser.email}</p>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Phone
                </label>
                <p className="text-sm">{selectedUser.phone}</p>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Website
                </label>
                <p className="text-sm">{selectedUser.website}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-medium mb-2">Company</h4>
              <div className="bg-muted rounded-md p-3 space-y-1">
                <p className="font-medium text-sm">
                  {selectedUser.company.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedUser.company.catchPhrase}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedUser.company.bs}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-medium mb-2">Address</h4>
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm">
                  {selectedUser.address.suite} {selectedUser.address.street}
                </p>
                <p className="text-sm">
                  {selectedUser.address.city}, {selectedUser.address.zipcode}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Coordinates: {selectedUser.address.geo.lat},{" "}
                  {selectedUser.address.geo.lng}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
