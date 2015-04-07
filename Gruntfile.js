'use strict';

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    bower: {
      install: {
        targetDir: 'libs',
        cleanBowerDir: true,
        cleanup: true
      }
    },

    clean: ['lib', 'js/build/', '.bower-cache'],

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      styles: {
        files: ['styles/less/*.less', 'styles/less/*/*.less'],
        tasks: ['less'],
        options: {
          livereload: {
            port: 9000
          }
        },
      },
      directives: {
        files: ['js/src/directives/*.js', 'js/src/directives/*/*.js'],
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
        files: ['*.html', 'views/*/*.html', 'views/*.html'],
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
          port: 1338,
          hostname: '',
          livereload: 9000,
          open: true,
          middleware: function(connect, options) {
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            return [
              proxy,
              connect.static(options.base),
              connect.directory(options.base)
            ];
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
          'styles/css/style.css': 'styles/less/style.less',
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      libs: {
        src: [
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
          'js/build/services.js',
          'js/build/modules.js'
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

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: false
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
      'concat:modules',
      'concat:build',
      'uglify:build',

    ]);
  });

  grunt.registerTask('serve', function() {
    grunt.task.run([
      'mkdir:js',
      'bower:install',
      'clean',
      'concat:libs',
      'concat:directives',
      'concat:controllers',
      'concat:services',
      'concat:filters',
      'concat:modules',
      'less',
      'connect:server',
      'watch'
    ]);
  });
};