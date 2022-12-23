/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // MONGO_URL:
    //   "mongodb+srv://adimar:adimar123@cluster0.rxkel.mongodb.net/?retryWrites=true&w=majority",
    MONGO_URL:
      "mongodb://adimar:adimar123@cluster0-shard-00-00.rxkel.mongodb.net:27017,cluster0-shard-00-01.rxkel.mongodb.net:27017,cluster0-shard-00-02.rxkel.mongodb.net:27017/?ssl=true&replicaSet=atlas-uis4j8-shard-0&authSource=admin&retryWrites=true&w=majority",
    // MONGO_URL: 'mongodb://localhost:27017/food-app-1',
    Base_URL: "http://localhost:3000",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
