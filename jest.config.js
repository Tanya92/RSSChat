module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
    setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
  ],
    "moduleNameMapper": {
      "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
    }

};
