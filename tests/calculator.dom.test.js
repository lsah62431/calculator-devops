{
  "name": "calculator-devops",
  "version": "1.0.0",
  "scripts": {
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "lint": "echo \"add eslint later\""
  },
  "devDependencies": {
    "jest": "^29.7.0"
  },
  "jest": {
    "testEnvironment": "jsdom",
    "collectCoverage": true,
    "collectCoverageFrom": [
      "docs/script.js"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 100,
        "functions": 100,
        "lines": 100,
        "statements": 100
      }
    },
    "moduleFileExtensions": ["js", "json"]
  }
}
