// next.config.mjs
export default {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://wextaiblob.germanywestcentral.cloudapp.azure.com/:path*", // Django backend adresi
      },
    ];
  },
};
