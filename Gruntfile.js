/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Vulcanize - concat polymer files.
    vulcanize: {
        default: {
            options: {
                inline: true,
                csp: true,
                strip: true,
                'strip-excludes': false,
                excludes: {
                    imports: [
                        "polymer.html",
                        "polymer.js",
                        "nvd3.html",
                        "d3.html",
                        "core-ajax.html",
                        "nv.d3.js",
                        "nv.d3.css",
                        "nv.d3.min.css",
                        "nv.d3.min.js",
                        "d3.js",
                        "d3.min.js"
                    ]
                }
            },
            files: {
                'poly-nvd3.html': 'poly-nvd3/poly-nvd3.html'
            },
        },
    },
    watch: {
        html: {
            files: ["**/*.html"],
            tasks: ['vulcanize']
        },
        js: {
            files: ["**/*.js"],
            tasks: ['vulcanize']
        }
    },
    // Task configuration.
    uglify: {
      dist: {
        src: 'poly-nvd3.js',
        dest: 'poly-nvd3.js'
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-vulcanize');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['vulcanize']);
  grunt.registerTask('production', ['vulcanize', 'uglify']);
  grunt.registerTask('release', ['production']);
};
