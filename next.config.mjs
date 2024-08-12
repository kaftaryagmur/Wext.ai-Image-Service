// next.config.mjs
export default {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://20.52.97.229:8000/:path*", // Django backend adresi
      },
    ];
  },
};
