var crypto = require("crypto");
var configuration = require("./configuration");

// Express routes (use sparingly/for API calls)

exports.layout = function(req, res) {
  // var envelopeData = require("./tmp/envelope.json");
  res.render('layout', {
    title: 'inHouse',
  })
}

exports.authenticate = function(req, res){
    var bodyArray = req.body.signed_request.split(".");
    var consumerSecret = bodyArray[0];
    var encoded_envelope = bodyArray[1];

    var check = crypto.createHmac("sha256", configuration.CONSUMER_SECRET).update(encoded_envelope).digest("base64");

    if (check === consumerSecret) {

        var envelope = JSON.parse(new Buffer(encoded_envelope, "base64").toString("ascii"));
        req.session.salesforce = envelope;
        console.log("got the session object:");
        console.log(envelope);
        res.render('layout', { title: envelope.context.user.userName, signedRequestJson : JSON.stringify(envelope) });
    }
};