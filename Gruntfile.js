module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: { all: ['http://localhost:19999/js/tests/all.html'] },
    connect: { server: { options: { port: 19999, base: './public' } } },
    jshint: {
      all: [
        'public/js/lib/**/*.js',
        'public/js/tests/**/*.js',
        'Gruntfile.js'
      ],
      options: {
        indent: 2,
        expr: true,
        bitwise: true,
        camelcase: true,
        curly: true,
        immed: true,
        noarg: true,
        nonew: true,
        plusplus: true,
        quotmark: 'single',
        trailing: true,
        maxparams: 3,
        maxlen: 150,
        browser: true,
        nomen: true,
        jquery: true,
        globals: {
          '$': true,
          'console': true,
          'equal': true,
          'ok': true,
          'expect': true,
          'sinon': true,
          'module': true,
          'QUnit': true,
          'test': true,
          'require': true,
          'define': true,
          'Line': true,
          '$V': true,
          '_': true
        },
        undef: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['connect', 'qunit']);
  // jshint + grunt 0.4 are not playing well together
  // grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('default', ['test']);
};
