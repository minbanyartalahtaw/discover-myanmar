"use client";
import React from "react";

interface LoadingProps {
  skeletonStyle?: "write-post" | "home" | "default";
}

export default function Loading({ skeletonStyle = "default" }: LoadingProps) {
  // Write Post skeleton
  if (skeletonStyle === "write-post") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-16"></div>

        {/* Title Input Skeleton */}
        <div className="w-full h-12 bg-gray-200 rounded-md mb-8"></div>

        {/* Image Upload Skeleton */}
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 mb-8">
          <div className="h-64 w-full bg-gray-200 rounded flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* Editor Skeleton */}
        <div className="space-y-2 mb-8">
          <div className="h-8 bg-gray-200 rounded w-full mb-2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>

                {/* Dropdown Options Skeleton */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>
          <div className="flex-1">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Submit Button Skeleton */}
        <div className="pt-4 relative">
          <div className="h-10 w-32 bg-gray-200 rounded absolute right-0"></div>
        </div>
      </div>
    );
  }

  // Home page skeleton
  if (skeletonStyle === "home") {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-16"></div>
        {/* Hero Section Skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 w-3/4 bg-gray-200 rounded mb-4 mx-auto"></div>
          <div className="h-6 w-1/2 bg-gray-200 rounded mb-8 mx-auto"></div>
        </div>

        {/* Featured Photos Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <div className="h-80 bg-gray-200 mb-4"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Photo Section */}
        <div className="md:hidden mb-12">
          <div className="rounded-lg overflow-hidden">
            <div className="h-64 bg-gray-200 mb-4"></div>
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
          </div>
        </div>

      </div>
    );
  }

  // Default skeleton (fallback)
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded mb-8"></div>

      {/* Title Input Skeleton */}
      <div className="w-full h-10 bg-gray-200 rounded mb-8"></div>

      {/* Image Upload Skeleton */}
      <div className="rounded-lg p-4 mb-8">
        <div className="h-64 w-full bg-gray-200 rounded flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        </div>
      </div>

      {/* Editor Skeleton */}
      <div className="space-y-2 mb-8">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>

      {/* Toolbar Skeleton */}
      <div className="h-10 bg-gray-200 rounded mb-8"></div>

      {/* Dropdown Options Skeleton */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 h-12 bg-gray-200 rounded"></div>
        <div className="flex-1 h-12 bg-gray-200 rounded"></div>
      </div>

      {/* Submit Button and Link Skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="h-10 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
