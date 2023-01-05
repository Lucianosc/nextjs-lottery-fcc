/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// const webpack = require("webpack");

module.exports = nextConfig, {
  env: {
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  },
};
