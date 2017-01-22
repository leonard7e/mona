module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          cacheLocation: '/tmp/mona/sass-cache',
          sourcemap: 'none'
        },
        files: {
          'css-compiled/mona.css': 'sass/mona.sass'
        }
      }
    },

    googlefonts: {
      build: {
        options: {
          fontPath: 'css-compiled/fonts/',
          fonts: [
            {
              family: 'Open Sans',
              styles: [
                400, 700
              ]
            },
            {
              family: 'Oswald',
              styles: [
                400
              ]
            }
          ]
        }
      }
    },

    watch: {
      sass: {
        files: ['sass/*.sass', 'sass/*.scss', 'sass/**/*.sass', 'sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-google-fonts');


  // Default task(s).
  grunt.registerTask('default', ['googlefonts', 'sass']);

};
