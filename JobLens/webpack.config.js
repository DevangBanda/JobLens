import path from "path";

module.exports = {
  entry: "./src/index.js", // Entry point of your application
  output: {
    filename: "bundle.js", // Output bundle file name
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"), // Polyfill buffer
      process: require.resolve("process/browser"), // Polyfill process
    },
  },
  plugins: [
    // Work around for Buffer is undefined:
    new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
        process: 'process/browser',
    }),
],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"), // Serve files from this directory
    port: 5173, // Port for the development server
    open: true, // Open the default web browser when the server starts
  },
};
