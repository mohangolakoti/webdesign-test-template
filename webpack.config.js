const path = require('path');

module.exports = {
    // other webpack configuration options
    resolve: {
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "assert": require.resolve("assert"),
            "url": require.resolve("url"),
        }
    }
};
