"use strict";

/** @type {import('next').NextConfig} */
var nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
};
module.exports = nextConfig;