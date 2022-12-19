module.exports = {
  deploy: {
    staging: {
      user: 'mario',
      key: '~/.ssh/id_rsa.pub',
      host: ['159.89.108.38'],
      ref: 'origin/master',
      repo: 'https://github.com/dnlsptzk/sixmorevodka.git',
      path: '/var/www/smv.spatzek.studio/html',
      ssh_options: 'StrictHostKeyChecking=no',
      'post-deploy':
        'npm install && pm2 startOrRestart ecosystem.staging.config.js --env staging',
      env: {
        NODE_ENV: 'production',
        APP_ENV: 'staging',
        PORT: 8001,
      },
    },
  },
}
