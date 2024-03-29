const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@icons": path.resolve(__dirname, "src/icons"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@customTypes": path.resolve(__dirname, "src/types"),
      "@redux": path.resolve(__dirname, "src/redux"),
    },
  },
};
