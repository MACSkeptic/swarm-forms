module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: { all: ['http://localhost:19999/js/tests/all.html'] },
    connect: { server: { options: { port: 19999, base: './public' } } },
    jshint: { all: ['Gruntfile.js'] }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['connect', 'qunit']);
  grunt.registerTask('default', ['test']);
};
