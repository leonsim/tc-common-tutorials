require('./node_modules/coffee-script/register')
var BowerWebpackPlugin = require('bower-webpack-plugin')

const CI = process.env.TRAVIS_BRANCH

if (CI == 'master')         process.env.ENV = 'PROD'
if (CI == 'qa-integration') process.env.ENV = 'QA'
if (CI == 'dev')            process.env.ENV = 'DEV'

const config = require('appirio-tech-webpack-config')({
  dirname: __dirname,
  entry: {
    app: './app/index'
  },
  template: './app/index.jade',
  favicon: './assets/images/favicon.ico',
  uglifyOptions: {
    mangle: { except: ['Auth0'] }
  },
  plugins: [
    new BowerWebpackPlugin({
      moduleDirectories: ["bower_components"],
      manifestFiles: "bower.json",
      includes: /.*/,
      excludes: [],
      searchResolveModulesDirectories: true
    })
  ]
})

if (CI) config.output.publicPath = process.env.ASSET_PREFIX

module.exports = config
