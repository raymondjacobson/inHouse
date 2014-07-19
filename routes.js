// Express routes (use sparingly/for API calls)

exports.layout = function(req, res) {
  res.render('layout', {
    title: 'inHouse'
  })
}