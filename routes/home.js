exports.index = function (req, res) {
  res.render('index', { debugjs: process.argv.indexOf('--debugjs') >= 0 });
};
