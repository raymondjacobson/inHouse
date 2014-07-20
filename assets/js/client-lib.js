var sf_GET = function(sr, url, promise, scope) {
  console.log('get' + url);
  console.log(promise);
  Sfdc.canvas.client.ajax(url,
    {client: sr.client,
    success: function(data){
      console.log(data);
      if (data.status == 200) {
        console.log('success');
        promise.resolve(data);
        console.log(promise.promise);
        scope.concepts = 'asdf';
      }
    }});
}

var sf_POST = function(sr, url, body) {
  console.log('post' + url);
  Sfdc.canvas.client.ajax(url,
    {client: sr.client,
      method: 'POST',
      contentType: "application/json",
      data: JSON.stringify(body),
      success: function(data) {
        if (201 === data.status) {
          console.log("Success");
        }
      }
    });
}

var sf_PATCH = function(sr, url, body) {
  console.log('patch' + url);
  Sfdc.canvas.client.ajax(url,
    {client: sr.client,
      method: 'PATCH',
      contentType: "application/json",
      data: JSON.stringify(body),
      success: function(data) {
        console.log(data.status);
        if (204 === data.status) {
          console.log("Success");
        }
      }
    });
}

var updateUserTokens = function(sr, url, body, diff, number) {
  body.TotalTokens__c = -1*diff;
  console.log(body);
  console.log(sr.userId);
  url = '/services/data/v31.0/sobjects/User/'+sr.userId;
  console.log(url);
  var curTokens;
  Sfdc.canvas.client.ajax(url, 
    {client: sr.client,
    method: 'GET',
    contentType: "application/json",
    success: function(data) {
      console.log(data.status);
      console.log(data);
      if (!data.payload.TotalTokens__c) {
        curTokens = 150;
      } else {
        curTokens = data.payload.TotalTokens__c;
      }
      console.log(curTokens);
      console.log(data.payload.TotalTokens__c);
      curTokens = curTokens + body.TotalTokens__c;
      console.log(curTokens);

        sf_PATCH(sr, url, {'Total__c': curTokens}, 0, number);
      } 
    }
  );
  console.log(curTokens);
  // sf_PATCH(sr, url, body, 0, number);
}

var get_concept_group = function(sr, query, promise, scope){
  var url = sr.context.links.queryUrl + "?q=";
  url += query;
  sf_GET(sr, url, promise, scope);
}
