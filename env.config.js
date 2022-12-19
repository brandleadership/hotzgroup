/**
 * Regularly import this file on either server or client and have fun with it.
 * DO NOT PUT SENSITIVE INFORMATION LIKE ACCESS DATA HERE, THIS FILE MIGHT BE BUNDLED TO THE CLIENT!
 * Instead put it in a config file in the server folder and only require it from there.
 */

// define all environments you expect here
const environments = {
  development: {
    NAME: 'development',
    PUBLIC_URL: 'http://localhost:3000',
    PUBLIC_URL_API: 'http://localhost:8080',
    // PUBLIC_URL_API: 'https://cms.burnishcreative.com',
    PORT: 3000,
  },
  staging: {
    NAME: 'staging',
    PUBLIC_URL: 'http://bc.madeby.mariosommer.at',
    PUBLIC_URL_API: 'http://cms.bc.madeby.mariosommer.at',
    PORT: 8002,
  },
  production: {
    NAME: 'production',
    PUBLIC_URL: 'https://burnishcreative.com',
    PUBLIC_URL_API: 'https://cms.burnishcreative.com',
    PORT: 8002,
  },
}

const env =
  (typeof window !== 'undefined' ? window.ENV : process.env.APP_ENV) ||
  'development'

module.exports = environments[env.toLowerCase()]
