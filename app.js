var express = require('express')
  , http = require('http')
  , https = require('https')
  , stylus = require('stylus')
  , fs = require('fs')
  , nib = require('nib')
  , path = require('path')
  , routes = require('./routes')

// config for canvas SDK
var sslkey = fs.readFileSync('ssl-key.pem');
var sslcert = fs.readFileSync('ssl-cert.pem')

var options = {
    key: sslkey,
    cert: sslcert
};

var app = express();
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
app.set('port', process.env.PORT || 8443);
app.configure(function(){
  app.use(express.bodyParser());
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
  { src: __dirname + '/assets'
  , compile: compile
  }
));
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.static(__dirname + '/assets'))

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// handles
app.get('/', routes.layout);
app.post('/authenticate', routes.authenticate);
app.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
});

https.createServer(options, app).listen(app.get('port'), function () {
  console.log('Express app listening on port ' + app.get('port'));
});