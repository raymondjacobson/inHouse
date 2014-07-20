var sf_GET = function(sr, url) {
  console.log('get' + url);
  Sfdc.canvas.client.ajax(url,
    {client: sr.client,
    success: function(data){
      console.log(data);
      if (data.status == 200) {
        console.log('success');
        return data;
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

var get_concept_group = function(sr, query){
  var url = sr.context.links.queryUrl + "?q=";
  url += query;
  return sf_GET(sr, url);
}