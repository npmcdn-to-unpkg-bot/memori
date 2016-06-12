$(function() {
  $('#posts').on('click', '.pagination a', function() {
    $(".pagination").html("Page is loading...");
    $.getScript(this.href);
    return false;
  });  
});
