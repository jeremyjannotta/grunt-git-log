module.exports = function( grunt ) {

    var dateFormat = require('dateformat');
    
    grunt.registerTask( "gitlog", "Output git commit messages between given dates.", function() {
        
        this.requiresConfig('gitlog');
        
        var config = grunt.config('gitlog'),
            done = this.async(),
            afterDate = config.afterDate,
            beforeDate = config.beforeDate,
            dest,
            gitArgs = ['log', '--pretty=format:"%B%n"', '--date-order', '--no-merges'];
    
        if (config.dest !== undefined) {
            dest = grunt.template.process(config.dest);
        }
        
        if (!afterDate) {
            var oneDayAgo = Date.now() - (1000*60 * 60 * 24);
            afterDate = new Date(oneDayAgo);
        }
        
        if (!beforeDate) {
            beforeDate = new Date();
        }
        
        gitArgs.push('--after="' + dateFormat(afterDate, "isoDateTime") + '"');
        
        gitArgs.push('--before="' + dateFormat(beforeDate, "isoDateTime") + '"');
        
        grunt.log.writeln( "Executing command: git "+gitArgs.join(' ')+"\n" );
        
        grunt.utils.spawn({
            cmd: 'git',
            args: gitArgs
        }, 
        function( err, result ) {
            if ( err ) {
                grunt.log.error( err );
                return done( false );
            }
    
            if (dest !== undefined) {
                grunt.file.write( dest, result );
                grunt.log.ok( 'Git log written to '+dest );
                
            } else {
                grunt.log.write( result );
            }
            
            done();
        });
    });

};
