// Generated on 2014-12-03 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', 'assemble']});

    // Configurable paths
    var config = {
        app:        './app',
        dist:       './dist',
        tpl:        './app/templates',
        pages:      './app/templates/pages',
        partials:   './app/templates/partials',
        vendor:     './bower_components',
        expand:     true
    };

    // Rewrite snippets
    var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

    // Set environment
    grunt.config('env', grunt.option('env') || process.env.GRUNT_ENV || 'development');

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config:     config,
        pkg:        grunt.file.readJSON('package.json'),
        versions:   grunt.file.readJSON('./data/versions.json'),
        deployment: grunt.file.readJSON('./data/' + grunt.config('env') + '/deployment.json'),
        banner:     '/*! phpMyFAQ - https://www.phpmyfaq.de/ - Copyright © 2001-2022 Thorsten Rinne - compiled <%= grunt.template.today("yyyy-mm-dd") %> */\n',

        // Fetch external data for downloads
        curl: {
            getVersions: {
                src: 'https://api.phpmyfaq.de/versions',
                dest: './data/versions.json'
            },
            getStableInfo: {
                src: 'https://download.phpmyfaq.de/info/<%= versions.stable %>',
                dest: './data/stable.json'
            },
            getDevelopmentInfo: {
                src: 'https://download.phpmyfaq.de/info/<%= versions.development %>',
                dest: './data/development.json'
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            assemble: {
                files: [
                    './app/templates/pages/**/*',
                    './app/templates/partials/**/*',
                    './app/templates/**/*'
                ],
                tasks: ['assemble'],
                options: {
                    spawn: false
                }
            },
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            less: {
                files: ['<%= config.app %>/less/{,*/}*.less'],
                tasks: ['less:development', 'newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/assets/css/{,*/}*.css',
                    '<%= config.app %>/images/{,*/}*'
                ]
            }
        },

        // Assemble
        assemble: {
            options: {
                flatten: true,
                data: [
                    './data/' + grunt.config('env') + '/*.{json,yml}',
                    './data/*.{json,yml}',
                    'package.json'
                ],
                helpers: [
                    'handlebars-helper-compose',
                    'handlebars-helper-moment',
                    'handlebars-helper-inarray',
                    './app/templates/helpers/*.js'
                ],
                assets: './dest/assets',
                partials: [
                    './app/templates/partials/*.hbs',
                    './app/templates/components/*.hbs'
                ],
                layoutdir: './app/templates/layouts/',
                layout: 'default.hbs',
                compose: {
                    cwd: '<%= config.devblog %>'
                }
            },
            pages: {
                files: [
                    {
                        src: './app/templates/pages/*.{hbs,md}',
                        dest: './dist/'
                    }
                ]
            },
            demo: {
                src: ['./app/templates/pages/demo/*.{hbs,md}'],
                dest: './dist/demo/'
            },
            docs: {
                src: ['./app/templates/pages/docs/*.{hbs,md}'],
                dest: './dist/docs/'
            },
            errors: {
                src: ['./app/templates/pages/errors/*.{hbs,md}'],
                dest: './dist/errors/'
            },
            news: {
                src: ['./app/templates/pages/news/*.{hbs,md}'],
                dest: './dist/news/'
            },
            security: {
                src: ['./app/templates/pages/security/*.{hbs,md}'],
                dest: './dist/security/'
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            rules: [
                {
                    from: '(^((?!css|html|js|images|fonts|\/$).)*$)',
                    to: '$1.html'
                }
            ],
            livereload: {
                options: {
                    base: './',
                    middleware: function (connect, options) {
                        var middlewares = [];

                        // RewriteRules support
                        middlewares.push(rewriteRulesSnippet);

                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        var directory = options.directory || options.base[options.base.length - 1];
                        options.base.forEach(function() {
                            // Serve static files.
                            middlewares.push(connect.static('.tmp'));
                            middlewares.push(connect().use('/bower_components', connect.static('./bower_components')));
                            middlewares.push(connect.static(config.app));
                            middlewares.push(connect.static(config.dist));
                        });

                        // Make directory browse-able.
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                }
            },
            test: {
                options: {
                    open: false,
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/assets/css',
                    src: '{,*/}*.css',
                    dest: '<%= config.app %>/assets/css/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        wiredep: {
            app: {
                ignorePath: /^\/|\.\.\//,
                src: ['<%= config.app %>/*.html'],
                exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/assets/js/{,*/}*.js',
                        '<%= config.dist %>/assets/css/{,*/}*.css',
                        '<%= config.dist %>/images/{,*/}*.*',
                        '<%= config.dist %>/assets/fonts/{,*/}*.*',
                        '<%= config.dist %>/*.{ico,png}'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>/assets',
                    '<%= config.dist %>/images'
                ]
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/assets/css/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: false,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Concats vendor files
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/retinajs/dist/retina.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/handlebars/handlebars.min.js'
                ],
                dest: '<%= config.app %>/assets/js/vendor.js'
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>',
                        dest: '<%= config.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            'images/{,*/}*.webp',
                            '{,*/}*.html',
                            'styles/fonts/{,*/}*.*'
                        ]
                    },
                    {
                        src: '<%= config.app %>/.htaccess',
                        dest: '<%= config.dist %>/.htaccess'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/font-awesome/',
                        src: 'fonts/*',
                        dest: '<%= config.dist %>/assets'
                    }
                ]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/assets/css',
                dest: '<%= config.dist %>/assets/css',
                src: '{,*/}*.css'
            },
            javascripts: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/assets/js',
                dest: '<%= config.dist %>/assets/js',
                src: '{,*/}*.js'
            }
        },

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            dist: {
                devFile: 'bower_components/modernizr/modernizr.js',
                outputFile: '<%= config.dist %>/assets/js/modernizr.js',
                files: {
                    src: [
                        '<%= config.dist %>/assets/js/{,*/}*.js',
                        '<%= config.dist %>/assets/css/{,*/}*.css',
                        '!<%= config.dist %>/assets/js/*'
                    ]
                },
                uglify: true
            }
        },

        // LESS stuff
        less: {
            development: {
                options: {
                    paths: ['styles']
                },
                files: {
                    '<%= config.app %>/assets/css/main.css': '<%= config.app %>/less/*.less',
                    '<%= config.dist %>/assets/css/main.css': '<%= config.app %>/less/*.less'
                }
            },
            production: {
                options: {
                    paths: ['styles'],
                    cleancss: true
                },
                files: {
                    '<%= config.app %>/assets/css/main.css': 'app/less/*.less'
                }
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'less:development',
                'concat',
                'copy:styles'
            ],
            test: [
                'less:development',
                'copy:styles'
            ],
            dist: [
                'less:production',
                'concat',
                'copy:styles',
                'copy:javascripts',
                'imagemin',
                'svgmin'
            ]
        },

        // Generate Sitemap
        sitemap: {
            dist: {
                siteRoot: 'dist/',
                extension: {
                    required: false,
                    trailingSlash: false
                }
            }
        },

        // Deployment via FTP
        'ftp-deploy': {
            build: {
                auth: {
                    host: 'w018670c.kasserver.com',
                    port: 21,
                    authKey: 'production'
                },
                src: '<%= config.dist %>',
                dest: '/<%= deployment.remote_path %>'
            }
        }

    });


    grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
        if (grunt.option('allow-remote')) {
            grunt.config.set('connect.options.hostname', '0.0.0.0');
        }
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'fetchVersions',
            'fetchDownloadInfos',
            'wiredep',
            'concurrent:server',
            'autoprefixer',
            'assemble',
            'configureRewriteRules',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', function (target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer'
            ]);
        }

        grunt.task.run([
            'assemble',
            'configureRewriteRules',
            'connect:test',
            'mocha'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'fetchVersions',
        'fetchDownloadInfos',
        'assemble',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'copy:dist',
        'modernizr',
        'usemin',
        'htmlmin',
        'sitemap'
    ]);

    grunt.registerTask('default', [
        //'newer:jshint',
        'build'
    ]);

    grunt.registerTask('fetchVersions', [
        'curl:getVersions'
    ]);

    grunt.registerTask('fetchDownloadInfos', [
        'curl:getStableInfo',
        'curl:getDevelopmentInfo'
    ]);

    grunt.registerTask('deploy', [
        //'newer:jshint',
        'build',
        'ftp-deploy'
    ]);

};
