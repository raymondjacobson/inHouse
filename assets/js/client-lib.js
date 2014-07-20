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

var get_concept_group = function(sr, query, promise, scope){
  var url = sr.context.links.queryUrl + "?q=";
  url += query;
  sf_GET(sr, url, promise, scope);
}

var sf_PATCH = function(sr, url, body) {
  console.log('post' + url);
  Sfdc.canvas.client.ajax(url,
    { client: sr.client,
      method: 'PATCH',
      contentType: "application/json",
      data: Json.stringify(body),
      success: function(data) {
        if (201 == data.status) {
          console.log("success");
        }
      }
    });
}