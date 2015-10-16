module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // concats our component files into bundle.js
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/components/*.js'],
        dest: 'src/build/bundle.js',
      },
    },

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
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'src/build/bundle.js': 'public/bundle.js' 
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
          'concat',
          'babel'
        ]
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');

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
    'concat',
    'babel'
  ]);

  // grunt.registerTask('deploy', [
  //   'concat',
  //   'uglify',
  //   'jshint',
  //   'cssmin'
  // ]);
};
