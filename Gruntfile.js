"use strict";

var path = require("path");

module.exports = function (grunt) {

  require("load-grunt-tasks")(grunt);

  var projects = [
    "flatten"
  ];

  grunt.initConfig({

    watch: {
      options: {
        nospawn: true
      },
      "babel": {
        // watch all js files in projects/src
        files: projects.map(function (project) {
          return path.join(__dirname, project, "src/**/*.js");
        }),
        // and run "babel" task
        tasks: [ "babel" ]
      }
    },

    "babel": {
      // create a mapping of the form:
      // {
      //    `${projectHomeAbsPath}/index.js`: `${projectHomeAbsPath}/src/index.js`
      // }
      // i.e. expecting to find ES6 JS files in `${projectHomeAbsPath}/src/index.js`
      // and will transpile to `${projectHomeAbsPath}/index.js` to be used by tests.
      index: {
        files: projects.reduce(function (prev, curr) {
          prev[path.join(__dirname, curr, "index.js")] = path.join(__dirname, curr, "src", "index.js");
          return prev;
        }, {})
      }
    },

    clean: {
      // clean index.js files generated by babel:index
      index: projects.map(function (project) {
          return path.join(__dirname, project, "index.js");
        })
    }
  });

  grunt.registerTask("default", ["clean:index", "babel:index"]);

};