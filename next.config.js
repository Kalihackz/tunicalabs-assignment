/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  env: {
    MONGODB_URI:'mongodb+srv://admin:fakeaccount@cluster0.dkomh.mongodb.net/tunicalabs?retryWrites=true&w=majority'
  },
}