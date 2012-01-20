({
    name: 'scripts/test',
    out: 'public/scripts/test.min.js',
    baseUrl: './public/',
    dir: './public/',
    optimize: "none",

    paths: {
        "jquery": "scripts/vendor/require-jquery"
        ,"socket.io": "../node_modules/socket.io/node_modules/socket.io-client/dist/socket.io"
        ,"order":"scripts/vendor/order.min"
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
