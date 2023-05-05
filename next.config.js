/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

// Sentry
const { withSentryConfig } = require('@sentry/nextjs')

const SENTRY_ORG = process.env.NEXT_PUBLIC_SENTRY_ORG
const SENTRY_PROJECT = process.env.NEXT_PUBLIC_SENTRY_PROJECT

const nextConfig = {
  // Optional build-time configuration options
  sentry: {
    // Uncomment the following, if you want to handle source map generation and uploading separately, plugin can be disabled for either server or client build.
    // disableServerWebpackPlugin: true,
    // disableClientWebPackPlugin: true,
    // Source code may be visible in browser dev tools, to prevent this, we can hide source maps.
    // hideSourceMaps: true,
    // When enabled, in-app frames in your client-side stack traces will be source-mapped.
    // widenClientFileUpload: true,
  }
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  org: SENTRY_ORG,
  project: SENTRY_PROJECT,

  silent: true // Suppresses all logs

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid'
])

module.exports = withTM({
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
})

// Module exports for Sentry
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
