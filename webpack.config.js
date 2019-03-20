const path = require('path');

module.exports = {
  target: "web",
  entry: {
    app: ["./index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scaffold.js",
    library: '', 
    libraryTarget: 'commonjs-module'
  }
}
