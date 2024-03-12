const config = {
  mode: "production",
  entry: {
    //contacts: "./src/js/contacts.js",
    index: "./src/js/index.js",
    //about: "./src/js/about.js",
  },
  output: {
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}
module.exports = config;