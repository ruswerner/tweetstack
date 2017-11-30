module.exports = function (wallaby) {
  return {
    files: [
      'server/**/*.js',
      'client/src/**/*.js',
      '!client/src/components/*.js',
      '!client/src/index.js',
      {pattern:'test/**/*.json', instrument:false}
    ],

    tests: [
      'test/**/*-spec.js',
      'client/test/**/*-spec.js',
    ],
    testFramework: 'mocha',
    delays: {
      edit: 1000,
      run: 150
    },
    env: {
      type: 'node',
    },
    compilers: {
      'client/**/*.js': wallaby.compilers.babel({
        babel: require('./client/node_modules/babel-core'),
        presets: ['react-app']
      })
    }
  };
};