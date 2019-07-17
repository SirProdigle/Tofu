"use strict";
const approot = require("app-root-path");
import * as path from "path";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

module.exports = {
    input: (approot + "/Resources/JS/**/*.js"),
    output: {
        file: (approot + "/Public/JS/app.js"),
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