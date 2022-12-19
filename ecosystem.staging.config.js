const deploy = require('./ecosystem.config.js').deploy

module.exports = {
  apps: [
    {
      name: 'smv',
      script: 'server/index.js',
      watch: false,
      max_memory_restart: '200M',
      instances: 1,
      exec_mode: 'fork',
      port: 8011,
      env: {
        APP_ENV: 'staging',
        NODE_ENV: 'production',
        PORT: 8011
      },
    },
  ],
  deploy,
}
