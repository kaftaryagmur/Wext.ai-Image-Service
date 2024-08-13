// next.config.mjs
export default {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.5.103:8000/:path*", // Django backend adresi
      },
    ];
  },
};
