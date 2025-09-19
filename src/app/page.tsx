"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center">
        {/* Brand / Welcome */}
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
          Welcome to <span className="text-green-950">Zettabyte</span> Dashboard
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-base text-gray-600 sm:text-lg md:text-xl">
          Manage your data efficiently with a simple and powerful dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/auth/signup"
            className="w-full sm:w-auto rounded-md bg-green-950 px-6 py-3 text-base font-medium text-white shadow-sm transition hover:bg-blue-900"
          >
            Sign Up
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto rounded-md border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-xs text-gray-500 sm:text-sm">
        © {new Date().getFullYear()} Zettabyte. All rights reserved.
      </footer>
    </div>
  );
}
