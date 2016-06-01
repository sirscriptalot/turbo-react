const config = {
  entry: {
      js: './src/index',
  },
  output: {
    path: './dist',
    filename: 'turbo-dom.js',
  },
  module: {
    loaders: [
      // Javascript Loader
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        }
      },
    ]
  }
};

module.exports = [config]
