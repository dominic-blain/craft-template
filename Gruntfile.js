module.exports = (grunt) => {
	'use strict';

	const pkg = grunt.file.readJSON('package.json', 'utf8');

	grunt.initConfig({
		pkg: pkg,
		buildnum: {}
	});

	const tasks = grunt.file.expand({ filter: 'isFile', cwd: 'tasks' }, ['*']);

	tasks.forEach(task => {
		require(`./tasks/${task}`)(grunt);
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-purgecss');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-ftp-push');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-complexity');

	grunt.registerTask('dev-js', ['complexity', 'jshint']);
	grunt.registerTask('dev', ['dev-js']);

	grunt.registerTask('js', ['dev-js', 'clean:js', 'libs', 'concat:js', 'babel', 'headers:js']);
	grunt.registerTask('css', ['clean:css', 'postcss', 'concat:css', 'purgecss', 'csso', 'headers:css']);
	grunt.registerTask('build', ['buildnum', 'css', 'js']);

	grunt.registerTask('push', ['ftp_push:css', 'ftp_push:js', 'ftp_push:build']);

	grunt.registerTask('default', ['watch']);
};
