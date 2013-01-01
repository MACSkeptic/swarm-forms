module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: { all: ['http://localhost:19999/js/tests/all.html'] },
    connect: { server: { options: { port: 19999, base: './public' } } },
    jshint: { 
      all: [
        'public/js/lib/**/*.js',
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
