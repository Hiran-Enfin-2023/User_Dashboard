module.exports = {
  apps : [{
    name   : "app1",
    instances: 'max',
    script : "./index.js",
    exec_mode: 'cluster'
  }]
}
