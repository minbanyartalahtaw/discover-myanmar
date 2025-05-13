"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface InvalidLinkProps {
  url?: string;
}

const InvalidLink: React.FC<InvalidLinkProps> = ({ url = "/user" }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center z-1000 h-screen -mt-20">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => router.push(url)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Go Back
      </button>

    </div>
  );
};

export default InvalidLink;
