"use strict";
const appRoot = require("app-root-path");
import * as path from "path";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

module.exports = {
    input: (appRoot + "/Resources/JS/**/*.js"),
    output: {
        file: (appRoot + "/Public/JS/app.js"),
        format: "umd",
        name: "standard",
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**',
            "presets": [
                ["@babel/preset-env", { modules: false }],
            ],
        })
    ]
}