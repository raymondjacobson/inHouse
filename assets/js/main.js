$(document).ready(function(){
  // calls when original page loads
  $('#search').click(function(){
    $('#nav a').removeClass('index');
  });
  $('#nav a').click(function(){
    $('#nav a').removeClass('index');
    $(this).addClass('index');
  });
  $('.box').click(function(){
    $('#nav a').removeClass('index');
  })
});