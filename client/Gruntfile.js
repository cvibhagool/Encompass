
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // concats our component files into bundle.js
    // concat: {
    //   options: {
    //     separator: ';',
    //   },
    //   dist: {
    //     src: ['src/build/components/*.js'],
    //     dest: 'public/bundle.js',
    //   },
    // },

    // runs our server using nodemon
    nodemon: {
      dev: {
        script: '../server/server.js'
      }
    },

    // mochaTest: {
    //   test: {
    //     options: {
    //       reporter: 'spec'
    //     },
    //     src: ['test/**/*.js']
    //   }
    // },

    // uglify: {
    //   my_target: {
    //     files: {
    //       'public/dist/built.min.js': ['public/dist/built.js']
    //     }
    //   }
    // },

    // jshint: {
    //   files: [
    //     'public/**/*.js'
    //   ],
    //   options: {
    //     force: 'true',
    //     jshintrc: '.jshintrc',
    //     ignores: [
    //       'public/lib/**/*.js',
    //       'public/dist/**/*.js'
    //     ]
    //   }
    // },

    // cssmin: {
    //   target: {
    //     files: [{
    //       expand: true,
    //       cwd: 'public',
    //       src: ['*.css', '!*.min.css'],
    //       dest: 'public',
    //       ext: '.min.css'
    //     }]
    //   }
    // },
    
    // runs babel on our bundle.js and transpiles it into public dir
    // babel: {
    //   options: {
    //     sourceMap: false
    //   },
    //   dist: {
    //     files: [{
    //               expand: true,
    //               cwd: 'src/components',
    //               src: ['*.js'],
    //               dest: 'src/build/components',
    //               ext: '.js'
    //             }]
    //   }        
    // },

    browserify: {
      dist: {
        files: {
          'public/bundle.js': ['src/**/*.js']
        },
        options: {
          transform: ['babelify']
        }
      }
    },

    // watches our component files and runs concat/babel on change
    watch: {
      scripts: {
        files: [
          'src/**/*.js'
        ],
        tasks: [
          'browserify'
        ]
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');


  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-mocha-test');

  

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  // our server grunt task runner
  grunt.registerTask('server-dev', function (target) {

    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });


  // grunt.registerTask('test', [
  //   'mochaTest'
  // ]);

  // our default task runner
  grunt.registerTask('default', [
    'browserify'
  ]);

  // grunt.registerTask('deploy', [
  //   'concat',
  //   'uglify',
  //   'jshint',
  //   'cssmin'
  // ]);
};
