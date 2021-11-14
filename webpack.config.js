const path = require("path");

// export object with webpack config
module.exports = {
  mode: "development", // e.g. dev or prod
  entry: "./src/index.js", // where does webpack look for initial js to bundle
  output: {
    path: path.resolve(__dirname, "dist"), // use node path module to output to dist path
    filename: "bundle.js", // output filename
    sourceMapFilename: "[name].js.map",
  },
  devtool: "source-map",
  watch: true, // webpack watches and re-bundles
};
