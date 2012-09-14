module.exports = function( grunt ) {

    grunt.initConfig({
        lint: {
            files: [ "grunt.js", "tasks/**/*.js" ]
        },
        gitlog: {
            
        }
    });
    
    grunt.loadTasks('tasks');
    
    grunt.registerTask( "default", "lint" );

};
