module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    nodemon: {
      dev: {
        script: './dist/index.js'
      },
      options: {
        ignore: ['node_modules/**', 'gruntfile.js']
      }
    },
    ts: {
      app: {
        files: [{
          src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
          dest: "./dist"
        }],
        options: {
          module: "commonjs",
          target: "es6",
          sourceMap: false,
          rootDir: "src"
        }
      }
    },
    watch: {
      ts: {
        files: ["src/\*\*/\*.ts"],
        tasks: ["ts"]
      }
    },
    concurrent: {
      watchers: {
        tasks: ['watch', 'nodemon'],
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

  grunt.registerTask("build", [ "ts" ]);

  grunt.registerTask("default", [ "ts", "concurrent:watchers" ]);

};