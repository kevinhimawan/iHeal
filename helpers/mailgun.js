function sendMail (email,data){
  var api_key = 'key-36b59655e65c208a6a6fc53cf7400736';
  var domain = 'sandbox24687dfc4af04d168fa1263a8b43063d.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

  var data = {
    from: 'Excited User <postmaster@sandbox24687dfc4af04d168fa1263a8b43063d.mailgun.org>',
    to: email,
    subject: 'Hei',
    text: data
  };
 
  mailgun.messages().send(data, function (error, body) {
    console.log(body)
  });
}

module.exports = sendMail