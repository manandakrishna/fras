module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'], // Add your image domains here
  },
  env: {
    AZURE_FACE_API_KEY: process.env.AZURE_FACE_API_KEY,
    AZURE_FACE_API_ENDPOINT: process.env.AZURE_FACE_API_ENDPOINT,
    COSMOS_DB_CONNECTION_STRING: process.env.COSMOS_DB_CONNECTION_STRING,
  },
};