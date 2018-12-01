module.exports = {
  "extends": "airbnb-base",
  "env": {
      "browser": true,
      "jasmine": true,
      "commonjs": true,
      "node": true,
      "mocha": true
  },
  "rules": {
      "prefer-destructuring": ["error", { "object": false, "array": false }]
  }
};