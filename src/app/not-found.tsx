"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 sm:text-6xl md:text-7xl">
          404
        </h1>
        <p className="mt-4 text-base text-gray-600 sm:text-lg">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto rounded-md bg-green-950 px-5 py-2 text-center text-white transition hover:bg-green-800"
          >
            Back to Dashboard
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto rounded-md border border-gray-300 px-5 py-2 text-center text-gray-700 transition hover:bg-gray-200"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
