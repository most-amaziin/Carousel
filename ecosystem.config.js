module.exports = {
  apps: [{
    name: 'SDC',
    script: './server/server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-172-77-159.compute-1.amazonaws.com',
      key: '~/.ssh/SDC.pem',
      ref: 'origin/master',
      repo: 'https://github.com/most-amaziin/Carousel.git',
      path: '/home/ubuntu/Carousel',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}