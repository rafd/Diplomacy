({
    name: 'scripts/app',
    out: 'public/scripts/app.min.js',
    baseUrl: './public/',
    dir: './public/',

    paths: {
        "jquery": "scripts/vendor/require-jquery"
        ,"socket.io": "../node_modules/socket.io/node_modules/socket.io-client/dist/socket.io"
    },

    modules: [
        //Optimize the require-jquery.js file by applying any minification
        //that is desired via the optimize: setting above.
        {
            name: "require-jquery"
        },

        //Optimize the application files. Exclude jQuery since it is
        //included already in require-jquery.js
        {
            name: "main",
            exclude: ["jquery"]
        }
    ]
})
