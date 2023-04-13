const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@icons": path.resolve(__dirname, "src/icons"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
};
