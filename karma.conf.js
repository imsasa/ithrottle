// Karma configuration
// Generated on Sat Jan 12 2019 18:59:51 GMT+0800 (China Standard Time)
let path       = require("path");
module.exports = function (config) {
    config.set({
        basePath                : "",
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks              : ["mocha"],
        // list of files / patterns to load in the browser
        browsers                : ["jsdom"],
        files                   : [
            "./tests/**.js"
        ],
        // list of files / patterns to exclude
        exclude                 : [],
        // preprocess matching files before serving them to the browser
        // available preprocerssors: https://npmjs.org/browse/keyword/karma-preprocessor
        webpack                 : { //kind of a copy of your webpack config
            mode   : "development",
            devtool: "inline-source-map", //just do inline source maps instead of the default
            module : {
                rules: [
                    {
                        test   : /^(?!.*\.test\.js).+\.js$/,
                        use    : {
                            loader          : "istanbul-instrumenter-loader",
                            options         : {esModules: true}
                            // produceSourceMap: true
                        },
                        include: path.resolve("./src"),
                        enforce: "post",
                        exclude: /node_modules|\.spec\.js$/,
                    }
                ]
            }

        },
        // coverageReporter: {
        //     type: 'html', //produces a html document after code is run
        //     dir: path.resolve('./coverage3') //path to created html doc
        // },
        // reporters               : ["progress", "coverage-istanbul"],
        reporters               : ["progress", "coverage-istanbul"],
        coverageIstanbulReporter: {
            reports        : ["html", "lcov", "lcovonly", "text-summary"],
            "report-config": {
                // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
                html: {
                    subdir: "html"
                }
            },
            // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
            dir            : path.join(__dirname, "./dist/tests/karma"),
            thresholds     : {
                emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
                // thresholds for all files
                global     : {
                    statements: 100,
                    lines     : 100,
                    branches  : 100,
                    functions : 100
                },
                // thresholds per file
                each       : {
                    statements: 100,
                    lines     : 100,
                    branches  : 100,
                    functions : 100,
                    overrides : {
                        "baz/component/**/*.js": {
                            statements: 98
                        }
                    }
                }
            }
        },
        preprocessors           : {
            "tests/**.js": ["webpack", "sourcemap"]
        }
    }
    );
};
