module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: { all: ['http://localhost:19999/js/tests/all.html'] },
    connect: { server: { options: { port: 19999, base: './public' } } },
    jshint: { 
      all: [
        'public/js/lib/assets/**/*.js',
        'public/js/lib/behaviours/**/*.js',
        'public/js/lib/modifiers/**/*.js',
        'public/js/lib/renderers/**/*.js',
        'public/js/lib/scenes/**/*.js',
        'public/js/lib/utils/**/*.js',
        'public/js/lib/behaviours.js',
        'public/js/lib/entities.js',
        'public/js/lib/engine.js',
        'public/js/lib/game.js',
        'public/js/lib/input.js',
        'Gruntfile.js'
      ],
      options: {
        expr: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['connect', 'qunit']);
  grunt.registerTask('default', ['test']);
};
