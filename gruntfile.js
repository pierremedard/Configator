const webpackConfig = require('./webpack.config');
const path = require('path');

module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    webpack: {
      prod: webpackConfig,
      dev: Object.assign({ watch: true }, webpackConfig)
    },
    nodemon: {
      dev: {
        script: './dist/index.js'
      },
      options: {
        ignore: ['node_modules/**', 'gruntfile.js', 'src/**']
      }
    },
    ts: {
      default: {
        tsconfig: "app/tsconfig.json"
      }
    },
    watch: {
      ts: {
        files: [
          "app/\*\*/\*.ts",
          "app/\*\*/\*.json"
        ],
        tasks: ["ts"]
      }
    },
    concurrent: {
      watchers: {
        tasks: ['watch', 'webpack:dev', "nodemon"],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask("build", [ "ts", "webpack:prod" ]);
  grunt.registerTask("default", [ "build", "concurrent:watchers" ]);
};