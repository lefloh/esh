module.exports = function(grunt) {

    grunt.initConfig({
        clean: ['_site'],
        concat: {
            app: {
                src: ['src/js/app.js', 'src/js/foo.js'],
                dest: '_site/js/app.js',
            }
        },
        connect: {
            server: {
                options: {
                    host: 'localhost',
                    port: 9000,
                    base: '_site',
                    open: true,
                    middleware: function(connect, options, defaultMiddleware) {
                        return [
                            require('grunt-connect-proxy/lib/utils').proxyRequest
                        ].concat(defaultMiddleware);
                    }
                },
                'proxies': [
                    {
                        context: '/es',
                        host: 'docker',
                        port: 9200,
                        rewrite: {
                            '^/es': '/'
                        }
                    }
                ]
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'src', src: ['index.html'], dest: '_site' }
                ]
            },
            libs: {
                files: [
                    { expand: true, cwd: 'bower_components', src: ['**/*.min.js'], dest: '_site/js', flatten: true },
                    { expand: true, cwd: 'bower_components/ace-builds/src-min', src: ['**'], dest: '_site/js/ace' },
                    { expand: true, cwd: 'bower_components/bootstrap/dist/css', src: ['*.min.css'], dest: '_site/css' },
                    { expand: true, cwd: 'bower_components/bootstrap/dist/fonts', src: ['*'], dest: '_site/fonts' }
                ]
            }
        },
        less : {
            app : {
                options: {
                    compress: true,
                    yuicompress: true
                },
                files: {
                    '_site/css/app.min.css' : 'src/less/app.less'
                }
            }
        },
        uglify: {
            prod: {
                files: {
                    '_site/js/app.min.js': ['src/js/app.js', 'src/js/editors.js']
                }
            },
            dev: {
                files: {
                    '_site/js/app.min.js': ['src/js/app.js', 'src/js/editors.js']
                },
                options: {
                    beautify: true,
                    mangle: false
                }
            }
        },
        watch: {
            main: {
                files: ['src/index.html'],
                tasks: ['copy:main'],
                options: {
                    spawn: false
                }
            },
            js: {
                files: ['src/js/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            less: {
                files: ['src/less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            }
        },
        http: {
            clean: {
                options: {
                    url: 'http://docker:9200/test',
                    method: 'DELETE',
                    ignoreErrors: true
                }
            },
            insert: {
                options: {
                    url: 'http://docker:9200/_bulk',
                    method: 'POST',
                    json: true,
                    body: '<%= testdata.bulk %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http');

    grunt.registerTask('default', ['clean', 'copy', 'uglify:prod', 'less']);
    grunt.registerTask('dev', ['clean', 'copy', 'uglify:dev', 'less', 'configureProxies:server', 'connect', 'watch']);
    grunt.registerTask('testdata', 'reads testdata.json and posts the content to elasticsearch', function() {
        grunt.task.run('http:clean');
        var data = grunt.file.readJSON('test/testdata.json');
        var bulk = '';
        for (var i = 0; i < data.length; i++) {
            bulk += JSON.stringify({ "index" : { "_index" : "test", "_type" : "person" } }) + '\n';
            bulk += JSON.stringify(data[i]) + '\n';
        }
        grunt.config.set('testdata.bulk', bulk);
        grunt.task.run('http:insert');
    });

};