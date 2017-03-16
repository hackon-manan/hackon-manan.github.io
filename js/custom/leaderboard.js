$(function(){


var loadModel=document.getElementById('loadModel');
var responseModel=document.getElementById('responseModel');
   window.onclick = function(event) {
      if (event.target == responseModel) {
          responseModel.style.display = "none";
         
      }
  }
loadModel.style.display="block";
	 $.ajax({
                      url: "https://hackonweb.herokuapp.com/leaderboard",
                  type:'GET',
                success: function(result){
                 
                  if(!result.length ) {
    
      $('#content').append("<p>There is nothing. You can be the first.</p>");

                }
                else{
                              var table=$('#table');
                   
                   
      $.each(result, function(i, item) {
          table.append('<tr><td>'+item.scoreAndRank.rank+'</td><td>'+item.personalDetails.name+'</td><td>'+item.scoreAndRank.score+'</td></tr>');
        });
                }
                 loadModel.style.display="none";
                },
              error:function(){
                loadModel.style.display="none";
                $('#response').html("Some Error has occured");
                responseModel.style.display="block";
                
              }
              });

   
  $('#close-span').click(function(){
      responseModel.style.display="none";
  });
});