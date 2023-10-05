module.exports = {
  apps : [{
    name   : "Index api",
    instances: 'max',
    script : "./index.js",
    exec_mode: 'cluster'
  }]
}
