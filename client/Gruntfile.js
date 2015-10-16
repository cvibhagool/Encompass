module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/components/*.js'],
        dest: 'build/bundle.js',
      },
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


  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-mocha-test');
  // grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['babel']);
  
  // grunt.registerTask('server-dev', function (target) {
  //   // Running nodejs in a different process and displaying output on the main console
  //   var nodemon = grunt.util.spawn({
  //        cmd: 'grunt',
  //        grunt: true,
  //        args: 'nodemon'
  //   });
  //   nodemon.stdout.pipe(process.stdout);
  //   nodemon.stderr.pipe(process.stderr);

  //   grunt.task.run([ 'watch' ]);
  // });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify',
    'jshint'
  ]);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      if (n) {
        grunt.warn('build num must be specific!')
      }
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'concat',
    'uglify',
    'jshint',
    'cssmin'
  ]);
};
