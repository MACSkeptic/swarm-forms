exports.index = function (req, res) {
  res.render('index', { mainScript: process.argv.indexOf('--debugjs') >= 0 ? '/js/lib/main' : '/optimised' });
};
