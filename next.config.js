/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URL: 'mongodb+srv://adimar:adimar123@cluster0.rxkel.mongodb.net/?retryWrites=true&w=majority',
    // MONGO_URL: 'mongodb://localhost:27017/food-app-1',
    Base_URL: 'http://localhost:3000'
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig

