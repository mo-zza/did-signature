const { pathsToModuleNameMapper } = require("ts-jest/utils");
const {
    compilerOptions: { paths },
} = require("./tsconfig.json");

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.json",
            diagnostics: false,
        },
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    roots: ["<rootDir>/"],
    testRegex: "./src/.*\\.(test|spec)?\\.(ts|ts)$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    coverageDirectory: "./coverage",
    // moduleNameMapper: pathsToModuleNameMapper(paths, {
    //     prefix: "<rootDir>/",
    // }),
    clearMocks: true,
    maxWorkers: 1,
    // setupFiles: ["<rootDir>/.env"],
    // setupFiles: ["<rootDir>/env.js"],
};