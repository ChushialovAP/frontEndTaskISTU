const path = require('path');
module.exports = {
  mode: "development", // could be "production" as well
  entry: './public/src/js/index.js', 
  output: {
    path: path.resolve(__dirname, 'public/dist'), 
    filename: 'index_bundle.js' 
  }
};
