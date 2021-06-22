const path = require('path');
module.exports = {
  mode: "development", // could be "production" as well
  entry: './src/js/index.js', 
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'index_bundle.js' 
  }
};
