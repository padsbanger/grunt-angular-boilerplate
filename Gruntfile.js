'use strict';

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  
  var modRewrite = require('connect-modrewrite');

  // Define the configuration for all the tasks
  grunt.initConfig({

    bower: {
      install: {
        targetDir: 'libs',
        verbose: true,
        cleanup: true
      }
    },

    clean: ['js/build/', 'libs', 'lib'],

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      styles: {
        files: ['styles/less/*.less', 'styles/less/**/*.less'],
        tasks: ['less'],
        options: {
          livereload: {
            port: 9000
          }
        },
      },
      directives: {
        files: ['js/src/directives/*.js'],
        tasks: ['concat:directives'],
        options: {
          livereload: {
            port: 9000
          }
        },
      },
      services: {
        files: ['js/src/services/*.js'],
        tasks: ['concat:services'],
        options: {
          livereload: {
            port: 9000
          }
        },
      },
      controllers: {
        files: ['js/src/controllers/*.js'],
        tasks: ['concat:controllers'],
        options: {
          livereload: {
            port: 9000
          }
        },
      },
      filters: {
        files: ['js/src/filters/*.js'],
        tasks: ['concat:filters'],
        options: {
          livereload: {
            port: 9000
          }
        },
      },
      html: {
        files: ['*.html', 'views/**/*.html', ],
        options: {
          livereload: {
            port: 9000
          }
        },
      }
    },

    // The actual grunt server settings
    connect: {
      server: {
        options: {
          port: 1337,
          hostname: '',
          livereload: 9000,
          open: true,
          middleware: function(connect, options) {
            var middlewares = [];

            middlewares.push(modRewrite(['^[^\\.]*$ /index.html [L]']));
            options.base.forEach(function(base) {
              middlewares.push(connect.static(base));
            });
            return middlewares;
          }
        }
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          paths: ['styles/less/*/']
        },
        files: {
          'styles/css/styles.css': 'styles/less/styles.less',
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      libs: {
        src: [
          'libs/angular/angular.js',
          'libs/angular-route/angular-route.js'
        ],
        dest: 'js/build/libs.js'
      },
      directives: {
        src: ['js/src/directives/*.js', 'js/src/directives/*/*.js'],
        dest: 'js/build/directives.js'
      },
      controllers: {
        src: ['js/src/controllers/*.js', 'js/src/controllers/*/*.js'],
        dest: 'js/build/controllers.js'
      },
      services: {
        src: ['js/src/services/*.js', 'js/src/services/*/*.js'],
        dest: 'js/build/services.js'
      },
      filters: {
        src: ['js/src/filters/*.js', 'js/src/filters/*/*.js'],
        dest: 'js/build/filters.js'
      },
      build: {
        src: [
          'js/src/app.js',
          'js/build/controllers.js',
          'js/build/directives.js',
          'js/build/filters.js',
          'js/build/services.js'
        ],
        dest: 'js/build/app.min.js'
      }
    },

    uglify: {
      build: {
        files: {
          'js/build/app.min.js': 'js/build/app.min.js',
          'js/build/libs.min.js': 'js/build/libs.js'
        }
      }
    },

    coveralls: {
      options: {
        debug: true,
        coverage_dir: 'test-coverage',
        dryRun: false,
        force: true,
        recursive: true
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    mkdir: {
      js: {
        options: {
          create: ['js/build']
        }
      }
    },

  });

  grunt.registerTask('build', function() {
    grunt.task.run([
      'mkdir:js',
      'clean',
      'bower:install',
      'less',
      'concat:libs',
      'concat:directives',
      'concat:controllers',
      'concat:services',
      'concat:filters',
      'concat:build',
      'uglify:build',
      'karma:unit',
      'coveralls'
    ]);
  });

  grunt.registerTask('serve', function() {
    grunt.task.run([
      'clean',
      'mkdir:js',
      'bower:install',
      'concat:libs',
      'concat:directives',
      'concat:controllers',
      'concat:services',
      'concat:filters',
      'less',
      'connect:server',
      'watch'
    ]);
  });
};
