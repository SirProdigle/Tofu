module.exports = {
  apps : [{
    name: "<NAME>",
    script: 'Engine/Bin/app.js',
    instances : 0,
    exec_mode : "cluster"
  }]
};
